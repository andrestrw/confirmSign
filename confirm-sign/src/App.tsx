import { useState } from "react";
import { useThread } from "./hooks/useThread";
import { acceptThread } from "./api/threadService";
import CfsCodeBar from "./components/CfsCodeBar/CfsCodeBar";
import InfoBar from "./components/InfoBar/InfoBar";
import HistoryTable from "./components/HistoryTable/HistoryTable";
import ContentPanel from "./components/ContentPanel/ContentPanel";
import AgreementForm from "./components/AgreementForm/AgreementForm";

const TOKEN_1 = import.meta.env.VITE_THREAD_TOKEN_1;
const TOKEN_2 = import.meta.env.VITE_THREAD_TOKEN_2;

function App() {
  const { data, loading, error, refetch } = useThread(TOKEN_1, TOKEN_2);
  const [isAccepted, setIsAccepted] = useState(false);

  const handleAccept = async () => {
    try {
      const result = await acceptThread(TOKEN_1, TOKEN_2);
      console.log("Response from server:", result);
      if (result.success) {
        setIsAccepted(true);
        await refetch();
      }
    } catch (err: any) {
      console.error("Error accepting thread:", err.message);
    }
  };

  if (loading && !data) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return <div>No data found</div>;

  return (
    <div>
      <CfsCodeBar cfscode={data.cfscode} />
      <InfoBar
        senderUser={data.sender.user}
        recipientAddress={data.recipient.address}
      />

      <HistoryTable history={data.history} />

      <ContentPanel content={data.content}>
        {data.agreement && (
          <AgreementForm
            forms={data.agreement.forms}
            acceptButtonText={data.agreement.accept_button_text}
            onAccept={handleAccept}
            isAccepted={isAccepted}
            history={data.history}
          />
        )}
      </ContentPanel>
    </div>
  );
}

export default App;
