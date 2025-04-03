import { useEffect } from "react";
import { useWindow } from "../hooks/useWindow";
import { cn } from "@/lib/utils";

interface WindowProps {
  title?: string;
  icon?: string;
  closable?: boolean;
  maximizable?: boolean;
  resizable?: boolean;
  modal?: boolean;
  growable?: boolean;
  initialSize?: { width: number; height: number };
  initialPosition?: { x: number; y: number };
  minimumSize?: { width: number; height: number };
  onClose?: () => void;
  children: React.ReactNode;
}

function Window({
  title = "",
  icon = "",
  closable = true,
  maximizable = true,
  resizable = true,
  modal = false,
  growable = false,
  initialSize = { width: 350, height: 0 },
  initialPosition = { x: 0, y: 0 },
  minimumSize = { width: 300, height: 0 },
  children,
}: WindowProps) {
  const {
    windowRef,
    state: { position, size, isMaximized, isDragging, isResizing },
    handlers: {
      handleMouseDown,
      handleResizeMouseDown,
      handleMouseMove,
      handleMouseUp,
      toggleMaximize,
    },
  } = useWindow({ initialSize, initialPosition });

  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={windowRef}
      className={cn("absolute z-20 max-w-[100vw] max-h-[100vh] p-[6px] bg-[#CCCCCC] border border-black shadow-[inset_-1px_-1px_#808080,inset_1px_1px_#FFFFFF,1px_1px_0_0_#000000]", isMaximized ? "fixed inset-0 max-w-none max-h-none" : "")}
      style={
        !isMaximized
          ? {
              width: size.width,
              height: size.height,
              left: position.x,
              top: position.y,
            }
          : undefined
      }
    >
      {/* Title Bar */}
      <div
        className="relative h-[20px] bg-gradient-to-b from-[#CCCCCC] to-[#9F9F9F] 
          flex items-center px-1 cursor-move select-none z-10
          border-b border-b-[#404040]"
        onMouseDown={handleMouseDown}
      >
        <div className="flex gap-[2px] mr-2">
          {/* Close Button */}
          <button
            className="w-[13px] h-[13px] rounded-none bg-[#DDDDDD] relative
              border border-t-[#FFFFFF] border-l-[#FFFFFF] border-r-[#808080] border-b-[#808080]
              before:absolute before:inset-[1px] before:border 
              before:border-t-[#DFDFDF] before:border-l-[#DFDFDF] 
              before:border-r-[#9F9F9F] before:border-b-[#9F9F9F]
              active:border-t-[#808080] active:border-l-[#808080] 
              active:border-r-[#FFFFFF] active:border-b-[#FFFFFF]
              active:before:border-t-[#9F9F9F] active:before:border-l-[#9F9F9F]
              active:before:border-r-[#DFDFDF] active:before:border-b-[#DFDFDF]
              flex items-center justify-center group"
          >
            <div className="w-[7px] h-[1px] bg-black group-active:translate-y-[1px]" />
          </button>
          {/* Maximize Button */}
          <button
            onClick={toggleMaximize}
            className="w-[13px] h-[13px] rounded-none bg-[#DDDDDD] relative
              border border-t-[#FFFFFF] border-l-[#FFFFFF] border-r-[#808080] border-b-[#808080]
              before:absolute before:inset-[1px] before:border 
              before:border-t-[#DFDFDF] before:border-l-[#DFDFDF] 
              before:border-r-[#9F9F9F] before:border-b-[#9F9F9F]
              active:border-t-[#808080] active:border-l-[#808080] 
              active:border-r-[#FFFFFF] active:border-b-[#FFFFFF]
              active:before:border-t-[#9F9F9F] active:before:border-l-[#9F9F9F]
              active:before:border-r-[#DFDFDF] active:before:border-b-[#DFDFDF]
              flex items-center justify-center group"
          >
            <div
              className="w-[7px] h-[7px] border border-black m-[2px] 
              group-active:translate-y-[1px] group-active:translate-x-[1px]"
            />
          </button>
        </div>
        <span
          className="text-[11px] font-bold text-black text-center flex-1 leading-[11px]
          tracking-normal font-['Chicago']"
        >
          {title}
        </span>
      </div>

      {/* Window Content */}
      <div className="p-[9px] overflow-auto h-[calc(100%-20px)] relative z-10 bg-[#E8E8E8]">
        {children}
      </div>

      {/* Resize Handle */}
      {!isMaximized && resizable && (
        <div
          className="absolute bottom-0 right-0 w-[15px] h-[15px] cursor-se-resize z-20
            after:absolute after:bottom-0 after:right-0 
            after:border-[5px] after:border-transparent
            after:border-r-[#808080] after:border-b-[#808080]"
          onMouseDown={handleResizeMouseDown}
        />
      )}
    </div>
  );
}

export default Window;
