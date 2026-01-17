"use client";

import { useActionState } from "react";
import { submitContactForm, ContactState } from "./actions";
import Link from "next/link";

const initialState: ContactState = {
  success: false,
  message: "",
};

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto font-sans">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Contact</h1>
        <p className="text-gray-600 dark:text-gray-400">
          制作の依頼やご質問など、お気軽にお問い合わせください。
        </p>
      </header>

      <section className="bg-white dark:bg-gray-900 p-8 rounded-lg border dark:border-gray-800 shadow-sm">
        {state.success ? (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Thank You!</h2>
            <p className="mb-6">{state.message}</p>
            <Link
              href="/"
              className="inline-block px-6 py-2 bg-black text-white dark:bg-white dark:text-black rounded-full text-sm font-medium"
            >
              トップページに戻る
            </Link>
          </div>
        ) : (
          <form action={formAction} className="space-y-6">
            {state.message && !state.success && (
              <div className="p-4 bg-red-50 text-red-600 text-sm rounded border border-red-200">
                {state.message}
              </div>
            )}

            {/* 名前入力 */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                お名前 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                // ▼ 追加: defaultValueを設定
                defaultValue={state.inputs?.name}
                className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="山田 太郎"
              />
              {state.errors?.name && (
                <p className="text-red-500 text-xs mt-1">{state.errors.name[0]}</p>
              )}
            </div>

            {/* メールアドレス入力 */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                メールアドレス <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                // ▼ 追加: defaultValueを設定
                defaultValue={state.inputs?.email}
                className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
              />
              {state.errors?.email && (
                <p className="text-red-500 text-xs mt-1">{state.errors.email[0]}</p>
              )}
            </div>

            {/* メッセージ入力 */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                お問い合わせ内容 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                // ▼ 追加: defaultValueを設定
                defaultValue={state.inputs?.message}
                className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="お問い合わせ内容を入力してください..."
              ></textarea>
              {state.errors?.message && (
                <p className="text-red-500 text-xs mt-1">{state.errors.message[0]}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className={`w-full py-3 px-6 rounded-lg font-bold text-white transition-all ${
                isPending
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
              }`}
            >
              {isPending ? "送信中..." : "送信する"}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}