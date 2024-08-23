"use client";
import { CardContent, Card, CardTitle, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay";
import * as React from 'react'
import { Input } from "@/components/ui/input";


export default function Board() {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    const changeNum = (num:number) => {
        switch (num){
            case 1:
                return "Uno";
            case 2:
                return "Dos";
            case 3:
                return "Tres";
            case 4:
                return "Cuatro";
            case 5:
                return "Cinco";
        }
    }

    return (
        <div className="w-screen flex justify-center items-center" style={{height: '80vh'}}>
            <div className="border rounded w-4/5 h-4/5 shadow-2xl flex flex-col items-center">
                <div className="flex justify-between items-center min-h-14" style={{width: '95%'}}>
                    <div>
                        <p className="text-3xl">BOARD</p>
                    </div>

                    <div>
                        <Input type="text" placeholder="Search..." />
                    </div>
                </div>
                <Separator />
                <div className="w-full ">
                    <Carousel
                        plugins={[plugin.current]}
                        className="w-40"
                        onMouseEnter={plugin.current.stop}
                        onMouseLeave={plugin.current.reset}
                    >
                        <CarouselContent>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <CarouselItem key={index}>
                                    <div className="p-1">
                                        <Card>
                                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                                <span className="text-4xl font-semibold">{changeNum(index + 1)}</span>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
        </div>
    )
}