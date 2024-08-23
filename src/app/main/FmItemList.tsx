import {HTMLElement, parse} from "node-html-parser";
import ItemList, {Item} from "@/component/ItemList";
import {Suspense} from "react";
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default async function FmItemList() {
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
                            <ItemList items={await getFmItem()} imageUrl={imageUrl}/>
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
const getFmItem = async () => {
    const res = await fetch("https://fmkorea.com/index.php?mid=hotdeal&sort_index=pop&order_type=desc")

    // @ts-ignore
    return parse(await res.text())
        ?.querySelectorAll(".fm_best_widget ul li div.li")
        ?.map(item => parsingItem(item));
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