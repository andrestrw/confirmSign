import { useState } from "react";
import type {
  AgreementForm as AgreementFormType,
  HistoryEntry,
} from "../../api/types";
import AgreementButton from "../AgreementButton/AgreementButton";

import "./AgreementForm.scss";
import HistoryRow from "../HistoryRow/HistoryRow";

interface AgreementFormProps {
  forms: AgreementFormType[];
  acceptButtonText?: string;
  onAccept?: () => void;
  isAccepted?: boolean;
  history?: HistoryEntry[];
}

const getDefaultOid = (forms: AgreementFormType[]): number | null => {
  const checkQuestion = forms?.[0]?.questions?.find((q) => q.type === "CHECK");
  const options = checkQuestion?.options;
  return options?.find((opt) => opt.default)?.oid ?? null;
};

const AgreementForm = ({
  forms,
  acceptButtonText,
  onAccept,
  isAccepted = false,
  history = [],
}: AgreementFormProps) => {
  const [selectedOid, setSelectedOid] = useState<number | null>(() =>
    getDefaultOid(forms),
  );

  const form = forms?.[0];
  const total = forms.length;
  const isFormAccepted = isAccepted || form?.answered;

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
                    className={`agreement-form__input ${isFormAccepted ? "agreement-form__input--disabled" : ""}`}
                    minLength={question.options[0]?.input?.min}
                    maxLength={question.options[0]?.input?.max}
                    disabled={isFormAccepted}
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
                        disabled={isFormAccepted}
                        onChange={() => {
                          if (!isFormAccepted) {
                            setSelectedOid(
                              selectedOid === opt.oid ? null : opt.oid,
                            );
                          }
                        }}
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

      {acceptButtonText ? (
        <AgreementButton
          text={isFormAccepted ? "Hilo aceptado" : acceptButtonText}
          onClick={onAccept}
          disabled={isFormAccepted}
        />
      ) : null}

      {isFormAccepted && history.length > 0 && (
        <div className="agreement-form__last-update">
          <HistoryRow row={history[0]} index={0} total={total} />
        </div>
      )}
    </div>
  );
};

export default AgreementForm;
