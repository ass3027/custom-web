import {HTMLElement, parse} from "node-html-parser";
import ItemList, {Item} from "@/component/ItemList";
import {Suspense} from "react";

export default async function FmItemList() {
    const imageUrl = "https://image.fmkorea.com/logos/fmkorealogo_h1.png"

    return (
        <Suspense fallback={<div>Loading ...</div>}>
            <ItemList items={await getFmItem()} imageUrl={imageUrl}/>
        </Suspense>
    )
}
const getFmItem = async () => {
    const res = await fetch("https://www.fmkorea.com/index.php?mid=hotdeal&sort_index=pop&order_type=desc")

    // @ts-ignore
    return parse(await res.text())
        .querySelectorAll(".fm_best_widget ul li div.li")
        .map(item => parsingItem(item));
}

const baseUrl = 'https://www.fmkorea.com/'

const parsingItem = (item: HTMLElement): Item => {
    // @ts-ignore
    return {
        title: item.querySelector("img")?.attributes.alt,
        image: item.querySelector("img")?.attributes["data-original"],
        price: item.querySelector("div.hotdeal_info")?.childNodes[3].childNodes[1]?.textContent || '?',
        url: baseUrl + item.querySelector("a")?.attributes.href || '',
        voted: item.querySelector(".count")?.textContent || '0',
        comments: item.querySelector(".comment_count")?.textContent?.slice(1, -1) || '0',
    }
}