import Link from "next/link"
import { Logo } from "@/components/layout/logo"

export function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <Logo height={40} />
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Connect creators with brands for mutually beneficial partnerships.
                        </p>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Platform</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/creators" className="text-muted-foreground hover:text-foreground">
                                    For Creators
                                </Link>
                            </li>
                            <li>
                                <Link href="/advertisers" className="text-muted-foreground hover:text-foreground">
                                    For Advertisers
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="text-muted-foreground hover:text-foreground">
                                    Pricing
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Company</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                                    Careers
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Legal</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                                    Privacy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                                    Terms
                                </Link>
                            </li>
                            <li>
                                <Link href="/cookies" className="text-muted-foreground hover:text-foreground">
                                    Cookies
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t pt-6">
                    <p className="text-center text-xs text-muted-foreground">
                        © {new Date().getFullYear()} SpotsAds. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
} 