'use client';
import {Key} from "react";
import styled from "./ItemList.module.css"
import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import Image from "next/image";
import {Badge} from "@/components/ui/badge";

export default function ItemList(props : {items:Item[],imageUrl:string})  {

    const addHttps = (url: string | undefined) => {
        if(url){
        if(!url.startsWith('https:')){
            return 'https:' + url
        }
        return url
        }else{
            return ''
        }
    }
    const linkTo = (url: string) => url ? window.location.href = url : alert('유효하지 않은 링크 입니다')

    return (
        <>
            {props.items.map((item: Item, i: Key | null | undefined) =>
            <TableRow key={i}>
                <TableCell className="hidden sm:table-cell">
                    <Image
                        alt="Product image"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={addHttps(item.image)}
                        width="64"
                    />
                </TableCell>
                <TableCell className="font-medium">
                    {item.title}[{item.voted}]
                </TableCell>
                <TableCell>
                    <Badge variant="outline">{item.voted}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{item.price}</TableCell>
            </TableRow>
            )}
        </>
    )
}

export interface Item {
    title: string | undefined;
    image: string | undefined;
    price: string;
    url: string;
    voted: string;
    comments: string;
}