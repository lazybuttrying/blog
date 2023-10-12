import { twJoin } from "tailwind-merge";
import { FaAngleRight } from "react-icons/fa6";
import Link from "next/link";

const Breadcrumb = ({ paths }: { paths: string[] }) => {
  return (
    <nav className="mb-4 self-start border-b border-neutral-300 pb-4">
      <ul
        className={twJoin(
          "flex items-center",
          "gap-1 rounded-md p-2",
          "bg-neutral-750",
        )}
      >
        {paths.map((path, idx) => (
          <li className={twJoin("flex items-center gap-1")} key={idx}>
            {idx !== 0 && (
              <FaAngleRight size={16} className="text-neutral-400" />
            )}
            <Link
              href={`/blog/${paths.slice(0, idx + 1).join("/")}`}
              className="hover:underline"
            >
              {decodeURIComponent(path)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
