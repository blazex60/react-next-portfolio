import { getBlogs } from "@/app/libs/microcms";
import Link from "next/link";

export default async function Home() {
  const { contents } = await getBlogs();

  console.log("[Top Page] Fetching blogs...", JSON.stringify(contents, null, 2));

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto font-sans">
      <header className="mb-10 border-b pb-4">
        <h1 className="text-3xl font-bold">Portfolio Dev Log</h1>
        <p className="text-gray-500 mt-2">Backend Engineer / Web Developer</p>
      </header>

      <section>
        <h2 className="text-xl font-semibold mb-6">Latest Articles</h2>
        
        {contents.length === 0 ? (
          <p className="text-gray-500 bg-gray-100 p-4 rounded">
            No contents found.
          </p>
        ) : (
          <div className="grid gap-4">
            {contents.map((blog) => (
              <article key={blog.id} className="p-6 border rounded-lg hover:shadow-lg transition bg-white dark:bg-gray-900 dark:border-gray-700">
                <Link href={`/blog/${blog.id}`} className="block">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      {blog.title}
                    </h3>
                    <time className="text-sm text-gray-400">
                      {new Date(blog.publishedAt).toLocaleDateString()}
                    </time>
                  </div>
                  <div className="flex gap-2 mb-3">
                    {blog.category && (
                      <span className="px-2 py-1 text-xs font-semibold bg-gray-200 dark:bg-gray-700 rounded">
                        {blog.category.name}
                      </span>
                    )}
                    {blog.tags?.map((tag) => (
                      <span key={tag.id} className="px-2 py-1 text-xs border rounded text-gray-500">
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
