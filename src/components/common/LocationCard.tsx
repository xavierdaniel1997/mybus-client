import Image from "next/image";
import busImage from "../../../public/bannerimage.png"

export default function LocationCard(){
    return(
        <div>
            <Image
            src={busImage}
            alt="Locations"
            width={0}
            height={0}
            className="w-80 h-60 object-cover rounded-sm"
            />
        </div>
    )
}