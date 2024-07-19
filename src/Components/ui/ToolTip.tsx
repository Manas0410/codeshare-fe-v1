import { ReactNode } from "react";

const ToolTip = ({
  tooltipText,
  children,
  isOpen,
}: {
  tooltipText: string;
  children: ReactNode;
  isOpen: boolean;
}) => {
  return (
    <div className="tooltip-container">
      {isOpen && <span className="tooltip">{tooltipText}</span>}
      <span className="text">{children}</span>
    </div>
  );
};

export default ToolTip;
