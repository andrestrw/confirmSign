import { useState } from "react";
import { useParams } from "@tanstack/react-router";
import { useThread } from "@/hooks/useThread";
import { acceptThread } from "@/api/threadService";

import {
  CfsCodeBar,
  InfoBar,
  HistoryTable,
  ContentPanel,
  AgreementForm,
} from "@/components/";

export default function Thread() {
  const { cskey, cfstoken } = useParams({ strict: false });
  const { data, loading, error, refetch } = useThread(
    cskey as string,
    cfstoken as string,
  );
  const [isAccepted, setIsAccepted] = useState(false);

  const handleAccept = async () => {
    try {
      const result = await acceptThread(cskey as string, cfstoken as string);
      console.log("Response from server:", result);
      if (result.success) {
        setIsAccepted(true);
        await refetch();
      }
    } catch (err: unknown) {
      console.error(
        "Error accepting thread:",
        err instanceof Error ? err.message : String(err),
      );
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

      <HistoryTable showDefaultRow={true} history={data.history} />

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
