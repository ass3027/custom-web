import Link from 'next/link';

export default function Header() {
    return (
        <div className="p-10 border-b border-slate-100">
            <nav className="flex gap-x-4 text-indigo-500 font-bold">
                <Link href="/">
                    HOME
                </Link>
                <Link href="/main">
                    MAIN
                </Link>
                <Link href="/main/board">
                    BOARD
                </Link>
                <Link href="/main/detail">
                    DETAIL
                </Link>
            </nav>
        </div>
    )
}