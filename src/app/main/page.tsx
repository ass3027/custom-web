import FmItemList from "@/app/main/FmItemList";
import QuasarZoneItemList from "@/app/main/QuasarZoneItemList";

export default function Page() {

    return (
        <div style={{display:"flex"}}>
            <FmItemList/>
            <QuasarZoneItemList/>
        </div>
    )
}