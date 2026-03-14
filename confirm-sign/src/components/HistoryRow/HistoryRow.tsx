import type { HistoryEntry } from "../../api/types";
import "./HistoryRow.scss";

export interface HistoryRowProps {
  row: HistoryEntry;
  index: number;
  total: number;
  onClick?: () => void;
}

const formatDate = (dateString: string): string => {
  const [datePart, timePart] = dateString.split(" ");
  const [year, month, day] = datePart.split("-");
  return `${day}/${month}/${year} a las ${timePart}`;
};

const formatGmt = (gmtString: string): string => {
  const timePart = gmtString.split(" ")[1];
  return `(${timePart} GMT)`;
};

const getRowStatus = (row: HistoryEntry): string => {
  if (!row.description && !row.status) return `Ticket undefined`;
  if (row.description) return `Ticket de ${row.description}`;

  return `Ticket de ${row.status}`;
};

const HistoryRow = ({ row, index, total, onClick }: HistoryRowProps) => {
  return (
    <div className={`history-row `} onClick={onClick}>
      <span className="history-row__pagination">
        <span className="history-row__arrows">↕</span> {index + 1}/{total}
      </span>

      <span className="history-row__description">
        <strong>{getRowStatus(row)}</strong> el{" "}
        <strong>{formatDate(row.date)}</strong> - {formatGmt(row.gmt)}
      </span>

      <span className="history-row__ip">
        IP: <strong>{row.ip}</strong>
      </span>

      <span className="history-row__os">
        SO: <strong>{row.OS}</strong>
      </span>

      <span className="history-row__nav">Nav: {row.browser}</span>
    </div>
  );
};

export default HistoryRow;
