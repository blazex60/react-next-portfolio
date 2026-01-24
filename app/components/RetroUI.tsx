"use client";

import { ReactNode, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

type WindowProps = {
  title: string;
  children: ReactNode;
  className?: string;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onFocus?: () => void;
  onPositionChange?: (x: number, y: number) => void;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  zIndex?: number;
  isMaximized?: boolean;
  isDraggable?: boolean;
};

export const Win95Window = ({ 
  title, 
  children, 
  className = "", 
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onPositionChange,
  x = 100,
  y = 100,
  width = 600,
  height = 400,
  zIndex = 1000,
  isMaximized = false,
  isDraggable = true,
}: WindowProps) => {
  const router = useRouter();
  const [position, setPosition] = useState({ x, y });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isDraggable || isMaximized) return;
    
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
      onFocus?.();
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const newX = e.clientX - dragOffset.x;
      const newY = Math.max(0, e.clientY - dragOffset.y);

      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        // ドラッグ終了時に位置を通知
        if (onPositionChange) {
          onPositionChange(position.x, position.y);
        }
      }
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset, position, onPositionChange]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.push("/");
    }
  };

  const handleWindowClick = () => {
    onFocus?.();
  };

  const displayX = isDragging ? position.x : x;
  const displayY = isDragging ? position.y : y;

  const style: React.CSSProperties = isMaximized ? {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "calc(100vh - 40px)", // タスクバーの高さを引く
    zIndex,
  } : {
    position: "fixed",
    left: `${displayX}px`,
    top: `${displayY}px`,
    width: `${width}px`,
    height: `${height}px`,
    zIndex,
  };

  return (
    <div 
      ref={windowRef}
      className={`win95-border-out p-1 bg-[#c0c0c0] ${className}`}
      style={style}
      onClick={handleWindowClick}
    >
      <div 
        className="bg-[#000080] text-white px-2 py-1 flex justify-between items-center mb-4 select-none cursor-move"
        onMouseDown={handleMouseDown}
      >
        <span className="font-bold tracking-wider text-sm">{title}</span>
        <div className="flex gap-0.5">
          {onMinimize && (
            <div 
              onClick={(e) => { e.stopPropagation(); onMinimize(); }}
              className="win95-border-out bg-[#c0c0c0] w-5 h-5 flex items-center justify-center text-black text-xs leading-none cursor-pointer active:border-inset hover:bg-gray-400 transition-colors"
            >
              _
            </div>
          )}
          {onMaximize && (
            <div 
              onClick={(e) => { e.stopPropagation(); onMaximize(); }}
              className="win95-border-out bg-[#c0c0c0] w-5 h-5 flex items-center justify-center text-black text-xs leading-none cursor-pointer active:border-inset hover:bg-gray-400 transition-colors"
            >
              □
            </div>
          )}
          <div 
            onClick={(e) => { e.stopPropagation(); handleClose(); }}
            className="win95-border-out bg-[#c0c0c0] w-5 h-5 flex items-center justify-center text-black text-xs leading-none cursor-pointer active:border-inset hover:bg-red-600 hover:text-white transition-colors"
          >
            ×
          </div>
        </div>
      </div>
      <div className="px-2 pb-2 text-black overflow-auto" style={{ maxHeight: isMaximized ? "calc(100vh - 100px)" : `${height - 60}px` }}>
        {children}
      </div>
    </div>
  );
};

// ... Win95Buttonは変更なし（そのままでOK）
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export const Win95Button = ({ children, className = "", ...props }: ButtonProps) => {
  return (
    <button
      className={`win95-border-out win95-btn bg-[#c0c0c0] px-4 py-1 text-black active:bg-[#c0c0c0] transition-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};