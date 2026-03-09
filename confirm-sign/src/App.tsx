import { useThread } from "./hooks/useThread";
import CfsCodeBar from "./components/CfsCodeBar/CfsCodeBar";
import InfoBar from "./components/InfoBar/InfoBar";
import HistoryTable from "./components/HistoryTable/HistoryTable";
import ContentPanel from "./components/ContentPanel/ContentPanel";
import AgreementForm from "./components/AgreementForm/AgreementForm";

const TOKEN_1 = import.meta.env.VITE_THREAD_TOKEN_1;
const TOKEN_2 = import.meta.env.VITE_THREAD_TOKEN_2;

function App() {
  const { data, loading, error } = useThread(TOKEN_1, TOKEN_2);

  if (loading) return <div>Loading...</div>;
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
          />
        )}
      </ContentPanel>
    </div>
  );
}

export default App;
