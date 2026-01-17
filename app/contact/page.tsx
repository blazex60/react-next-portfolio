"use client";

import { useActionState } from "react";
import { submitContactForm, ContactState } from "./actions";
import { Win95Window, Win95Button } from "@/app/components/RetroUI";

const initialState: ContactState = {
  success: false,
  message: "",
};

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  return (
    <main className="max-w-2xl mx-auto font-sans">
      <Win95Window title="Compose New Message">
        {state.success ? (
          <div className="text-center py-10 bg-white win95-border-in m-4">
            <h2 className="text-xl font-bold text-[#000080] mb-4">Message Sent</h2>
            <p className="mb-6 text-sm">{state.message}</p>
            <Win95Button onClick={() => (window.location.href = "/")}>
              OK
            </Win95Button>
          </div>
        ) : (
          <form action={formAction} className="p-2 space-y-4">
            {/* メニューバー風装飾 */}
            <div className="flex gap-4 pb-2 border-b border-white shadow-[0_1px_0_#808080] mb-4 select-none text-sm">
              <span className="flex items-center gap-1">✉️ Send</span>
              <span className="text-gray-500">📎 Attach</span>
            </div>

            {state.message && !state.success && (
              <div className="p-2 bg-red-100 text-red-600 text-sm border border-red-500">
                ⚠ {state.message}
              </div>
            )}

            {/* 名前入力 */}
            <div className="flex items-center gap-2">
              <label htmlFor="name" className="w-20 text-right text-sm">To (Name):</label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={state.inputs?.name}
                className="flex-1 p-1 win95-border-in focus:outline-none font-mono bg-white"
              />
            </div>
            {state.errors?.name && <p className="ml-20 text-red-600 text-xs">{state.errors.name[0]}</p>}

            {/* メールアドレス入力 */}
            <div className="flex items-center gap-2">
              <label htmlFor="email" className="w-20 text-right text-sm">From (Email):</label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={state.inputs?.email}
                className="flex-1 p-1 win95-border-in focus:outline-none font-mono bg-white"
              />
            </div>
            {state.errors?.email && <p className="ml-20 text-red-600 text-xs">{state.errors.email[0]}</p>}

            {/* メッセージ入力 */}
            <div className="mt-4">
              <textarea
                id="message"
                name="message"
                rows={8}
                defaultValue={state.inputs?.message}
                className="w-full p-2 win95-border-in focus:outline-none font-mono bg-white resize-none"
                placeholder="Type your message here..."
              ></textarea>
              {state.errors?.message && <p className="text-red-600 text-xs">{state.errors.message[0]}</p>}
            </div>

            {/* 送信ボタンエリア */}
            <div className="flex justify-end pt-2">
              <Win95Button type="submit" disabled={isPending} className="w-32">
                {isPending ? "Sending..." : "Send Mail"}
              </Win95Button>
            </div>
          </form>
        )}
      </Win95Window>
    </main>
  );
}