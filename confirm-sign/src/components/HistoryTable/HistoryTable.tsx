import { useState } from "react";
import type { HistoryEntry } from "../../api/types";
import HistoryRow from "../HistoryRow/HistoryRow";
import "./HistoryTable.scss";

interface HistoryTableProps {
  history: HistoryEntry[];
  showOnlyLast?: boolean;
}

const getMostRecentEntry = (history: HistoryEntry[]): HistoryEntry => {
  return history.reduce((latest, entry) =>
    entry.gmt > latest.gmt ? entry : latest,
  );
};

const HistoryTable = ({ history, showOnlyLast = false }: HistoryTableProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const total = history.length;

  if (total === 0) return null;
  const mostRecent = getMostRecentEntry(history);

  const handleToggle = () => {
    if (showOnlyLast) return;
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      className={`history-table ${showOnlyLast ? "history-table--compact" : ""}`}
    >
      {history.map((entry, index) => {
        const isMostRecent = entry.sid === mostRecent.sid;
        const isVisible = showOnlyLast
          ? isMostRecent
          : isExpanded || isMostRecent;

        if (!isVisible) return null;

        return (
          <HistoryRow
            key={entry.sid}
            entry={entry}
            index={index}
            total={total}
            isMostRecent={isMostRecent}
            onClick={isMostRecent ? handleToggle : undefined}
          />
        );
      })}
    </div>
  );
};

export default HistoryTable;
