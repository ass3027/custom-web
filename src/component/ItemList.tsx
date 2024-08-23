'use client';
import {Key} from "react";
import styled from "./ItemList.module.css"

export default function ItemList(props : {items:Item[],imageUrl:string})  {

    const linkTo = (url: string) => url ? window.location.href = url : alert('유효하지 않은 링크 입니다')

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
                                    <p>{item.title}[{item.voted}]</p>
                                    <p className="item-voted">조회수 {item.voted}</p>
                                    <p>{item.price}</p>
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
    price: string;
    url: string;
    voted: string;
    comments: string;
}