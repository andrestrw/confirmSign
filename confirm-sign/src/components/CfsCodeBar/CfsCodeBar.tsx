import "./CfsCodeBar.scss";

interface CfsCodeBarProps {
  cfscode: string;
}

export default function CfsCodeBar({ cfscode }: CfsCodeBarProps) {
  return (
    <div className="cfs-code-bar">
      <span className="cfs-code-bar__label">CFSCode:</span>
      <span className="cfs-code-bar__value">{cfscode}</span>
    </div>
  );
}
