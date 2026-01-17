import { getBlogs } from "@/libs/microcms";
import { Desktop } from "./components/Desktop";

export default async function Home() {
  // サーバーサイドでデータ取得
  const { contents } = await getBlogs();
  
  // クライアントコンポーネント（Desktop）にデータを渡して描画
  return <Desktop contents={contents} />;
}