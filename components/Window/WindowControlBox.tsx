import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface WindowControlBoxProps {
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
}

const WindowControlBox = ({
  children,
  onClick,
  className,
}: WindowControlBoxProps) => (
  <div
    className={cn(
      "p-1 h-3 aspect-square bg-gradient-to-br from-system-5 to-white to-80% border border-black shadow-[inset_1px_1px_0_0_#CCCCCC,inset_-1px_-1px_0_0_#808080] active:shadow-[inset_1px_1px_0_0_#202020,inset_-1px_-1px_0_0_#808080] active:bg-gradient-to-br active:from-[#393939] active:to-[#808080] flex items-center justify-center text-system-6",
      className
    )}
    onClick={onClick}
  >
    {children}
  </div>
);

export default WindowControlBox;
