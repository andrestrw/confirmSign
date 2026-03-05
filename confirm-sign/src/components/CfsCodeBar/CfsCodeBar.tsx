import "./CfsCodeBar.scss";

interface CfsCodeBarProps {
  cfscode: string;
}

const CfsCodeBar = ({ cfscode }: CfsCodeBarProps) => (
  <div className="cfs-code-bar">
    <span className="cfs-code-bar__label">CFSCode:</span>
    <span className="cfs-code-bar__value">{cfscode}</span>
  </div>
);

export default CfsCodeBar;
