import { useState } from "react";
import type { HistoryEntry } from "../../api/types";
import HistoryRow from "../HistoryRow/HistoryRow";
import "./HistoryTable.scss";

interface HistoryTableProps {
  history: HistoryEntry[];
  showDefaultRow: boolean;
}

const HistoryTable = ({
  history,
  showDefaultRow = true,
}: HistoryTableProps) => {
  const [clickedRow, setclickedRow] = useState<boolean>(false);
  const total = history.length;

  if (history.length === 0) return null;

  return (
    <div className={`history-table }`}>
      {showDefaultRow && clickedRow ? (
        history.map((element, index) => (
          <HistoryRow
            key={`${element.sid}-${index}`}
            row={element}
            index={index}
            total={total}
            onClick={() => setclickedRow(!clickedRow)}
          />
        ))
      ) : (
        <HistoryRow
          row={history[0]}
          index={0}
          total={total}
          onClick={() => setclickedRow(!clickedRow)}
        />
      )}
    </div>
  );
};

export default HistoryTable;
