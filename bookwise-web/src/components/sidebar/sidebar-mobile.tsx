import {Dialog, DialogBackdrop, DialogPanel, TransitionChild} from "@headlessui/react";
import {X} from "lucide-react";
import logo from "@/assets/logo.svg";
import Image from "next/image";
import {Navigation} from "@/components/sidebar/navigation";

export function SidebarMobile({sidebarOpen, setSidebarOpen}: {
    sidebarOpen: boolean,
    setSidebarOpen: (open: boolean) => void
}) {
    return (
        <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-800/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
            />

            <div className="fixed inset-0 flex">
                <DialogPanel
                    transition
                    className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                >
                    <TransitionChild>
                        <div
                            className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                            <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                                <span className="sr-only">Close sidebar</span>
                                <X aria-hidden="true" className="size-6 text-white"/>
                            </button>
                        </div>
                    </TransitionChild>
                    <div
                        className="flex flex-col w-full py-8 px-12 space-y-8 bg-cover bg-gray-800 bg-[url('./../assets/background-sidebar.png')] ">
                        <div className="flex h-16 shrink-0 items-center justify-center">
                            <Image src={logo} width={128} height={32} alt="Bookwise logo"/>
                        </div>
                        <div className={"flex-1 flex flex-col"}>
                            <Navigation/>
                        </div>

                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}