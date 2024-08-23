'use client';
import {Key} from "react";
import styled from "./ItemList.module.css"

export default function ItemList(props : {items:Item[],imageUrl:string})  {

    const linkTo = (url: string) => window.location.href = 'https://www.fmkorea.com/' + url


    return (
        <>
            <div className={styled.item_wrapper}>
                <img className={styled.icon} src={props.imageUrl} alt={"image"}/>
                <ul>
                    {props.items.map((item: Item, i: Key | null | undefined) =>
                        <li className={styled.item_li} key={i}>
                            <div className={styled.item} onClick={() => linkTo(item.url)}>
                                <img className={styled.item_img} src={item.image} alt={item.title}/>
                                <div className={styled.item_title}>
                                    <p>{item.title}[{item.voted}]</p><p className="item-voted">{item.voted}</p>
                                </div>
                            </div>

                        </li>
                    )}
                </ul>
            </div>
        </>
    )
}

export interface Item {
    title: string | undefined;
    image: string | undefined;
    url: string;
    voted: number;
    comments: number;
}