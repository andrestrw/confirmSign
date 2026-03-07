export interface HistoryEntry {
  sid: number;
  status: string;
  date: string;
  gmt: string;
  ip: string;
  OS: string;
  browser: string;
  description: string;
}

export interface ThreadResponse {
  cfscode: string;
  sender: {
    user: string;
  };
  content: string;
  recipient: {
    address: string;
  };
  history: HistoryEntry[];
  agreement?: {
    forms: AgreementForm[];
  };
}

export interface AgreementForm {
  fid: string;
  title: string;
  questions: FormQuestion[];
}

export interface FormQuestion {
  qid: number;
  label: string;
  type: string;
  options: QuestionOption[];
}

export interface QuestionOption {
  oid: number;
  label: string;
  order: number;
  default: boolean;
}
