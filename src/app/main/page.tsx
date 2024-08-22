import {Suspense} from "react";
import ItemList, {Item} from "@/component/ItemList";
import {HTMLElement, parse} from "node-html-parser";
import {ToNumber} from "@/app/page";

export default async function Page() {

    return (
        <div style={{display:"flex"}}>
            <Suspense fallback={<div>Loading ...</div>}>
                <ItemList name="fm" items={await getFmItem()}/>
            </Suspense>
            <Suspense fallback={<div>Loading ...</div>}>
                <ItemList name="quasar" items={await getFmItem()}/>
            </Suspense>
        </div>
    )
}

const getFmItem = async () => {
    const res = await fetch("https://www.fmkorea.com/index.php?mid=hotdeal&sort_index=pop&order_type=desc")

    // @ts-ignore
    return parse(await res.text())
        .querySelectorAll(".fm_best_widget ul li div.li")
        .map(item => parsingItem(item));
}

const parsingItem = (item: HTMLElement): Item => {
    // @ts-ignore
    return {
        title: item.querySelector("img")?.attributes.alt,
        image: item.querySelector("img")?.attributes["data-original"],
        voted: ToNumber(item.querySelector(".count")?.textContent),
        comments: ToNumber(item.querySelector(".comment_count")?.textContent?.slice(1, -1)),
    }
}