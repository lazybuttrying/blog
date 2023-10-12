import { H2 } from "@/components/BaseComponents"
import { FaLinux, FaStar } from "react-icons/fa"


const iconSize = 30;

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center p-5 gap-10">
    
    <section>
      <H2>
        Skill Tree
      </H2>
      <div>
        <ul>
            <li className="flex flex-row gap-5">
                <FaLinux size={iconSize}/> 
                <div className="flex text-yellow-900 gap-1">
                    <FaStar size={iconSize}/>
                    <FaStar size={iconSize}/>
                </div>
            </li>
        </ul>
      </div>
    </section>

    </main>
  )
}
