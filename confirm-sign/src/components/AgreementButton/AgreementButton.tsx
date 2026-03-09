import "./AgreementButton.scss";

interface AgreementButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

const AgreementButton = ({
  text,
  onClick,
  disabled = false,
}: AgreementButtonProps) => {
  return (
    <button
      className="agreement-button"
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default AgreementButton;
