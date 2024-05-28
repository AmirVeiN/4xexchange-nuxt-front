import loading from "../public/loading.gif"
import Image from "next/image"

export default function LoadingPage() {
    return (
        <div className="flex justify-center items-center bg-black grow-1 w-full h-screen">
            <div>
                <Image src={loading} alt=""  width={300} />
            </div>
        </div>
    )
}