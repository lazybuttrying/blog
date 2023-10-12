import supabase from "@/libs/supabase";
import { CategoryObject } from "@/types/common";
import prisma from "@/libs/prisma";

export const expandCategories = async (
  categories: string[],
  prePath?: string,
): Promise<CategoryObject[]> => {
  return (await Promise.all(
    categories.map(async (category) => {
      const { data } = await supabase.storage
        .from("post")
        .list(`${prePath}/${category}`);
      if (!data) {
        return;
      }
      const subPaths = data
        .filter((item) => !item.metadata)
        .map((item) => item.name);

      if (subPaths.length === 0) {
        return category;
      } else {
        return {
          [category]: await expandCategories(
            subPaths,
            `${prePath}/${category}`,
          ),
        };
      }
    }),
  )) as any;
};

export const getExpandedCategories = async (path: string) => {
  const { data } = await supabase.storage.from("post").list(path);
  if (!data || data.length === 0) {
    return null;
  }

  const categories = data
    .filter((item) => !item.metadata)
    .map((item) => item.name);

  return expandCategories(categories, path);
};

export const getAllPosts = async (path: string) => {
  const { data } = await supabase.storage.from("post").list(path);
  if (!data) {
    return null;
  }

  const files = data
    .filter((item) => item.metadata)
    .map((item) => parseInt(item.name.split(".", 1)[0]));

  const posts = await prisma.postName.findMany({
    where: {
      id: {
        in: files,
      },
    },
    select: {
      id: true,
      name: true,
    },
  });

  return posts;
};

export const getPost = async (path: string, title: string) => {
  const fileName = await prisma.postName.findUnique({
    where: {
      name: decodeURIComponent(title),
    },
  });

  if (!fileName) {
    return null;
  }

  const { data } = await supabase.storage
    .from("post")
    .download(`${path}/${fileName.id}.md`);
  if (!data) {
    return null;
  }

  return data.text();
};
