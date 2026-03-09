import type { HistoryEntry } from "../../api/types";
import "./HistoryRow.scss";

interface HistoryRowProps {
  entry: HistoryEntry;
  index: number;
  total: number;
  isMostRecent?: boolean;
  onClick?: () => void;
}

const formatDate = (dateStr: string): string => {
  const [datePart, timePart] = dateStr.split(" ");
  const [year, month, day] = datePart.split("-");
  return `${day}/${month}/${year} a las ${timePart}`;
};

const formatGmt = (gmtStr: string): string => {
  const timePart = gmtStr.split(" ")[1];
  return `(${timePart} GMT)`;
};

const getStatusLabel = (entry: HistoryEntry): string => {
  if (!entry.description) {
    return entry.status;
  }
  return `Ticket de ${entry.description}`;
};

const HistoryRow = ({
  entry,
  index,
  total,
  isMostRecent = false,
  onClick,
}: HistoryRowProps) => {
  return (
    <div
      className={`history-row ${isMostRecent ? "history-row--active" : ""}`}
      onClick={onClick}
    >
      <span className="history-row__pagination">
        {isMostRecent && (
          <>
            <span className="history-row__arrows">↕</span>{" "}
          </>
        )}
        {index + 1}/{total}
      </span>

      <span className="history-row__description">
        <strong>{getStatusLabel(entry)}</strong> el{" "}
        <strong>{formatDate(entry.date)}</strong> - {formatGmt(entry.gmt)}
      </span>

      <span className="history-row__ip">
        IP: <strong>{entry.ip}</strong>
      </span>

      <span className="history-row__os">
        SO: <strong>{entry.OS}</strong>
      </span>

      <span className="history-row__nav">Nav: {entry.browser}</span>
    </div>
  );
};

export default HistoryRow;
