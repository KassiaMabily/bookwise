import {getProfile} from "@/lib/services/account.service";
import {Avatar} from "@/components/ui/avatar";
import {Legend} from "@/components/ui/typography";
import {parseISO} from "date-fns";
import {Bookmark, BookOpen, Library, Users} from "lucide-react";

export async function CardProfile({userId}: { userId: string }) {
    const response = await getProfile(userId)

    if (!response.data.success) {
        return (
            <p>Usuário não encontrado</p>
        )
    }

    const user = response.data.data
    return (
        <section className={"space-y-8 lg:space-y-12"}>
            <div className={"flex flex-col items-center space-y-4 "}>
                <Avatar size={72} userPhoto={user.avatar} alt={user.full_name}/>
                <div className={"flex flex-col items-center"}>
                    <h2 className={" font-bold text-xl text-gray-100 "}>{user.full_name}</h2>
                    <Legend text={`membro desde ${parseISO(user.date_joined).getFullYear()}`}/>
                </div>
            </div>

            <div className={"space-y-6"}>
                <Stat value={user.stats.total_pages} label={"Páginas lidas"}
                      icon={<BookOpen size={32} className={"text-green-100"}/>}/>

                <Stat value={user.stats.total_books} label={"Livros avaliados"}
                      icon={<Library size={32} className={"text-green-100"}/>}/>

                <Stat value={user.stats.total_authors} label={"Autores lidos"}
                      icon={<Users size={32} className={"text-green-100"}/>}/>

                <Stat value={user.stats.trending_category} label={"Categoria mais lida"}
                      icon={<Bookmark size={32} className={"text-green-100"}/>}/>

            </div>
        </section>
    )
}

function Stat({value, label, icon}: { value: number | string, label: string, icon: React.ReactNode }) {
    return (
        <div className={"flex space-x-4 items-center"}>
            {icon}
            <div>
                <p className={"font-bold text-gray-100"}>{value}</p>
                <Legend text={label}/>
            </div>
        </div>
    )
}