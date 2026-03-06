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
}
