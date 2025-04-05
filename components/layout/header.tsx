import Link from "next/link"
import { Logo } from "@/components/layout/logo"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"
import { ThemeToggle } from "@/components/theme/theme-toggle"

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center space-x-2">
                        <Logo />
                    </Link>
                    <nav className="hidden md:flex gap-6">
                        <Link href="/creators" className="text-sm font-medium hover:text-primary">
                            For Creators
                        </Link>
                        <Link href="/advertisers" className="text-sm font-medium hover:text-primary">
                            For Advertisers
                        </Link>
                        <Link href="/pricing" className="text-sm font-medium hover:text-primary">
                            Pricing
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/login" className="flex items-center gap-2">
                            <LogIn className="h-4 w-4" />
                            Login
                        </Link>
                    </Button>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
}
