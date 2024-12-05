import githubImage from "@/assets/icons/github-white.png";
import googleImage from "@/assets/icons/google.png";
import visitorImage from "@/assets/icons/visitor.png";
import Image from "next/image";
import React from "react";

let options = {
    "google": {
        'text': "Entrar com Google",
        'image': googleImage
    },
    "visitor": {
        'text': "Acessar como visitante",
        'image': visitorImage
    },
    "github": {
        'text': "Entrar com Github",
        'image': githubImage
    },
}

export default function SocialButton({variant, ...props}: ISocialButton) {

    return (
        <button
            className="flex px-6 bg-gray-600 w-full rounded-lg py-4 space-x-3 hover:enabled:ring-2  hover:enabled:ring-gray-500 disabled:bg-opacity-40 disabled:cursor-not-allowed" {...props}>
            <Image src={options[variant].image} alt={options[variant].text} width={24} height={24}/>
            <span>{options[variant].text}</span>
        </button>
    )
}

interface ISocialButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant: keyof typeof options;
}
