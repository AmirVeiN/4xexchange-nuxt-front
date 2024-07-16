import coin from "../public/coin2.png"
import loadingimg from "../public/loading3.png"
import Image from "next/image"


export default function LoadingPage() {
    return (
        <div className="flex justify-center items-center bg-white grow-1 w-full h-screen">
            <div className="flex relative">
                <Image src={loadingimg} alt="" width={300} />
                <div className="absolute -left-12 top-16">
                    <Image src={coin} alt="" width={120} className="animate-shake-vertical" />
                </div>
            </div>
        </div>
    )
}