import React from 'react';
import { Link } from 'react-router-dom';
import {
  RadioTower,
  Zap,
  BatteryCharging,
  Activity,
  Flame,
  Shield,
  Settings,
  PackageCheck,
  ArrowRight,
} from 'lucide-react';

const SERVICE_IMAGES = {
  'cns-aviation': '/images/services/service-01-cns.jpg',
  'electrical-engineering': '/images/services/service-02-electrical.jpg',
  'ups-power-protection': '/images/services/service-03-ups.jpg',
  'avr-power-conditioning': '/images/services/service-04-avr.jpg',
  'fire-detection-alarm': '/images/services/service-05-fire.jpg',
  'cctv-electronic-security': '/images/services/service-06-cctv.jpg',
  'system-provider-integration': '/images/services/service-07-integration.jpg',
  'procurement-technical-support': '/images/services/service-08-procurement.jpg',
};

const BANNER_ITEMS = [
  {
    id: 'cns-aviation',
    num: '01',
    title: 'CNS & AVIATION COMMS',
    desc: 'VHF/HF air-band, VCCS, DVLS & remote radio stations',
    icon: RadioTower,
  },
  {
    id: 'electrical-engineering',
    num: '02',
    title: 'ELECTRICAL ENGINEERING',
    desc: 'Airport power distribution, LV/MV panels & earthing',
    icon: Zap,
  },
  {
    id: 'ups-power-protection',
    num: '03',
    title: 'UPS & POWER PROTECTION',
    desc: 'Online double-conversion UPS & battery banks',
    icon: BatteryCharging,
  },
  {
    id: 'avr-power-conditioning',
    num: '04',
    title: 'AVR & POWER CONDITIONING',
    desc: 'Servo & static automatic voltage regulators',
    icon: Activity,
  },
  {
    id: 'fire-detection-alarm',
    num: '05',
    title: 'FIRE DETECTION & ALARMS',
    desc: 'Addressable panels, smoke/heat detectors & alarms',
    icon: Flame,
  },
  {
    id: 'cctv-electronic-security',
    num: '06',
    title: 'CCTV & ELECTRONIC SECURITY',
    desc: 'IP surveillance, VMS, storage & access control',
    icon: Shield,
  },
  {
    id: 'system-provider-integration',
    num: '07',
    title: 'SYSTEM INTEGRATION',
    desc: 'Interoperability, commissioning & site testing',
    icon: Settings,
  },
  {
    id: 'procurement-technical-support',
    num: '08',
    title: 'PROCUREMENT & SUPPORT',
    desc: 'Tender compliance, OEM sourcing & lifecycle spares',
    icon: PackageCheck,
  },
];

export default function NavigationSolutionsBanner({ compact = false }) {
  return (
    <div className={`nav-solutions-banner-wrapper ${compact ? 'compact' : ''}`}>
      <div className="nav-solutions-banner" style={{ background: '#ffffff', border: '1px solid var(--gray-200)', borderRadius: '18px', padding: '36px 30px', boxShadow: '0 8px 32px rgba(10, 27, 61, 0.07)' }}>
        {/* Top Header Tag */}
        <div className="nav-solutions-top-tag" style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--navy-deep)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            INTEGRATED AVIATION, COMMUNICATION, ELECTRICAL &amp; SECURITY SOLUTIONS
          </span>
          <div className="nav-solutions-gold-bar" style={{ margin: '8px auto 0', background: 'var(--gold-gradient)', height: '3px', width: '60px', borderRadius: '3px' }} />
        </div>

        {/* 8 Service Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {BANNER_ITEMS.map((item) => {
            const Icon = item.icon;
            const imgSrc = SERVICE_IMAGES[item.id];
            return (
              <Link
                key={item.id}
                to={`/services#service-${item.id}`}
                className="nav-solutions-item"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '14px',
                  padding: '24px 18px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
                  minHeight: '240px',
                }}
              >
                {/* Background image layer */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${imgSrc})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 0.4s ease',
                    zIndex: 0,
                  }}
                  className="card-bg-img"
                />
                {/* Dark gradient overlay */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, rgba(5,15,35,0.68) 0%, rgba(5,15,35,0.88) 100%)',
                    zIndex: 1,
                    transition: 'background 0.3s ease',
                  }}
                  className="card-overlay"
                />
                {/* Gold border glow on hover (via box-shadow on hover handled via CSS) */}
                {/* Content */}
                <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '12px',
                      background: 'rgba(212, 175, 55, 0.18)',
                      border: '1.5px solid rgba(212, 175, 55, 0.55)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#F3C669',
                      marginBottom: '14px',
                    }}
                  >
                    <Icon size={23} strokeWidth={2.2} />
                  </div>
                  <div style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#F3C669', letterSpacing: '0.12em', marginBottom: '6px' }}>
                    AREA {item.num}
                  </div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffffff', margin: '0 0 8px', lineHeight: 1.35 }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.78)', margin: '0 0 14px', lineHeight: 1.5, flex: 1 }}>
                    {item.desc}
                  </p>
                  <span style={{ fontSize: '0.78125rem', fontWeight: 700, color: '#F3C669', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    Explore Area <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Tagline */}
        <div
          className="nav-solutions-bottom-bar"
          style={{
            marginTop: '32px',
            paddingTop: '22px',
            borderTop: '1px solid var(--gray-200)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
          }}
        >
          <span style={{ height: '2px', width: '40px', background: 'var(--gold-gradient)', borderRadius: '2px' }} />
          <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--navy-deep)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            CONNECTING SKIES, ENABLING TOMORROW.
          </span>
          <span style={{ height: '2px', width: '40px', background: 'var(--gold-gradient)', borderRadius: '2px' }} />
        </div>
      </div>
    </div>
  );
}
