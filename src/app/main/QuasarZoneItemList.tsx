import {HTMLElement, parse} from "node-html-parser";
import ItemList, {Item} from "@/component/ItemList";
import {Suspense} from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area"

export default async function QuasarZoneItemList() {
    const imageUrl = "https://image.fmkorea.com/logos/fmkorealogo_h1.png"

    return (
        <Card>
            <CardHeader>
                <CardTitle>Products</CardTitle>
                <CardDescription>
                    Manage your products and view their sales performance.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea style={{ height: '60vh' }}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden w-[100px] sm:table-cell">
                                <span className="sr-only">Image</span>
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="hidden md:table-cell">Price</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <Suspense fallback={<div>Loading ...</div>}>
                            <ItemList items={await getQuasarZoneItem()} imageUrl={imageUrl}/>
                        </Suspense>
                    </TableBody>
                </Table>
                </ScrollArea>
            </CardContent>
            <CardFooter>
                <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong> products
                </div>
            </CardFooter>
        </Card>
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