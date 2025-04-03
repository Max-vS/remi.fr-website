import { useReducer, useRef, useCallback } from "react";

interface WindowState {
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMaximized: boolean;
  isDragging: boolean;
  isResizing: boolean;
}

type WindowAction =
  | { type: "START_DRAG"; payload: { x: number; y: number } }
  | {
      type: "START_RESIZE";
      payload: { x: number; y: number; width: number; height: number };
    }
  | { type: "MOVE"; payload: { x: number; y: number } }
  | { type: "RESIZE"; payload: { width: number; height: number } }
  | { type: "END_INTERACTION" }
  | { type: "TOGGLE_MAXIMIZE" };

const windowReducer = (
  state: WindowState,
  action: WindowAction
): WindowState => {
  switch (action.type) {
    case "START_DRAG":
      return {
        ...state,
        isDragging: true,
      };
    case "START_RESIZE":
      return {
        ...state,
        isResizing: true,
      };
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
          width: Math.max(200, action.payload.width), // Minimum width
          height: Math.max(100, action.payload.height), // Minimum height
        },
      };
    case "END_INTERACTION":
      return {
        ...state,
        isDragging: false,
        isResizing: false,
      };
    case "TOGGLE_MAXIMIZE":
      return {
        ...state,
        isMaximized: !state.isMaximized,
      };
    default:
      return state;
  }
};

interface UseWindowProps {
  initialSize: { width: number; height: number };
  initialPosition: { x: number; y: number };
}

export const useWindow = ({ initialSize, initialPosition }: UseWindowProps) => {
  const [state, dispatch] = useReducer(windowReducer, {
    position: initialPosition,
    size: initialSize,
    isMaximized: false,
    isDragging: false,
    isResizing: false,
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
      } else if (state.isResizing) {
        dispatch({
          type: "RESIZE",
          payload: {
            width:
              state.size.width + (e.clientX - interactionStartPos.current.x),
            height:
              state.size.height + (e.clientY - interactionStartPos.current.y),
          },
        });
      }
    },
    [state.isDragging, state.isResizing, state.size]
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
