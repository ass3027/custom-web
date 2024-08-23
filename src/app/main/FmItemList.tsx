import {HTMLElement, parse} from "node-html-parser";
import ItemList, {Item} from "@/component/ItemList";
import {Suspense} from "react";
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
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
    // const imageUrl = "https://image.fmkorea.com/logos/fmkorealogo_h1.png"
    const imageUrl = ""

    return (
        <Card>
            <CardHeader>
                <CardTitle>Products</CardTitle>
                <CardDescription>
                    Manage your products and view their sales performance.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden w-[100px] sm:table-cell">
                                <span className="sr-only">Image</span>
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="hidden md:table-cell">Price</TableHead>
                            <TableHead className="hidden md:table-cell">
                                Total Sales
                            </TableHead>
                            <TableHead className="hidden md:table-cell">Created at</TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="hidden sm:table-cell">
                                <Image
                                    alt="Product image"
                                    className="aspect-square rounded-md object-cover"
                                    height="64"
                                    src="/placeholder.svg"
                                    width="64"
                                />
                            </TableCell>
                            <TableCell className="font-medium">
                                Laser Lemonade Machine
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline">Draft</Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">$499.99</TableCell>
                            <TableCell className="hidden md:table-cell">25</TableCell>
                            <TableCell className="hidden md:table-cell">
                                2023-07-12 10:42 AM
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="hidden sm:table-cell">
                                <Image
                                    alt="Product image"
                                    className="aspect-square rounded-md object-cover"
                                    height="64"
                                    src="/placeholder.svg"
                                    width="64"
                                />
                            </TableCell>
                            <TableCell className="font-medium">
                                Hypernova Headphones
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline">Active</Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">$129.99</TableCell>
                            <TableCell className="hidden md:table-cell">100</TableCell>
                            <TableCell className="hidden md:table-cell">
                                2023-10-18 03:21 PM
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="hidden sm:table-cell">
                                <Image
                                    alt="Product image"
                                    className="aspect-square rounded-md object-cover"
                                    height="64"
                                    src="/placeholder.svg"
                                    width="64"
                                />
                            </TableCell>
                            <TableCell className="font-medium">AeroGlow Desk Lamp</TableCell>
                            <TableCell>
                                <Badge variant="outline">Active</Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">$39.99</TableCell>
                            <TableCell className="hidden md:table-cell">50</TableCell>
                            <TableCell className="hidden md:table-cell">
                                2023-11-29 08:15 AM
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="hidden sm:table-cell">
                                <Image
                                    alt="Product image"
                                    className="aspect-square rounded-md object-cover"
                                    height="64"
                                    src="/placeholder.svg"
                                    width="64"
                                />
                            </TableCell>
                            <TableCell className="font-medium">
                                TechTonic Energy Drink
                            </TableCell>
                            <TableCell>
                                <Badge variant="secondary">Draft</Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">$2.99</TableCell>
                            <TableCell className="hidden md:table-cell">0</TableCell>
                            <TableCell className="hidden md:table-cell">
                                2023-12-25 11:59 PM
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong> products
                </div>
            </CardFooter>
        </Card>
    // <Suspense fallback={<div>Loading ...</div>}>
    //     <ItemList items={await getFmItem()} imageUrl={imageUrl}/>
    // </Suspense>
    )
}
const getFmItem = async () => {
    const res = await fetch("https://www.fmkorea.com/index.php?mid=hotdeal&sort_index=pop&order_type=desc")
    console.log(res)
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
        // image: item.querySelector("img")?.attributes["data-original"],
        price: item.querySelector("div.hotdeal_info")?.childNodes[3].childNodes[1]?.textContent || '?',
        url: baseUrl + item.querySelector("a")?.attributes.href || '',
        voted: item.querySelector(".count")?.textContent || '0',
        comments: item.querySelector(".comment_count")?.textContent?.slice(1, -1) || '0',
    }
}