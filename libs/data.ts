// 型定義（ドメイン駆動設計のような意識）
export type Skill = {
  name: string;
  level: number; // 1-5の範囲（小数も許容）
  icon?: string; // アイコンクラス名など（今回は省略可）
};

export type History = {
  year: string;
  title: string;
  description: string;
};

// データ定義（ここを自分の内容に書き換えてください）
export const profileData = {
  name: "あなたの名前",
  role: "Backend Engineer / Web Developer",
  summary:
    "バックエンド開発を中心に、Webアプリケーションの設計・構築を学んでいます。PythonやTypeScriptを用いたAPI開発、データベース設計が得意です。効率的で保守性の高いコードを書くことを心がけています。",
  githubUrl: "https://github.com/yourname",
  skills: [
    { name: "Python", level: 5 },
    { name: "TypeScript", level: 4 },
    { name: "Next.js", level: 4 },
    { name: "SQL (MySQL/PostgreSQL)", level: 3 },
    { name: "Docker", level: 3 },
    { name: "AWS", level: 2 },
  ] as Skill[],
  histories: [
    {
      year: "2023.04 - Present",
      title: "〇〇大学 情報学部",
      description: "コンピュータサイエンス、アルゴリズム、ネットワークの基礎を専攻。",
    },
    {
      year: "2024.08",
      title: "チーム開発ハッカソン参加",
      description: "バックエンドリーダーとしてAPI設計を担当。技術賞を受賞。",
    },
    // 必要に応じて追加
  ] as History[],
};