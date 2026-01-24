import { getBlogs, getProfile } from "@/libs/microcms";
import { Desktop } from "./components/Desktop";
import { profileData as fallbackProfileData } from "@/libs/data";

export default async function Home() {
  // サーバーサイドでデータ取得
  const { contents: blogs } = await getBlogs();
  
  // microCMSからプロフィールを取得、失敗時はフォールバックを使用
  let profileData;
  try {
    profileData = await getProfile();
    console.log("Profile data from microCMS:", profileData);
  } catch (error) {
    console.warn("Failed to fetch profile from microCMS, using fallback data:", error);
    const now = new Date().toISOString();
    profileData = {
      id: "fallback",
      createdAt: now,
      updatedAt: now,
      publishedAt: now,
      revisedAt: now,
      name: fallbackProfileData.name,
      role: fallbackProfileData.role,
      summary: fallbackProfileData.summary,
      githubUrl: fallbackProfileData.githubUrl,
      skills: fallbackProfileData.skills,
      histories: fallbackProfileData.histories,
    };
    console.log("Using fallback profile data:", profileData);
  }
  
  // クライアントコンポーネント（Desktop）にデータを渡して描画
  return <Desktop blogs={blogs} profileData={profileData} />;
}