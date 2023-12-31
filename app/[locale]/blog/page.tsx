import { getExpandedCategories } from "@/util/serverUtils";
import { CategoryObject } from "@/types/common";
import { Link } from "@/libs/navigator";
import { useLocale } from "next-intl";

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
      <li key={key} className="py-4">
        <Link href={`${prePath}/${key}`}>
          <b className="text-lg">{key}</b>
        </Link>
        <ul className="pl-4">
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
