'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon, BadgePercentIcon, LogOutIcon, PlusCircleIcon, UsersIcon } from 'lucide-react'
import { signOut } from '@/components/theme/auth-utils'
import { SwitchAccountType } from '@/components/account/SwitchAccountType'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { Skeleton } from '@/components/ui/skeleton'

export default function AdvertiserDashboard() {
    const { data: session, status } = useSession()
    const [loading, setLoading] = useState(true)
    const isLoading = status === 'loading' || loading

    const userName = session?.user?.name || 'Advertiser'
    const userInitials = userName
        ?.split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase()
        ?.substring(0, 2)


    useEffect(() => {
        const checkForForcedLoading = () => {
            if (typeof window === 'undefined') return false
            return sessionStorage.getItem('forceLoadingState') === 'true'
        }

        const forcedLoading = checkForForcedLoading()
        setLoading(status === 'loading' || forcedLoading)

        if (status !== 'loading') {
            const switchTimestamp = sessionStorage.getItem('accountSwitchTimestamp')
            const loadingDelay = switchTimestamp ? 2000 : 1000
            const timer = setTimeout(() => {
                setLoading(false)

                if (typeof window !== 'undefined') {
                    sessionStorage.removeItem('forceLoadingState')
                    sessionStorage.removeItem('accountSwitchTimestamp')
                }
            }, loadingDelay)

            return () => clearTimeout(timer)
        }
    }, [status])

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/50">
            <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
                {/* Header with Account Switcher */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 sm:mb-6 gap-4 sm:gap-0">
                    <div className="flex items-center gap-3">
                        {isLoading ? (
                            <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 rounded-full" />
                        ) : (
                            <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-blue-500/20">
                                <AvatarImage src={session?.user?.image || ''} alt={userName} />
                                <AvatarFallback className="bg-blue-500/10 text-blue-500">{userInitials}</AvatarFallback>
                            </Avatar>
                        )}
                        <div>
                            {isLoading ? (
                                <>
                                    <Skeleton className="h-6 sm:h-8 w-48 sm:w-56 mb-2" />
                                    <Skeleton className="h-4 w-36 sm:w-40" />
                                </>
                            ) : (
                                <>
                                    <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">Advertiser Dashboard</h1>
                                    <p className="text-sm sm:text-base text-muted-foreground mt-1">Welcome back, {userName}</p>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <Button
                            variant="outline"
                            onClick={() => signOut('/')}
                            className="gap-2 text-sm sm:text-base"
                            size="sm"
                            disabled={isLoading}
                        >
                            <LogOutIcon size={16} />
                        </Button>
                    </div>
                </div>

                {/* Account Type Switcher */}
                <div className="mb-6 sm:mb-8">
                    {isLoading ? (
                        <Skeleton className="h-16 sm:h-20 w-full rounded-lg" />
                    ) : (
                        <SwitchAccountType currentType="advertiser" />
                    )}
                </div>

                {/* Welcome Card */}
                <Card className="mb-6 sm:mb-8 border-none shadow-lg bg-gradient-to-r from-blue-500/10 to-background">
                    <CardHeader className="pb-2 sm:pb-4">
                        {isLoading ? (
                            <>
                                <Skeleton className="h-6 sm:h-7 w-3/4 mb-2" />
                                <Skeleton className="h-4 sm:h-5 w-full" />
                            </>
                        ) : (
                            <>
                                <CardTitle className="text-xl sm:text-2xl">Launch your next campaign</CardTitle>
                                <CardDescription className="text-sm sm:text-base">
                                    Your advertiser platform is ready for you to start managing your brand campaigns.
                                </CardDescription>
                            </>
                        )}
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="flex flex-wrap gap-2">
                                <Skeleton className="h-9 sm:h-10 w-40 sm:w-44" />
                                <Skeleton className="h-9 sm:h-10 w-28 sm:w-32" />
                            </div>
                        ) : (
                            <div className="flex flex-wrap items-center gap-2">
                                <Button variant="default" className="gap-2 text-sm sm:text-base h-9 sm:h-10">
                                    Create a new campaign <PlusCircleIcon size={16} />
                                </Button>
                                <Button variant="outline" className="text-sm sm:text-base h-9 sm:h-10">Find creators</Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
                    {isLoading ? (
                        Array(3).fill(0).map((_, index) => (
                            <Card key={index} className="hover:shadow-md transition-all">
                                <CardHeader className="pb-2">
                                    <Skeleton className="h-10 sm:h-12 w-10 sm:w-12 rounded-full mb-2" />
                                    <Skeleton className="h-5 sm:h-6 w-3/4 mb-1" />
                                </CardHeader>
                                <CardContent>
                                    <Skeleton className="h-4 w-full mb-1.5" />
                                    <Skeleton className="h-4 w-5/6 mb-1.5" />
                                    <Skeleton className="h-4 w-4/6 mb-4" />
                                    <Skeleton className="h-9 sm:h-10 w-28 sm:w-32" />
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <>
                            <Card className="hover:shadow-md transition-all">
                                <CardHeader className="pb-2">
                                    <div className="rounded-full bg-blue-500/10 p-2 sm:p-3 w-fit mb-2">
                                        <PlusCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                                    </div>
                                    <CardTitle className="text-lg sm:text-xl">New Campaign</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm sm:text-base text-muted-foreground">Create a new advertising campaign and set your targeting preferences.</p>
                                    <div className="mt-3 sm:mt-4">
                                        <Button variant="ghost" className="gap-2 text-sm sm:text-base h-9 sm:h-10">
                                            Start campaign <ArrowRightIcon size={16} />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="hover:shadow-md transition-all">
                                <CardHeader className="pb-2">
                                    <div className="rounded-full bg-blue-500/10 p-2 sm:p-3 w-fit mb-2">
                                        <UsersIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                                    </div>
                                    <CardTitle className="text-lg sm:text-xl">Creator Network</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm sm:text-base text-muted-foreground">Find and connect with creators that align with your brand values and audience.</p>
                                    <div className="mt-3 sm:mt-4">
                                        <Button variant="ghost" className="gap-2 text-sm sm:text-base h-9 sm:h-10">
                                            Browse creators <ArrowRightIcon size={16} />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="hover:shadow-md transition-all">
                                <CardHeader className="pb-2">
                                    <div className="rounded-full bg-blue-500/10 p-2 sm:p-3 w-fit mb-2">
                                        <BadgePercentIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                                    </div>
                                    <CardTitle className="text-lg sm:text-xl">Analytics</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm sm:text-base text-muted-foreground">Track campaign performance metrics and measure your return on investment.</p>
                                    <div className="mt-3 sm:mt-4">
                                        <Button variant="ghost" className="gap-2 text-sm sm:text-base h-9 sm:h-10">
                                            View analytics <ArrowRightIcon size={16} />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}