import "./AgreementButton.scss";

interface AgreementButtonProps {
  text: string;
  onClick?: () => void;
}

const AgreementButton = ({ text, onClick }: AgreementButtonProps) => {
  return (
    <button className="agreement-button" type="button" onClick={onClick}>
      {text}
    </button>
  );
};

export default AgreementButton;
