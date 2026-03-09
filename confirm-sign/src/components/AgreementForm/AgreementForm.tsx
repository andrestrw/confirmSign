import { useState } from "react";
import type { AgreementForm as AgreementFormType } from "../../api/types";
import AgreementButton from "../AgreementButton/AgreementButton";
import "./AgreementForm.scss";

interface AgreementFormProps {
  forms: AgreementFormType[];
  acceptButtonText?: string;
}

const getDefaultOid = (forms: AgreementFormType[]): number | null => {
  const checkQuestion = forms?.[0]?.questions?.find((q) => q.type === "CHECK");
  const options = checkQuestion?.options;
  return options?.find((opt) => opt.default)?.oid ?? null;
};

const AgreementForm = ({ forms, acceptButtonText }: AgreementFormProps) => {
  const [selectedOid, setSelectedOid] = useState<number | null>(
    getDefaultOid(forms),
  );

  const form = forms?.[0];

  if (!form || !form.questions) return null;

  return (
    <div className="agreement-form">
      <h3 className="agreement-form__title">{form.title}</h3>

      {form.questions.map((question) => {
        const isText = question.type === "TEXT";

        return (
          <div key={question.qid} className="agreement-form__question">
            {(question.label || !isText) && (
              <span className="agreement-form__label">
                {question.label || "Selecciona tu opción"}
              </span>
            )}

            <div className="agreement-form__options">
              {isText ? (
                <label className="agreement-form__option">
                  <input
                    type="text"
                    className="agreement-form__input"
                    minLength={question.options[0]?.input?.min}
                    maxLength={question.options[0]?.input?.max}
                  />
                  <span className="agreement-form__option-label">
                    {question.options[0]?.label}
                  </span>
                </label>
              ) : (
                [...question.options]
                  .sort((a, b) => a.order - b.order)
                  .map((opt) => (
                    <label key={opt.oid} className="agreement-form__option">
                      <input
                        type="checkbox"
                        className="agreement-form__checkbox"
                        checked={selectedOid === opt.oid}
                        onChange={() =>
                          setSelectedOid(
                            selectedOid === opt.oid ? null : opt.oid,
                          )
                        }
                      />
                      <span className="agreement-form__option-label">
                        {opt.label}
                      </span>
                    </label>
                  ))
              )}
            </div>
          </div>
        );
      })}

      {acceptButtonText && <AgreementButton text={acceptButtonText} />}
    </div>
  );
};

export default AgreementForm;
