import type { ReactNode } from "react";
import "./ContentPanel.scss";

interface ContentPanelProps {
  content: string;
  children?: ReactNode;
}

export default function ContentPanel({ content, children }: ContentPanelProps) {
  return (
    <div className="content-panel">
      <div className="content-panel__body">
        <div dangerouslySetInnerHTML={{ __html: content }} />
        {children}
      </div>
    </div>
  );
}
