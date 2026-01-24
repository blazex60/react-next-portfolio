# Portfolio Dev Log

自身のポートフォリオサイト兼技術ブログです。
Next.js (App Router) をベースに、ヘッドレスCMSやサーバーサイド処理を活用したモダンなアーキテクチャで構築しました。

**Live Demo:** [ここにVercelのURLを貼ってください]

## 🛠 Tech Stack

**Frontend / Framework**
- Next.js 15+ (App Router, Server Actions)
- TypeScript
- Tailwind CSS v4
- React Syntax Highlighter (コードハイライト)

**Backend / Infrastructure**
- **microCMS**: ヘッドレスCMSによる記事・コンテンツ管理
- **Resend**: メール配信用API（お問い合わせフォーム連携）
- **Vercel**: ホスティング・デプロイ

## ✨ Features

### 1. 技術ブログ (MicroCMS Integration)
- microCMSから記事データをAPI経由で取得。
- `generateStaticParams` を使用した静的生成 (SSG) による高速なページ遷移。
- HTMLパーサーとシンタックスハイライターを組み合わせた、エンジニア向けのリッチな記事表示。

### 2. お問い合わせ機能 (Server Actions & Resend)
- **APIルート不要の実装**: Next.jsの `Server Actions` を使用し、フォーム送信処理をサーバー関数として実装。
- **堅牢なバリデーション**: サーバーサイドでの入力値チェック。
- **メール通知**: Resend APIを経由し、管理者に即時メール通知を行う仕組みを構築。

### 3. データ駆動のプロフィール
- 経歴やスキルセットをデータ構造（JSON/Object）として分離・管理し、コンポーネントで動的に描画。

## 🚀 Getting Started

ローカル環境での起動手順:

```bash
# 1. Clone the repository
git clone [https://github.com/your-username/react-next-portfolio.git](https://github.com/your-username/react-next-portfolio.git)

# 2. Install dependencies
npm install

# 3. Set up environment variables (.env.local)
# MICROCMS_SERVICE_DOMAIN=...
# MICROCMS_API_KEY=...
# RESEND_API_KEY=...

# 4. Run the development server
npm run dev
```

## 📝 microCMS Setup

このプロジェクトはmicroCMSを使用してブログ記事とプロフィール情報を管理しています。

### ブログAPI (blogs)
リスト形式のAPIを作成し、以下のフィールドを設定してください：

- **title** (テキスト) - 記事のタイトル
- **content** (リッチエディタ) - 記事の本文
- **eyecatch** (画像) - アイキャッチ画像
- **category** (コンテンツ参照) - カテゴリー
- **tags** (複数コンテンツ参照) - タグ

### プロフィールAPI (profile)
オブジェクト形式のAPIを作成し、以下のフィールドを設定してください：

- **name** (テキスト) - 名前
- **role** (テキスト) - 職種・役職
- **summary** (テキストエリア) - 自己紹介文
- **githubUrl** (テキスト) - GitHub URL（任意）
- **skills** (繰り返し) - スキル一覧
  - name (テキスト) - スキル名
  - level (数値) - レベル (1-5)
  - icon (テキスト) - アイコン（任意）
- **histories** (繰り返し) - 経歴
  - year (テキスト) - 年月
  - title (テキスト) - タイトル
  - description (テキストエリア) - 詳細

### 環境変数の設定

`.env.local`ファイルに以下を設定：

```bash
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
RESEND_API_KEY=your-resend-key
npm run dev