import { twJoin } from "tailwind-merge";

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className={twJoin("container mx-auto")}>{children}</main>;
};

export default BlogLayout;
