import Image from "next/image"

interface ComparisonCardProps {
    beforeImage: string
    afterImage: string
    location: string
    beforeAlt: string
    afterAlt: string
}

export function ComparisonCard({
    beforeImage,
    afterImage,
    location,
    beforeAlt,
    afterAlt,
}: ComparisonCardProps) {
    return (
        <div className="bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1),0_40px_80px_rgba(0,0,0,0.05),0_10px_20px_rgba(0,0,0,0.05)] group hover:shadow-[0_45px_100px_rgba(0,0,0,0.2),0_15px_30px_rgba(0,0,0,0.1)] md:hover:-translate-y-2 md:transition-all duration-700 border-none relative group snap-center w-[85vw] md:w-full shrink-0">
            {/* Engraved Inner Border */}
            <div className="absolute inset-0 rounded-3xl border-[0.5px] border-slate-900/10 pointer-events-none z-20" />

            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-0.5 bg-slate-200">
                {/* Before Image */}
                <div className="relative group/before overflow-hidden aspect-square bg-muted">
                    <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 text-xs font-bold text-white bg-black/60 backdrop-blur-md rounded-full shadow-lg">
                            BEFORE
                        </span>
                    </div>
                    <Image
                        src={beforeImage}
                        alt={beforeAlt}
                        fill
                        quality={95}
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    {/* Soft Inner Shadow Overlay - Deepened */}
                    <div className="absolute inset-0 pointer-events-none shadow-[inset_0_2px_45px_rgba(0,0,0,0.15)] z-10" />
                </div>

                {/* After Image */}
                <div className="relative group/after overflow-hidden aspect-square bg-muted">
                    <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 text-xs font-bold text-white bg-orange/90 backdrop-blur-md rounded-full shadow-lg">
                            AFTER
                        </span>
                    </div>
                    <Image
                        src={afterImage}
                        alt={afterAlt}
                        fill
                        quality={95}
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    {/* Soft Inner Shadow Overlay - Deepened */}
                    <div className="absolute inset-0 pointer-events-none shadow-[inset_0_2px_45px_rgba(0,0,0,0.15)] z-10" />
                </div>
            </div>
        </div>
    )
}
