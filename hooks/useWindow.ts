import { useReducer, useRef, useCallback } from "react";

interface WindowState {
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMaximized: boolean;
  isDragging: boolean;
  isResizing: boolean;
  resizeStartSize?: { width: number; height: number };
  resizeStartPosition?: { x: number; y: number };
  minimumSize: { width: number; height: number };
  preMaximizePosition?: { x: number; y: number };
  preMaximizeSize?: { width: number; height: number };
}

type WindowAction =
  | { type: "MOVE"; payload: { x: number; y: number } }
  | { type: "RESIZE"; payload: { width: number; height: number } }
  | { type: "START_DRAG"; payload: { x: number; y: number } }
  | {
      type: "START_RESIZE";
      payload: { x: number; y: number; width: number; height: number };
    }
  | { type: "END_INTERACTION" }
  | { type: "TOGGLE_MAXIMIZE" };

const windowReducer = (
  state: WindowState,
  action: WindowAction
): WindowState => {
  switch (action.type) {
    case "MOVE":
      return {
        ...state,
        position: {
          x: action.payload.x,
          y: action.payload.y,
        },
      };
    case "RESIZE":
      return {
        ...state,
        size: {
          width: Math.max(action.payload.width, state.minimumSize.width),
          height: Math.max(action.payload.height, state.minimumSize.height),
        },
      };
    case "START_DRAG":
      return {
        ...state,
        isDragging: true,
      };
    case "START_RESIZE":
      return {
        ...state,
        isResizing: true,
        resizeStartSize: {
          width: action.payload.width,
          height: action.payload.height,
        },
        resizeStartPosition: {
          x: action.payload.x,
          y: action.payload.y,
        },
      };
    case "END_INTERACTION":
      return {
        ...state,
        isDragging: false,
        isResizing: false,
      };
    case "TOGGLE_MAXIMIZE":
      if (state.isMaximized) {
        // Restore previous position and size
        return {
          ...state,
          isMaximized: false,
          position: state.preMaximizePosition || state.position,
          size: state.preMaximizeSize || state.size,
        };
      } else {
        // Save current position and size before maximizing
        return {
          ...state,
          isMaximized: true,
          preMaximizePosition: { ...state.position },
          preMaximizeSize: { ...state.size },
        };
      }
    default:
      return state;
  }
};

interface UseWindowProps {
  initialSize: { width: number; height: number };
  initialPosition: { x: number; y: number };
  minimumSize?: { width: number; height: number };
}

export const useWindow = ({ 
  initialSize, 
  initialPosition, 
  minimumSize = { width: 200, height: 200 } 
}: UseWindowProps) => {
  const [state, dispatch] = useReducer(windowReducer, {
    position: initialPosition,
    size: initialSize,
    isMaximized: false,
    isDragging: false,
    isResizing: false,
    minimumSize,
  });

  const interactionStartPos = useRef({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (state.isMaximized) return;

      dispatch({
        type: "START_DRAG",
        payload: {
          x: e.clientX - state.position.x,
          y: e.clientY - state.position.y,
        },
      });

      interactionStartPos.current = {
        x: e.clientX - state.position.x,
        y: e.clientY - state.position.y,
      };
    },
    [state.isMaximized, state.position]
  );

  const handleResizeMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (state.isMaximized) return;

      dispatch({
        type: "START_RESIZE",
        payload: {
          x: e.clientX,
          y: e.clientY,
          width: state.size.width,
          height: state.size.height,
        },
      });

      interactionStartPos.current = {
        x: e.clientX,
        y: e.clientY,
      };
    },
    [state.isMaximized, state.size]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (state.isDragging) {
        dispatch({
          type: "MOVE",
          payload: {
            x: e.clientX - interactionStartPos.current.x,
            y: e.clientY - interactionStartPos.current.y,
          },
        });
      } else if (state.isResizing && state.resizeStartSize && state.resizeStartPosition) {
        const deltaX = e.clientX - state.resizeStartPosition.x;
        const deltaY = e.clientY - state.resizeStartPosition.y;
        
        const newWidth = state.resizeStartSize.width + deltaX;
        const newHeight = state.resizeStartSize.height + deltaY;
        
        dispatch({
          type: "RESIZE",
          payload: {
            width: newWidth,
            height: newHeight,
          },
        });
      }
    },
    [state.isDragging, state.isResizing, state.resizeStartSize, state.resizeStartPosition]
  );

  const handleMouseUp = useCallback(() => {
    dispatch({ type: "END_INTERACTION" });
  }, []);

  const toggleMaximize = useCallback(() => {
    dispatch({ type: "TOGGLE_MAXIMIZE" });
  }, []);

  return {
    windowRef,
    state,
    handlers: {
      handleMouseDown,
      handleResizeMouseDown,
      handleMouseMove,
      handleMouseUp,
      toggleMaximize,
    },
  };
};
