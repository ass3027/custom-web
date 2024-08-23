import Link from 'next/link';
import { Button } from '@/components/ui/button'

export default function Header() {
    return (
        <div className="p-10 border-b border-slate-100">
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
        </div>
    )
}