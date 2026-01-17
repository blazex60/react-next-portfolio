"use client"; // ▼ クライアントコンポーネント化

import { ReactNode } from "react";
import { useRouter } from "next/navigation"; // ▼ 追加

type WindowProps = {
  title: string;
  children: ReactNode;
  className?: string;
  onClose?: () => void; // ▼ 追加: 閉じる時の動作関数
};

export const Win95Window = ({ title, children, className = "", onClose }: WindowProps) => {
  const router = useRouter();

  // ▼ 閉じるボタンの処理
  const handleClose = () => {
    if (onClose) {
      // 親から動作が指定されている場合（トップページでの開閉など）
      onClose();
    } else {
      // 指定がない場合（Aboutページなど）はデスクトップに戻る
      router.push("/");
    }
  };

  return (
    <div className={`win95-border-out p-1 bg-[#c0c0c0] ${className}`}>
      <div className="bg-[#000080] text-white px-2 py-1 flex justify-between items-center mb-4 select-none">
        <span className="font-bold tracking-wider text-sm">{title}</span>
        {/* ▼ onClickイベントを追加 */}
        <div 
          onClick={handleClose}
          className="win95-border-out bg-[#c0c0c0] w-5 h-5 flex items-center justify-center text-black text-xs leading-none cursor-pointer active:border-inset hover:bg-red-600 hover:text-white transition-colors"
        >
          ×
        </div>
      </div>
      <div className="px-2 pb-2 text-black">
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