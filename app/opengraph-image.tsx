import { ImageResponse } from 'next/og';
import { getHomeSnapshot } from '@/lib/data/trasparenza';
import { SITE_NAME, SITE_TAGLINE } from '@/lib/seo';

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  const snapshot = getHomeSnapshot();
  const stats = [
    { value: String(snapshot.eventCount), label: 'Eventi' },
    { value: String(snapshot.actorCount), label: 'Aziende' },
    { value: `${snapshot.fromYear}–${snapshot.toYear}`, label: 'Anni' },
    { value: String(snapshot.sourceCount), label: 'Fonti' },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#F4F5F8',
          color: '#1C1E24',
          padding: '64px 72px 48px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', gap: 6, height: 36 }}>
              <div style={{ width: 10, height: 36, background: '#1C1E24', borderRadius: 2 }} />
              <div style={{ width: 10, height: 36, background: '#1C1E24', borderRadius: 2 }} />
            </div>
            <div
              style={{
                fontSize: 22,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: '#A84B3A',
                fontFamily: 'Georgia, serif',
              }}
            >
              {SITE_NAME}
            </div>
          </div>
          <div
            style={{
              fontSize: 58,
              lineHeight: 1.12,
              fontWeight: 700,
              fontFamily: 'Georgia, serif',
              maxWidth: 980,
            }}
          >
            {SITE_TAGLINE}
          </div>
          <div
            style={{
              fontSize: 26,
              lineHeight: 1.4,
              color: '#5A5E68',
              maxWidth: 860,
            }}
          >
            Incontri, dichiarazioni e decisioni pubbliche su una timeline — con fonti che puoi aprire e citare.
          </div>
        </div>

        <div style={{ display: 'flex', borderTop: '1px solid #D8DBE2', paddingTop: 28 }}>
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '25%',
                gap: 6,
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#7A7F8A',
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  fontFamily: 'Georgia, serif',
                }}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
