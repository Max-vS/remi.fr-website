import { useEffect } from "react";
import { useWindow } from "../../hooks/useWindow";
import { cn } from "@/lib/utils";
import Image from "next/image";
import TitleBarSide from "./WindowTitleBarSide";
import WindowControlBox from "./WindowControlBox";
import { Maximize, Maximize2, Plus, X } from "lucide-react";

interface WindowProps {
  title?: string;
  icon?: string;
  closable?: boolean;
  maximizable?: boolean;
  resizable?: boolean;
  scrollable?: boolean;
  modal?: boolean;
  initialSize?: { width: number; height: number };
  initialPosition?: { x: number; y: number };
  minimumSize?: { width: number; height: number };
  header?: React.ReactNode;
  onClose?: () => void;
  children: React.ReactNode;
}

function Window({
  title = "",
  icon = "",
  closable = true,
  maximizable = true,
  resizable = true,
  scrollable = true,
  modal = false,
  initialSize = { width: 500, height: 300 },
  initialPosition = { x: 200, y: 200 },
  minimumSize = { width: 300, height: 300 },
  header,
  onClose,
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
  } = useWindow({
    initialSize,
    initialPosition,
    minimumSize,
  });

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
      className={cn(
        "absolute z-20 max-w-screen max-h-screen p-1.5 bg-system-3 border border-black shadow-[inset_-1px_-1px_#808080,inset_1px_1px_#FFFFFF,1px_1px_0_0_#000000]",
        modal ? "m-0 p-0" : "",
        isMaximized ? "!fixed inset-0 !m-0" : ""
      )}
      style={
        !isMaximized
          ? {
              width: size.width,
              height: size.height,
              left: position.x,
              top: position.y,
            }
          : { width: "100%", height: "100%" }
      }
    >
      {/* Title Bar */}
      <div
        className="relative flex flex-row h-4 pb-1.5 text-center border-none shadow-none gap-1.5"
        onMouseDown={handleMouseDown}
      >
        {/* Close Button */}
        {closable && (
          <WindowControlBox onClick={onClose}>
            <X className="h-2.5 w-2.5" strokeWidth={4} />
          </WindowControlBox>
        )}

        {/* Title Bar */}
        <div className="flex flex-row flex-grow text-center justify-center items-center cursor-grab">
          {title !== "" ? (
            <>
              <TitleBarSide />
              {icon && (
                <div className="max-w-6 max-h-6 px-1.5 py-0 relative h-full">
                  <Image
                    src={icon}
                    alt={title}
                    fill
                    sizes="24px"
                    className="select-none pointer-events-none object-contain"
                    priority={false}
                  />
                </div>
              )}
              <div className="text-sm text-center font-black px-3 overflow-hidden !h-6 select-none">
                {title}
              </div>
              <TitleBarSide />
            </>
          ) : (
            <div className="flex flex-grow w-auto h-[12px] mx-[3px] my-[6px] p-0" />
          )}
        </div>

        {/* Maximize Button */}
        {maximizable && (
          <WindowControlBox onClick={toggleMaximize}>
            {isMaximized ? (
              <Maximize className="h-2.5 w-2.5" strokeWidth={4} />
            ) : (
              <Plus className="h-2.5 w-2.5" strokeWidth={4} />
            )}
          </WindowControlBox>
        )}
      </div>
      {header && (
        <div className="sticky z-50 top-0 flex flex-row items-center justify-center border border-system-7 border-b-system-5 shadow-[inset_-1px_-1px_system-5,inset_1px_1px_white,1px_1px_0_0_black]">
          {header}
        </div>
      )}

      {/* Window Content */}
      <div
        className={cn(
          scrollable ? "" : "!overflow-hidden",
          modal
            ? "w-[calc(100%-3px)] h-[calc(100%-30px)] m-0 p-[1.5px] border-0 border-t-[1.5px] border-t-black bg-system-3 shadow-[inset_-1px_-1px_#808080,inset_1px_1px_white,1px_1px_0_0_black]"
            : "relative block overflow-auto bg-white h-[calc(100%-18px)] border border-black shadow-[-1px_-1px_#808080,1px_1px_white]",
          header ? "relative block overflow-auto h-[calc(100%-48px)]" : ""
        )}
      >
        <div className={cn("block h-full", modal ? "p-[3px]" : "")}>
          {children}
        </div>
      </div>

      {/* Resize Handle */}
      {resizable && (
        <div
          className="absolute z-[999] right-[6px] bottom-[6px] w-[20px] h-[20px] -m-[3px_2px] p-0 cursor-grab select-none border-t border-l border-t-system-1 border-l-system-1 bg-system-3 icon-resizer bg-no-repeat bg-center bg-[length:12px] shadow-[1px_1px_0_#CCCCCC,-1px_-1px_0_#CCCCCC,-2px_-2px_0_#202020]"
          onMouseDown={handleResizeMouseDown}
        />
      )}
    </div>
  );
}

export default Window;
