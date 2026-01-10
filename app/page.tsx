import { getBlogs, getBlogDetail } from "@/libs/microcms";
import { notFound } from "next/navigation";
import parse, { DOMNode } from "html-react-parser";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import DOMPurify from "dompurify"

// 静的生成（SSG）用：IDの一覧を事前に生成
export async function generateStaticParams() {
  const { contents } = await getBlogs();
  return contents.map((blog) => ({
    id: blog.id,
  }));
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. URLからIDを取得
  const { id } = await params;
  console.log(`[Page Log] Fetching blog detail for ID: ${id}`);

  // 2. microCMSからデータを取得（エラーハンドリング付き）
  const blog = await getBlogDetail(id).catch((e) => {
    console.error(`[Page Log] API Error:`, e);
    return null;
  });

  // データが取れなかった場合は404ページへ
  if (!blog) {
    console.log(`[Page Log] Blog data is null. Showing 404.`);
    notFound();
  }

function HtmlSanitizer(){
  interface SanitizedComponentProps {
    html: string;
  }

  const DangerouslySanitizedComponent = ({ html }: SanitizedComponentProps) => {
    const sanitizedHtml = DOMPurify.sanitize(html);

    return <div dangerouslySetInnerHTML={{__html: sanitizedHtml}}></div>;
  };
}

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto font-[family-name:var(--font-geist-sans)]">
      <article>
        <header className="mb-8 border-b pb-6">
          <h1 className="text-3xl font-bold mb-4 leading-tight">{blog.title}</h1>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 items-center">
            <time className="font-mono">
              {new Date(blog.publishedAt).toLocaleDateString()}
            </time>
            
            {/* カテゴリ表示 */}
            {blog.category && (
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                {blog.category.name}
              </span>
            )}
          </div>

          {/* ▼▼▼ 追加：タグを表示するMAP関数 ▼▼▼ */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-4 flex gap-2">
              {blog.tags.map((tag) => (
                <span 
                  key={tag.id} 
                  className="text-xs px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-full text-gray-600 dark:text-gray-300"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          )}
          {/* ▲▲▲ 追加終わり ▲▲▲ */}
          
        </header>

        <div className="prose dark:prose-invert max-w-none leading-relaxed">
          {parse(blog.content, parseOptions)}
        </div>
      </article>
    </main>
  );
}