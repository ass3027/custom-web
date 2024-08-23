import FmItemList from "@/app/main/FmItemList";
import QuasarZoneItemList from "@/app/main/QuasarZoneItemList";

export default async function Page() {

    return (
        <div className="flex justify-around items-center" style={{ height: '80vh' }}>
            <FmItemList/>
            <QuasarZoneItemList/>
        </div>
    )
}