import {NavItem} from "@/components/sidebar/nav-item";
import {ChartLine, LogIn, LogOut, Telescope, User} from "lucide-react";
import {useRouter} from "next/navigation";
import {useAuth} from "@/context/AuthContext";

export function Navigation() {
    const router = useRouter();
    const {isLoggedIn, user, logout} = useAuth();

    const handleLogin = () => {
        router.push("/")
    }

    const handleLogout = () => {
        logout()
    }


    return (
        <>
            <nav className="flex flex-1 flex-col">
                <ul role="list" className={`flex flex-col items-start space-y-6`}>
                    <NavItem name={"Inicio"} href={"/home"}
                             icon={<ChartLine size={24}/>}/>
                    <NavItem name={"Explorar"} href={"/explore"}
                             icon={<Telescope size={24}/>}/>
                    {
                        isLoggedIn && (
                            <NavItem name={"Perfil"} href={`/profile/${user.user.id}`}
                                     icon={<User size={24}/>}/>
                        )
                    }
                </ul>
            </nav>
            <div className={"flex items-center"}>
                {
                    isLoggedIn ? (
                        <button onClick={handleLogout}
                                className={"flex-1 flex items-center justify-center space-x-2"}>
                            <span>Sair</span> <LogOut className={"text-green-100"}/>
                        </button>
                    ) : (
                        <button onClick={handleLogin}
                                className={"flex-1 flex justify-center items-center space-x-2"}>
                            <span>Fazer login</span> <LogIn className={"text-green-100"}/>
                        </button>
                    )
                }
            </div>
        </>
    )
}