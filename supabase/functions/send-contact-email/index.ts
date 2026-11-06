import "jsr:@supabase/functions-js/edge-runtime.d.ts";

interface ContactRecord {
  id?: string;
  full_name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  subject: string;
  message: string;
  created_at?: string;
}

interface WebhookPayload {
  type?: string;
  table?: string;
  schema?: string;
  record?: ContactRecord;
  // Fallback if record fields are sent at top level
  full_name?: string;
  email?: string;
  phone?: string | null;
  company?: string | null;
  subject?: string;
  message?: string;
  created_at?: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY environment secret.");
      return new Response(
        JSON.stringify({ error: "Missing RESEND_API_KEY secret in Supabase Edge Function" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const TO_EMAIL = Deno.env.get("ALERT_EMAIL") || Deno.env.get("TO_EMAIL");
    if (!TO_EMAIL) {
      console.error("Missing ALERT_EMAIL environment secret.");
      return new Response(
        JSON.stringify({ error: "Missing ALERT_EMAIL secret in Supabase Edge Function" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Default sender (e.g. onboarding@resend.dev during testing or info@yourdomain.com in production)
    const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "Avinex Contact Form <onboarding@resend.dev>";

    // Parse incoming webhook body
    const body: WebhookPayload = await req.json();

    // Extract submission details whether delivered via Supabase DB Webhook or direct invocation
    const record: ContactRecord = body.record || {
      full_name: body.full_name || "N/A",
      email: body.email || "N/A",
      phone: body.phone,
      company: body.company,
      subject: body.subject || "Contact Form Inquiry",
      message: body.message || "",
      created_at: body.created_at || new Date().toISOString(),
    };

    if (!record.full_name || !record.email || !record.message) {
      return new Response(
        JSON.stringify({ error: "Incomplete contact submission record" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const subjectText = record.subject || "General Inquiry";
    const emailSubject = `[Avinex Contact] ${subjectText} - ${record.full_name}`;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; margin: 0; padding: 24px; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
            .header { background: #0A1B3D; color: #ffffff; padding: 24px 32px; border-bottom: 3px solid #C8962E; }
            .header h1 { margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; }
            .header p { margin: 4px 0 0; font-size: 13px; color: #cbd5e1; }
            .content { padding: 32px; }
            .badge { display: inline-block; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 600; background: #fef3c7; color: #92400e; margin-bottom: 16px; }
            .field-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
            .field-table td { padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
            .field-table td.label { font-weight: 600; color: #64748b; width: 35%; }
            .field-table td.value { color: #0f172a; font-weight: 500; }
            .message-box { background: #f8fafc; border-left: 4px solid #C8962E; padding: 16px; border-radius: 4px; font-size: 14px; color: #334155; white-space: pre-wrap; margin-top: 8px; }
            .footer { padding: 20px 32px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Avinex Technologies — New Lead Alert</h1>
              <p>Received from the Contact Us page</p>
            </div>
            <div class="content">
              <span class="badge">${subjectText}</span>
              <table class="field-table">
                <tr>
                  <td class="label">Full Name</td>
                  <td class="value"><strong>${record.full_name}</strong></td>
                </tr>
                <tr>
                  <td class="label">Email Address</td>
                  <td class="value"><a href="mailto:${record.email}" style="color: #0284C7; text-decoration: none;">${record.email}</a></td>
                </tr>
                <tr>
                  <td class="label">Phone Number</td>
                  <td class="value">${record.phone || '<em>Not provided</em>'}</td>
                </tr>
                <tr>
                  <td class="label">Company / Org</td>
                  <td class="value">${record.company || '<em>Not provided</em>'}</td>
                </tr>
                <tr>
                  <td class="label">Submitted At</td>
                  <td class="value">${record.created_at ? new Date(record.created_at).toUTCString() : new Date().toUTCString()}</td>
                </tr>
              </table>

              <div style="margin-top: 20px;">
                <strong style="font-size: 14px; color: #475569;">Inquiry Message:</strong>
                <div class="message-box">${record.message}</div>
              </div>
            </div>
            <div class="footer">
              This is an automated alert from your Avinex Contact Form Supabase Edge Function.
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email via Resend API
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: record.email,
        subject: emailSubject,
        html: htmlContent,
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Resend API error:", resendData);
      return new Response(
        JSON.stringify({ error: "Failed to send email via Resend", details: resendData }),
        { status: resendResponse.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, resendId: resendData.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Edge function error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

