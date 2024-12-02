import {Title} from "@/components/ui/typography";
import {User} from "lucide-react";
import {CardProfile} from "@/app/(bookwise)/profile/[id]/components/card-profile";
import {UserRatings} from "@/app/(bookwise)/profile/[id]/components/ratings";
import {Suspense} from "react";
import {InputSearch} from "@/components/input-search";
import {getRatings} from "@/lib/services/rating.service";

export default async function ProfilePage(props: {
    params: { id: string }
    searchParams?: Promise<{
        query?: string;
        page?: string;
        id: string
    }>;
}) {

    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';

    const response = await getRatings({user: props.params.id, size: 1, page: 1, search: query});

    return (
        <div className={"space-y-6"}>
            <div className={"pl-10 lg:pl-0"}>
                <Title text="Perfil" icon={<User color={"#50B2C0"} size={32}/>}/>
            </div>

            <div className={"grid gap-8 grid-cols-1 lg:grid-cols-4 lg:gap-12"}>
                <section className={"col-span-1 lg:col-span-3 space-y-8"}>
                    <InputSearch placeholder={"Buscar livro avaliado"}/>
                    <Suspense key={query + 1} fallback={<p>Carregando</p>}>
                        <UserRatings query={query} userId={props.params.id} initialRatings={response.data.data}/>
                    </Suspense>
                </section>

                <section
                    className={"col-span-1 order-first lg:border-l lg:pl-4 lg:border-l-gray-700 lg:pl-12  lg:order-last"}>
                    <CardProfile userId={props.params.id}/>
                </section>
            </div>
        </div>
    )
}
