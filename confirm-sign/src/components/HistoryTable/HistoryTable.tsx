import { useState } from "react";
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

const getMostRecentEntry = (history: HistoryEntry[]): HistoryEntry => {
  return history.reduce((latest, entry) =>
    entry.gmt > latest.gmt ? entry : latest,
  );
};

const HistoryTable = ({ history }: HistoryTableProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const total = history.length;
  const mostRecent = getMostRecentEntry(history);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="history-table">
      {history.map((entry, index) => {
        const isMostRecent = entry.sid === mostRecent.sid;

        const isVisible = isExpanded || isMostRecent;

        if (!isVisible) return null;

        return (
          <div
            key={entry.sid}
            className={`history-table__row ${isMostRecent ? "history-table__row--active" : ""}`}
            onClick={isMostRecent ? handleToggle : undefined}
          >
            <span className="history-table__pagination">
              {isMostRecent && (
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
        );
      })}
    </div>
  );
};

export default HistoryTable;
