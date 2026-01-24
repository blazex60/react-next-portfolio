import { createClient, type MicroCMSQueries } from "microcms-js-sdk";

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

export type Blog = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  eyecatch?: {
    url: string;
    height: number;
    width: number;
  };
  category?: {
    id: string;
    name: string;
  };
  tags?: {
    id: string;
    name: string;
  }[];
};

export const getBlogs = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Blog>({
    endpoint: "blogs",
    queries,
  });
  return listData;
};

export const getBlogDetail = async (contentId: string, queries?: MicroCMSQueries) => {
  const detailData = await client.getListDetail<Blog>({
    endpoint: "blogs",
    contentId,
    queries,
  });
  return detailData;
};

export type Skill = {
  name: string;
  level: number; // 1-5の範囲（小数も許容）
  icon?: string;
};

export type History = {
  year: string;
  title: string;
  description: string;
};

export type Profile = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
  role: string;
  summary: string;
  githubUrl?: string;
  skills: Skill[];
  histories: History[];
};

export const getProfile = async (queries?: MicroCMSQueries) => {
  const profileData = await client.getObject<Profile>({
    endpoint: "profile",
    queries,
  });
  return profileData;
};
