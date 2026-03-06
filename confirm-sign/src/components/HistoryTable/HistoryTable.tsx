import type { HistoryEntry } from "../../api/types";
import "./HistoryTable.scss";

interface HistoryTableProps {
  history: HistoryEntry[];
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

const HistoryTable = ({ history }: HistoryTableProps) => {
  const total = history.length;

  return (
    <div className="history-table">
      {history.map((entry, index) => (
        <div
          key={entry.sid}
          className={`history-table__row ${index === 0 ? "history-table__row--active" : ""}`}
        >
          <span className="history-table__pagination">
            {index === 0 && (
              <>
                <span className="history-table__arrows">↕</span>{" "}
              </>
            )}
            {index + 1}/{total}
          </span>

          <span className="history-table__description">
            <strong>{getStatusLabel(entry)}</strong> el{" "}
            <strong>{formatDate(entry.date)}</strong> - {formatGmt(entry.gmt)}
          </span>

          <span className="history-table__ip">
            IP: <strong>{entry.ip}</strong>
          </span>

          <span className="history-table__os">
            SO: <strong>{entry.OS}</strong>
          </span>

          <span className="history-table__nav">Nav: {entry.browser}</span>
        </div>
      ))}
    </div>
  );
};

export default HistoryTable;
