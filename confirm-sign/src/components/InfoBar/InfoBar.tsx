import "./InfoBar.scss";

interface InfoBarProps {
  senderUser: string;
  recipientAddress: string;
}

const InfoBar = ({ senderUser, recipientAddress }: InfoBarProps) => (
  <div className="info-bar">
    <div className="info-bar__field">
      <span className="info-bar__label">De:</span>
      <span className="info-bar__value">{senderUser}</span>
    </div>

    <div className="info-bar__separator" />

    <div className="info-bar__field">
      <span className="info-bar__label">Para:</span>
      <span className="info-bar__value">{recipientAddress}</span>
    </div>
  </div>
);

export default InfoBar;
