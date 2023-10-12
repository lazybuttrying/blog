import { getExpandedCategories } from "@/util/serverUtils";
import { CategoryObject } from "@/types/common";
import { Link } from "@/libs/navigator";
import { useLocale } from "next-intl";

const locales = ["en", "ko"];

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
    <li>
      <Link href={`${prePath}/${item}`}>{item}</Link>
    </li>
  ) : (
    Object.keys(item).map((key) => (
      <li key={key}>
        <Link href={`${prePath}/${key}`}>{key}</Link>
        <ul className="pl-2">
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

const BlogDetailPage = async () => {
  const locale = useLocale();
  const allPath = await getExpandedCategories(locale);

  if (!allPath) {
    return <></>;
  }

  return (
    <>
      <ul>
        {allPath.map((subCategories, index) => (
          <CategoryItem
            item={subCategories}
            key={`${locale}-${index}`}
            prePath="/blog"
          />
        ))}
      </ul>
    </>
  );
};

export default BlogDetailPage;
