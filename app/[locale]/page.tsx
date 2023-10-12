import Image from 'next/image'
import { H1 } from "@/components/BaseComponents"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-10">
    
      <H1>Hello Stranger</H1>

      <section>
        <p>
          About page is portfolio
        </p>

        <p>
          Blog page is just blog
        </p>
      </section>

    </main>
  )
}
