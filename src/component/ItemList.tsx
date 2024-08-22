import {Key} from "react";

export default async function ItemList(props : {name: string,items:Item[]})  {
    return (
        <div className="item-wrapper">
            <h2>{props.name}</h2>
            <ul>
                {props.items.map((item: any, i: Key | null | undefined) =>
                    <li className={"item-li"} key={i}>
                        <div className="item">
                            <img className="item-img" src={item.image} alt={item.title}/>
                            <div className="item-title">
                                <p>{item.title}[{item.voted}]</p><p className="item-voted">{item.voted}</p>
                            </div>
                        </div>

                    </li>
                )}
            </ul>
        </div>
    )
}

export interface Item {
    title: string | undefined;
    image: string | undefined;
    voted: number;
    comments: number;
}