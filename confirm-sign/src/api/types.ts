export interface ThreadResponse {
  cfscode: string;
  sender: {
    user: string;
  };
  content: string;
  recipient: {
    address: string;
  };
  history: {
    sid: number;
    status: string;
    date: string;
    gmt: string;
    ip: string;
    OS: string;
    browser: string;
    description: string;
  }[];
  agreement?: {
    forms: {
      fid: string;
      title: string;
      required: boolean;
      answered: boolean;
      questions: {
        qid: number;
        label: string;
        required: boolean;
        type: "CHECK" | "TEXT";
        options: {
          oid: number;
          label: string;
          order: number;
          default: boolean;
          input?: {
            min: number;
            max: number;
          };
        }[];
      }[];
    }[];
  };
}

/**
 * Derived types for use in components, following the "Single Source of Truth" pattern.
 * This ensures that if the API response structure changes, all sub-types update automatically.
 */
export type HistoryEntry = ThreadResponse["history"][number];
export type AgreementForm = NonNullable<
  ThreadResponse["agreement"]
>["forms"][number];
export type FormQuestion = AgreementForm["questions"][number];
export type QuestionOption = FormQuestion["options"][number];
