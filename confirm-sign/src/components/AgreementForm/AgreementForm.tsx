import { useState } from "react";
import type { AgreementForm as AgreementFormType } from "../../api/types";
import "./AgreementForm.scss";

interface AgreementFormProps {
  forms: AgreementFormType[];
}

const getDefaultOid = (forms: AgreementFormType[]): number | null => {
  const options = forms?.[0]?.questions?.[0]?.options;
  return options?.find((opt) => opt.default)?.oid ?? null;
};

const AgreementForm = ({ forms }: AgreementFormProps) => {
  const [selectedOid, setSelectedOid] = useState<number | null>(
    getDefaultOid(forms),
  );

  const form = forms?.[0];
  const firstQuestion = form?.questions?.[0];

  if (!form || !firstQuestion?.options) return null;

  const sortedOptions = [...firstQuestion.options].sort(
    (a, b) => a.order - b.order,
  );

  return (
    <div className="agreement-form">
      <h3 className="agreement-form__title">{form.title}</h3>

      <div className="agreement-form__question">
        <span className="agreement-form__label">
          {firstQuestion.label || "Selecciona tu opción"}
        </span>

        <div className="agreement-form__options">
          {sortedOptions.map((opt) => (
            <label key={opt.oid} className="agreement-form__option">
              <input
                type="checkbox"
                className="agreement-form__checkbox"
                checked={selectedOid === opt.oid}
                onChange={() =>
                  setSelectedOid(selectedOid === opt.oid ? null : opt.oid)
                }
              />
              <span className="agreement-form__option-label">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgreementForm;
