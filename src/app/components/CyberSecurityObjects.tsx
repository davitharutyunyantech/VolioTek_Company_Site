import { Cloud, Database, Fingerprint, KeyRound, LockKeyhole, ShieldCheck } from 'lucide-react';

const securityObjects = [
  {
    className: 'cyber-security-card--primary',
    icon: ShieldCheck,
    label: 'Protected PHI',
  },
  {
    className: 'cyber-security-card--lock',
    icon: LockKeyhole,
    label: 'Encrypted Access',
  },
  {
    className: 'cyber-security-card--data',
    icon: Database,
    label: 'Secure Data',
  },
  {
    className: 'cyber-security-card--identity',
    icon: Fingerprint,
    label: 'Identity Check',
  },
  {
    className: 'cyber-security-card--keys',
    icon: KeyRound,
    label: 'Key Control',
  },
  {
    className: 'cyber-security-card--cloud',
    icon: Cloud,
    label: 'Cloud Guard',
  },
];

export function CyberSecurityObjects() {
  return (
    <div className="cyber-security-objects" aria-hidden="true">
      <div className="cyber-security-objects__plane">
        <div className="cyber-security-objects__beam cyber-security-objects__beam--one" />
        <div className="cyber-security-objects__beam cyber-security-objects__beam--two" />
        <div className="cyber-security-objects__beam cyber-security-objects__beam--three" />

        {securityObjects.map((object) => (
          <div key={object.label} className={`cyber-security-card ${object.className}`}>
            <div className="cyber-security-card__icon">
              <object.icon />
            </div>
            <div className="cyber-security-card__label">{object.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
