import { test, expect } from '@playwright/test';

test.describe('Avinex Contact Form & Supabase Integration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact-us');
    await expect(page.locator('#contact-form')).toBeVisible();
  });

  test('Validates required fields and shows red error alert for empty submission', async ({ page }) => {
    // Attempt to submit empty form
    await page.click('#form-submit-btn');

    // Should display red error alert
    const errorAlert = page.locator('#form-error-alert');
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toContainText('Full Name is required.');
  });

  test('Validates email format', async ({ page }) => {
    await page.fill('#form-name', 'Captain Ahmad');
    await page.fill('#form-email', 'not-a-valid-email');
    await page.selectOption('#form-subject', 'product-inquiry');
    await page.fill('#form-message', 'This is a test inquiry message with sufficient length.');

    await page.click('#form-submit-btn');

    const errorAlert = page.locator('#form-error-alert');
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toContainText('Please enter a valid email address.');
  });

  test('Validates phone format (+92 allowed, rejects invalid strings)', async ({ page }) => {
    await page.fill('#form-name', 'Captain Ahmad');
    await page.fill('#form-email', 'ahmad@example.com');
    await page.fill('#form-phone', 'invalid-phone-xyz');
    await page.selectOption('#form-subject', 'general');
    await page.fill('#form-message', 'Testing phone validation rule for contact form.');

    await page.click('#form-submit-btn');

    const errorAlert = page.locator('#form-error-alert');
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toContainText('Please enter a valid phone number');
  });

  test('Validates message minimum length (min 10 characters)', async ({ page }) => {
    await page.fill('#form-name', 'Captain Ahmad');
    await page.fill('#form-email', 'ahmad@example.com');
    await page.fill('#form-phone', '+92-300-1234567');
    await page.selectOption('#form-subject', 'general');
    await page.fill('#form-message', 'Short'); // 5 chars < 10

    await page.click('#form-submit-btn');

    const errorAlert = page.locator('#form-error-alert');
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toContainText('Message must be at least 10 characters long.');
  });

  test('Blocks spam bot via hidden honeypot field without inserting into DB', async ({ page }) => {
    let supabasePostCalled = false;
    await page.route('**/rest/v1/contact_submissions*', (route) => {
      supabasePostCalled = true;
      route.fulfill({ status: 201, contentType: 'application/json', body: '[]' });
    });

    await page.fill('#form-name', 'Bot Spammer');
    await page.fill('#form-email', 'bot@spammer.org');
    await page.fill('#form-message', 'Buy cheap crypto services right now on our website.');
    await page.selectOption('#form-subject', 'general');

    // Fill the hidden honeypot on the DOM element
    await page.evaluate(() => {
      const el = document.getElementById('form-website');
      if (el) {
        el.value = 'http://spam-link.com';
      }
    });

    await page.click('#form-submit-btn');

    // Should show success to fool bot
    const successAlert = page.locator('#form-success-alert');
    await expect(successAlert).toBeVisible();

    // Supabase endpoint should NOT have been called
    expect(supabasePostCalled).toBe(false);
  });

  test('Successfully submits valid form data to Supabase and resets form', async ({ page }) => {
    let capturedPayload = null;
    let savedRowData = null;

    // Intercept Supabase POST call to contact_submissions
    await page.route('**/rest/v1/contact_submissions*', async (route) => {
      const request = route.request();
      if (request.method() === 'POST') {
        const postData = JSON.parse(request.postData() || '[]');
        capturedPayload = Array.isArray(postData) ? postData[0] : postData;

        // Mock saved database row created by Supabase
        savedRowData = {
          id: 'b1234567-89ab-cdef-0123-456789abcdef',
          full_name: capturedPayload.full_name,
          email: capturedPayload.email,
          phone: capturedPayload.phone,
          company: capturedPayload.company,
          subject: capturedPayload.subject,
          message: capturedPayload.message,
          status: capturedPayload.status || 'new',
          created_at: new Date().toISOString(),
        };

        await route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify([savedRowData]),
        });
      } else {
        await route.continue();
      }
    });

    // Fill valid data (+92 phone number format)
    await page.fill('#form-name', 'Muhammad Tariq');
    await page.fill('#form-email', 'm.tariq@aerodev.com');
    await page.fill('#form-phone', '+92-300-9876543');
    await page.fill('#form-company', 'AeroDev Technologies');
    await page.selectOption('#form-subject', 'quotation-request');
    await page.fill(
      '#form-message',
      'Requesting commercial pricing and availability for MIL-SPEC harness connectors and aviation test equipment.'
    );

    // Submit form
    await page.click('#form-submit-btn');

    // Verify green success banner appears
    const successAlert = page.locator('#form-success-alert');
    await expect(successAlert).toBeVisible();
    await expect(successAlert).toContainText('Message Sent Successfully');
    await expect(successAlert).toContainText('within 24 hours');

    // Confirm the row payload was sent with exact schema fields
    expect(capturedPayload).not.toBeNull();
    expect(capturedPayload.full_name).toBe('Muhammad Tariq');
    expect(capturedPayload.email).toBe('m.tariq@aerodev.com');
    expect(capturedPayload.phone).toBe('+92-300-9876543');
    expect(capturedPayload.company).toBe('AeroDev Technologies');
    expect(capturedPayload.subject).toBe('quotation-request');
    expect(capturedPayload.message).toBe(
      'Requesting commercial pricing and availability for MIL-SPEC harness connectors and aviation test equipment.'
    );
    expect(capturedPayload.status).toBe('new');

    // Confirm database row was confirmed saved
    expect(savedRowData).not.toBeNull();
    expect(savedRowData.id).toBeDefined();

    // Confirm the form fields were reset
    await expect(page.locator('#form-name')).toHaveValue('');
    await expect(page.locator('#form-email')).toHaveValue('');
    await expect(page.locator('#form-phone')).toHaveValue('');
    await expect(page.locator('#form-company')).toHaveValue('');
    await expect(page.locator('#form-subject')).toHaveValue('');
    await expect(page.locator('#form-message')).toHaveValue('');
  });

  test('Shows red error alert if Supabase returns database error', async ({ page }) => {
    // Intercept Supabase POST call and simulate a Supabase RLS / DB error
    await page.route('**/rest/v1/contact_submissions*', async (route) => {
      await route.fulfill({
        status: 403,
        contentType: 'application/json',
        body: JSON.stringify({
          code: '42501',
          message: 'Permission denied for table contact_submissions',
          details: null,
          hint: null,
        }),
      });
    });

    await page.fill('#form-name', 'Zubair Khan');
    await page.fill('#form-email', 'zubair@example.com');
    await page.selectOption('#form-subject', 'tender-support');
    await page.fill('#form-message', 'Inquiry regarding EPADS tender bidding documentation.');

    await page.click('#form-submit-btn');

    const errorAlert = page.locator('#form-error-alert');
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toContainText('Permission denied for table contact_submissions');
  });
});
