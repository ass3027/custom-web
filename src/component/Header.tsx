"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Moon, Sun } from "lucide-react"
import { useTheme } from 'next-themes'
import { useState } from "react";


export default function Header() {
    const { setTheme } = useTheme()
    const [theme, nowTheme] = useState('light');

    const changeTheme = () => {
        if(theme==='light'){
            setTheme('dark');
            nowTheme('dark');
        }else{
            setTheme('light');
            nowTheme('light');
        }
    }

    return (
        <div className="p-10 flex justify-between border-b border-slate-100">
            <Sheet>
                <SheetTrigger><Button>Open</Button></SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Who is the best soccer player in the world?</SheetTitle>
                        <SheetDescription>
                            I think the best soccer player is Messi.
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
            <nav className="flex justify-center gap-x-4 text-indigo-500 font-bold">
                <Link href="/">
                    <Button>HOME</Button>
                </Link>
                <Link href="/main">
                    <Button>MAIN</Button>
                </Link>
                <Link href="/main/board">
                    <Button>BOARD</Button>
                </Link>
                <Link href="/main/detail">
                    <Button>DETAIL</Button>
                </Link>
            </nav>
            <Button onClick={changeTheme} variant="outline" size="icon">
                {theme === 'dark' ? <Moon /> : <Sun />}
            </Button>
        </div>
    )
}