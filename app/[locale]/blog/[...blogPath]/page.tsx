import {
  getAllPosts,
  getExpandedCategories,
  getPost,
} from "@/util/serverUtils";
import { CategoryObject } from "@/types/common";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";
import { twJoin } from "tailwind-merge";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { useLocale } from "next-intl";
import Image from "next/image";
import { unstable_setRequestLocale } from "next-intl/server";

const locales = ["en", "ko"];

export const revalidate = 60; // revalidate at 1min

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const CategoryItem = ({
  item,
  prePath,
}: {
  item: CategoryObject;
  prePath: string;
}) =>
  typeof item === "string" ? (
    <li className="before:contents-['- '] before:inline">
      <Link href={`${prePath}/${item}`}>{item}</Link>
    </li>
  ) : (
    Object.keys(item).map((key) => (
      <li key={key}>
        <Link href={`${prePath}/${key}`}>{key}</Link>
        <ul className="ml-2">
          {item[key].map((subItem, index) => (
            <CategoryItem
              item={subItem}
              key={index}
              prePath={`${prePath}/${key}`}
            />
          ))}
        </ul>
      </li>
    ))
  );

const BlogDetailPage = async ({
  params,
}: {
  params: { locale: string; blogPath: string[] };
}) => {
  const locale = params.locale;
  unstable_setRequestLocale(params.locale);
  const pathWithLocale = [locale, ...params.blogPath];
  const fullLocalePath = pathWithLocale.join("/");
  const fullPath = params.blogPath.join("/");
  const allPath = await getExpandedCategories(fullLocalePath);

  if (allPath !== null && allPath.length === 0) {
    const postList = await getAllPosts(fullLocalePath);

    return (
      <>
        <Breadcrumb paths={params.blogPath} />
        <ul>
          {postList?.map((post: any) => (
            <li key={post.id}>
              <Link
                href={`/blog/${fullPath}/${post.name}`}
                className={twJoin(
                  "grid grid-cols-[120px_1fr]",
                  "w-full",
                  "gap-4 rounded-lg p-4",
                  "transition hover:bg-neutral-700",
                )}
              >
                <Image
                  src="https://images.unsplash.com/photo-1624482242445-222c452addfe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80"
                  alt=""
                  width={120}
                  height={120}
                  unoptimized
                />
                <div
                  className={twJoin("flex flex-col", "justify-between py-2")}
                >
                  <span>{post.name}</span>
                  <span className={twJoin("text-neutral-500")}>
                    설명설명설명설명설명
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  }

  if (allPath === null) {
    const _fullPath = pathWithLocale.slice(0, -1).join("/");
    const post = await getPost(
      _fullPath,
      params.blogPath[params.blogPath.length - 1],
    );

    return (
      <>
        <Breadcrumb paths={params.blogPath} />
        {post && (
          <article
            className={twJoin(
              "prose prose-base max-w-full",
              "prose-invert",
              "prose-a:break-all",
            )}
          >
            <MDXRemote
              source={post}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                },
              }}
            />
          </article>
        )}
      </>
    );
  }

  return (
    <>
      <Breadcrumb paths={params.blogPath} />
      <ul>
        {allPath.map((subCategories, index) => (
          <CategoryItem
            item={subCategories}
            key={`${params.blogPath[params.blogPath.length - 1]}-${index}`}
            prePath={`/blog/${fullPath}`}
          />
        ))}
      </ul>
    </>
  );
};

export default BlogDetailPage;
