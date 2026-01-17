import { profileData } from "@/app/libs/data";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto font-sans">
      {/* ナビゲーション（後で共通コンポーネント化しますが、一旦ここに置きます） */}
      <nav className="mb-8 flex gap-4 text-sm font-medium text-gray-500">
        <Link href="/" className="hover:text-black dark:hover:text-white transition">
          ← Back to Home
        </Link>
      </nav>

      {/* ヘッダーエリア */}
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{profileData.name}</h1>
        <p className="text-xl text-blue-600 dark:text-blue-400 font-medium">
          {profileData.role}
        </p>
        <p className="mt-6 leading-relaxed text-gray-700 dark:text-gray-300">
          {profileData.summary}
        </p>
      </header>

      {/* スキルセクション（データ駆動で表示） */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">Technical Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profileData.skills.map((skill) => (
            <div
              key={skill.name}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded border dark:border-gray-800"
            >
              <span className="font-semibold">{skill.name}</span>
              <div className="flex gap-1">
                {/* レベルに合わせて★を表示するロジック */}
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-4 rounded-full ${
                      i < skill.level
                        ? "bg-blue-600 dark:bg-blue-400"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 経歴セクション */}
      <section>
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">History</h2>
        <div className="space-y-8 border-l-2 border-gray-200 dark:border-gray-700 ml-3 pl-8 py-2">
          {profileData.histories.map((item, index) => (
            <div key={index} className="relative">
              {/* タイムラインのドット */}
              <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-white dark:border-black bg-blue-600 dark:bg-blue-400"></span>
              
              <span className="block text-sm text-gray-500 mb-1">{item.year}</span>
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}