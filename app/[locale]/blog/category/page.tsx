"use client";

import { H2, H3 } from "@/components/BaseComponents";
import { useSearchParams } from "next/navigation";
import { Capitalize } from "@/util/stringUtil";
import Link from "next/link";
import Image from "next/image";

const data = [
  {
    title: "Button을 넣자",
    thumbnail:
      "https://images.unsplash.com/photo-1624482242445-222c452addfe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
    description:
      "살려줘살려줘살려줘살려줘살려줘살려줘살려줘살려줘살려줘살려줘살려줘살려줘살려줘살려줘살려줘살려줘살려줘살려줘살려줘살려줘살려줘",
  },
  {
    title: "Panel을 넣자",
    thumbnail:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "배경이다 임마",
  },
];

export default function Category() {
  const urlParam = useSearchParams();

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-5">
      <H2>{Capitalize(urlParam.get("first") as string)}</H2>
      <H3>{Capitalize(urlParam.get("second") as string)}</H3>

      <section>
        <ul className="flex flex-col gap-5">
          {data.map((obj, idx) => (
            <li key={idx}>
              <Link
                href={{
                  pathname: "/blog/post",
                  query: { idx: idx },
                }}
                className="flex flex-row gap-5"
              >
                <Image
                  className="h-[250px] w-[250px] rounded bg-gray-600 object-contain"
                  src={obj.thumbnail}
                  alt={obj.title}
                  width={250}
                  height={250}
                  unoptimized
                />
                <div>
                  <H3>{obj.title}</H3>
                  <p>{obj.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
