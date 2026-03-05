export interface ThreadResponse {
  cfscode: string;
  sender: {
    user: string;
  };
  recipient: {
    address: string;
  };
}
