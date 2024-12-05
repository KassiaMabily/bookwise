import defaultAvatar from "@/assets/default-avatar.png";
import Image from "next/image";

export function Avatar({userPhoto, alt, size = 40}: { userPhoto: string, alt: string, size?: number }) {
    return (
        <div className="rounded-full p-0.5 bg-gradient-to-b from-[#50B2C0] to-[#8381D9]">
            <div
                className="rounded-full overflow-hidden "
                style={{width: size, height: size}}
            >
                <Image
                    className="object-cover"
                    src={userPhoto === "" ? defaultAvatar : userPhoto}
                    alt={alt}
                    width={size}
                    height={size}
                />
            </div>
        </div>

    );
}