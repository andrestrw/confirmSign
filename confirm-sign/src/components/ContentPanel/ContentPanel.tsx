import type { ReactNode } from "react";
import "./ContentPanel.scss";

interface ContentPanelProps {
  content: string;
  children?: ReactNode;
}

const ContentPanel = ({ content, children }: ContentPanelProps) => (
  <div className="content-panel">
    <div className="content-panel__body">
      <div dangerouslySetInnerHTML={{ __html: content }} />
      {children}
    </div>
  </div>
);

export default ContentPanel;
