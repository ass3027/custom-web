'use client';
import {Key, Suspense} from "react";
import styled from "./ItemList.module.css"

export default async function ItemList(props : {name: string,items:Item[]})  {

    const linkTo = (url: string) => window.location.href = 'https://www.fmkorea.com/' + url


    return (
        <Suspense fallback={<div>Loading ...</div>}>
            <div className={styled.itemWrapper}>
                <h2>{props.name}</h2>
                <ul>
                    {props.items.map((item: Item, i: Key | null | undefined) =>
                        <li className={styled.itemLi} key={i}>
                            <div className={styled.item} onClick={() => linkTo(item.url)}>
                                <img className={styled.itemImg} src={item.image} alt={item.title}/>
                                <div className={styled.itemTitle}>
                                    <p>{item.title}[{item.voted}]</p><p className="item-voted">{item.voted}</p>
                                </div>
                            </div>

                        </li>
                    )}
                </ul>
            </div>
        </Suspense>
    )
}

export interface Item {
    title: string | undefined;
    image: string | undefined;
    url : string;
    voted: number;
    comments: number;
}