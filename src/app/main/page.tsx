import FmItemList from "@/app/main/FmItemList";

export default async function Page() {

    return (
        <div style={{display:"flex"}}>
            <FmItemList/>
            <FmItemList/>
        </div>
    )
}