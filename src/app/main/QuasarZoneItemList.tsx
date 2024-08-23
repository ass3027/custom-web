import {HTMLElement, parse} from "node-html-parser";
import ItemList, {Item} from "@/component/ItemList";
import {Suspense} from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Image from "next/image";
import {Badge} from "@/components/ui/badge";

export default async function QuasarZoneItemList() {
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
        //     <ItemList items={await getQuasarZoneItem()} imageUrl={imageUrl}/>
        // </Suspense>
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
        // image: item.querySelector("img")?.attributes.src,
        price: item.querySelector("span.text-orange")?.textContent || '?',
        url: baseUrl + item.querySelector("a")?.attributes.href || '',
        voted: item.querySelector("span.ctn-count")?.textContent || '0',
        comments: item.querySelector("span.count")?.textContent || '0',
    }
}