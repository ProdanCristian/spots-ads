'use client'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { signIn } from "next-auth/react"
import { Logo } from "@/components/layout/logo"
import { useEffect, useState, Suspense } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"


function LoginContent() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/login'
    const [isRedirecting, setIsRedirecting] = useState(false)

    useEffect(() => {
        async function checkUserType() {
            if (status === 'authenticated' && session?.user?.id && !isRedirecting) {
                setIsRedirecting(true)

                try {
                    const response = await fetch(`/api/user/check-type?userId=${session.user.id}`)
                    const data = await response.json()

                    if (data.userType) {
                        if (callbackUrl !== '/login') {
                            if (callbackUrl === '/dashboard') {
                                router.push(`/dashboard/${data.userType}`)
                            } else {
                                router.push(callbackUrl)
                            }
                        } else {
                            router.push(`/dashboard/${data.userType}`)
                        }
                    } else {
                        router.push('/login/user-type')
                    }
                } catch (error) {
                    console.error('Error checking user type:', error)
                    setIsRedirecting(false)
                }
            }
        }

        checkUserType()
    }, [status, session, router, isRedirecting, callbackUrl])

    return (
        <div className="min-h-svh flex flex-col items-center justify-center">
            {/* Background design */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,rgba(var(--primary-rgb),0.1),rgba(var(--background-rgb),0))]" />

            <div className="w-full max-w-sm px-4 py-12">
                <div className="flex flex-col gap-8">
                    <div className="flex justify-center">
                        <Logo className="w-32 h-32" />
                    </div>

                    <Card className="border border-border/40 shadow-xl">
                        <CardHeader className="space-y-1 text-center">
                            <CardTitle className="text-2xl font-bold">Welcome to SpotsAds</CardTitle>
                            <CardDescription className="text-base">
                                Connect creators with advertisers
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-8">
                            <div className="space-y-6">
                                <Button
                                    variant="outline"
                                    className="w-full h-12 relative"
                                    onClick={() => signIn('google', { callbackUrl })}
                                    disabled={status === 'loading' || isRedirecting}
                                >
                                    {(status === 'loading' || isRedirecting) ? (
                                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            className="mr-2 h-5 w-5"
                                        >
                                            <path
                                                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    )}
                                    {(status === 'loading' || isRedirecting) ? 'Processing...' : 'Sign in with Google'}
                                </Button>
                                <div className="text-center text-sm text-muted-foreground">
                                    Don&apos;t have an account? No worries!
                                    <br />
                                    A new account will be created automatically.
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="text-muted-foreground text-center text-xs text-balance *:underline *:underline-offset-4 *:transition-colors *:hover:text-primary">
                        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                        and <a href="#">Privacy Policy</a>.
                    </div>
                </div>
            </div>
        </div>
    )
}

// Create a loading fallback for Suspense
function LoginLoading() {
    return (
        <div className="min-h-svh flex flex-col items-center justify-center">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,rgba(var(--primary-rgb),0.1),rgba(var(--background-rgb),0))]" />
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
    );
}


export default function LoginPage() {
    return (
        <Suspense fallback={<LoginLoading />}>
            <LoginContent />
        </Suspense>
    );
}
