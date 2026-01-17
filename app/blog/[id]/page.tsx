import { getBlogs, getBlogDetail } from "@/libs/microcms";
import { notFound } from "next/navigation";
import parse from "html-react-parser";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Win95Window } from "@/app/components/RetroUI"; // コンポーネント追加

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
  const { id } = await params;
  const blog = await getBlogDetail(id).catch(() => null);

  if (!blog) return notFound();

  const parseOptions = {
    replace: (domNode: any) => {
      if (domNode.name === "pre") {
        const codeNode = domNode.children[0];
        if (codeNode && codeNode.name === "code") {
          const className = codeNode.attribs.class || "";
          const language = className.replace("language-", "");
          const codeString = codeNode.children[0]?.data || "";
          return (
            <div className="my-4 border-2 border-gray-400">
              <SyntaxHighlighter language={language} style={vscDarkPlus} PreTag="div" customStyle={{ margin: 0 }}>
                {codeString}
              </SyntaxHighlighter>
            </div>
          );
        }
      }
    },
  };

  return (
    <main className="max-w-4xl mx-auto font-sans pb-8">
      <Win95Window title={`${blog.title} - Notepad`}>
        {/* メニューバー風装飾 */}
        <div className="flex gap-4 px-2 py-1 text-sm border-b border-gray-400 mb-2 select-none">
          <span className="underline">File</span>
          <span className="underline">Edit</span>
          <span className="underline">Search</span>
          <span className="underline">Help</span>
        </div>

        {/* 記事コンテンツエリア（ここを白背景・凹み枠線にする） */}
        <div className="win95-border-in bg-white p-6 min-h-[400px]">
          <header className="mb-6 border-b border-dashed border-gray-400 pb-4">
            <h1 className="text-2xl font-bold mb-2 font-mono">{blog.title}</h1>
            <div className="flex gap-4 text-xs text-gray-500 font-mono">
              <time>DATE: {new Date(blog.publishedAt).toLocaleDateString()}</time>
              <span>CAT : {blog.category?.name}</span>
            </div>
          </header>

          <div className="prose max-w-none font-mono text-sm leading-relaxed">
            {parse(blog.content, parseOptions)}
          </div>
        </div>
      </Win95Window>
    </main>
  );
}