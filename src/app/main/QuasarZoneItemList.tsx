import {HTMLElement, parse} from "node-html-parser";
import ItemList, {Item} from "@/component/ItemList";
import {Suspense} from "react";

export default async function QuasarZoneItemList() {
    const imageUrl = "https://image.fmkorea.com/logos/fmkorealogo_h1.png"

    return (
        <Suspense fallback={<div>Loading ...</div>}>
            <ItemList items={await getQuasarZoneItem()} imageUrl={imageUrl}/>
        </Suspense>
    )
}
const getQuasarZoneItem = async () => {
    const res = await fetch("https://quasarzone.com/bbs/qb_saleinfo")

    return parse(await res.text())
        ?.querySelectorAll("div.market-type-list div.market-info-list")
        ?.map(item => parsingItem(item));
}

const baseUrl = 'https://quasarzone.com'

const parsingItem = (item: HTMLElement): Item => {
    // @ts-ignore
    return {
        title: item.querySelector("span.ellipsis-with-reply-cnt")?.textContent,
        image: item.querySelector("img")?.attributes.src,
        price: item.querySelector("span.text-orange")?.textContent || '?',
        url: baseUrl + item.querySelector("a")?.attributes.href || '',
        voted: item.querySelector("span.ctn-count")?.textContent || '0',
        comments: item.querySelector("span.count")?.textContent || '0',
    }
}