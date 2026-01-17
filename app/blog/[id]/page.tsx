import { getBlogs, getBlogDetail } from "@/app/libs/microcms";
import { notFound } from "next/navigation";
import parse, { DOMNode, Element } from "html-react-parser";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

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
  console.log(`[Detail Page] Fetching ID: ${id}`);

  const blog = await getBlogDetail(id).catch((e) => {
    console.error(`[Detail Page] API Error:`, e);
    return null;
  });

  if (!blog) {
    return notFound();
  }

  const parseOptions = {
    replace: (domNode: DOMNode) => {
      if (domNode instanceof Element && domNode.name === "pre") {
        const codeNode = domNode.children[0];
        if (codeNode instanceof Element && codeNode.name === "code") {
          const className = codeNode.attribs.class || "";
          const language = className.replace("language-", "");
          const codeString =
            codeNode.children[0] && "data" in codeNode.children[0]
              ? codeNode.children[0].data
              : "";
          return (
            <div className="my-6 rounded-lg overflow-hidden shadow-lg text-sm">
              <SyntaxHighlighter language={language} style={vscDarkPlus}>
                {codeString}
              </SyntaxHighlighter>
            </div>
          );
        }
      }
    },
  };

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto font-sans">
      <article>
        <header className="mb-8 border-b pb-6">
          <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 items-center">
            <time>{new Date(blog.publishedAt).toLocaleDateString()}</time>
            {blog.category && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {blog.category.name}
              </span>
            )}
          </div>
          {/* タグ表示の修正: tagsの存在確認後にmapを実行 */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-4 flex gap-2">
              {blog.tags.map((tag) => (
                <span key={tag.id} className="text-xs px-2 py-1 border rounded-full">
                  #{tag.name}
                </span>
              ))}
            </div>
          )}
        </header>
        <div className="prose dark:prose-invert max-w-none">
          {parse(blog.content, parseOptions)}
        </div>
      </article>
    </main>
  );
}
