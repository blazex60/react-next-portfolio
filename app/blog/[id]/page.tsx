import { getBlogs } from "@/libs/microcms";
import { redirect } from "next/navigation";

export async function generateStaticParams() {
  const { contents } = await getBlogs();
  return contents.map((blog) => ({
    id: blog.id,
  }));
}

export default async function BlogDetailPage() {
  redirect("/");
}
