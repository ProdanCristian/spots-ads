import Image from "next/image"

interface LogoProps {
    width?: number
    height?: number
    className?: string
}

export function Logo({ width = 40, height = 40, }: LogoProps) {

    return (
        <div className="flex items-center gap-2">
            <Image
                src="/SpotsAds.svg"
                alt="SpotsAds"
                width={width}
                height={height}
                priority
            />
            <h2 className="text-xl font-russo-one -ml-2">SpotsAds</h2>
        </div>
    )
}
