import logo from "@/assets/logo.svg";
import {Title} from "../components/ui/typography";
import Image from "next/image";
import {LoginButtons} from "@/components/login-buttons";

export default function Home() {
    return (
        <main className="h-full flex gap-8">
            <div
                className="hidden relative h-full lg:flex lg:w-4/12 rounded-[10px] bg-center bg-cover flex justify-center items-center bg-no-repeat bg-[url('./../assets/background-signin.png')]">
                <Image src={logo} alt="Bookwise"/>
            </div>
            <div className="flex-1 flex flex-col space-y-8 items-center justify-center">
                <Image src={logo} alt="Bookwise" className={"lg:hidden"}/>

                <div>
                    <Title text="Boas vindas!"/>
                    <h2 className="leading-6">Faça seu login ou acesse como visitante</h2>
                    <LoginButtons/>
                </div>
            </div>
        </main>
    );
}
