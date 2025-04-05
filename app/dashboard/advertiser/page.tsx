'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon, BadgePercentIcon, PlusCircleIcon, UsersIcon } from 'lucide-react'
import { signOut } from '@/components/theme/auth-utils'
import { SwitchAccountType } from '@/components/account/SwitchAccountType'

export default function AdvertiserDashboard() {
    const { data: session } = useSession()

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/50">
            <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight">Advertiser Dashboard</h1>
                        <p className="text-muted-foreground mt-1">Manage your campaigns and creator partnerships</p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => signOut('/')}
                        className="gap-2"
                    >
                        Log out
                    </Button>
                </div>

                {/* Welcome Card */}
                <Card className="mb-8 border-none shadow-lg bg-gradient-to-r from-blue-500/10 to-background">
                    <CardHeader>
                        <CardTitle className="text-2xl">Welcome back, {session?.user?.name || 'Advertiser'}!</CardTitle>
                        <CardDescription className="text-base">
                            Your advertiser platform is ready for you to start managing your brand campaigns.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <Button variant="default" className="gap-2">
                                Create a new campaign <PlusCircleIcon size={16} />
                            </Button>
                            <Button variant="outline">Find creators</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Account Type Switcher */}
                <div className="mb-8">
                    <SwitchAccountType currentType="advertiser" />
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <Card className="hover:shadow-md transition-all">
                        <CardHeader className="pb-2">
                            <div className="rounded-full bg-blue-500/10 p-3 w-fit mb-2">
                                <PlusCircleIcon className="h-6 w-6 text-blue-500" />
                            </div>
                            <CardTitle className="text-xl">New Campaign</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Create a new advertising campaign and set your targeting preferences.</p>
                            <div className="mt-4">
                                <Button variant="ghost" className="gap-2">
                                    Start campaign <ArrowRightIcon size={16} />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-all">
                        <CardHeader className="pb-2">
                            <div className="rounded-full bg-blue-500/10 p-3 w-fit mb-2">
                                <UsersIcon className="h-6 w-6 text-blue-500" />
                            </div>
                            <CardTitle className="text-xl">Creator Network</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Find and connect with creators that align with your brand values and audience.</p>
                            <div className="mt-4">
                                <Button variant="ghost" className="gap-2">
                                    Browse creators <ArrowRightIcon size={16} />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-all">
                        <CardHeader className="pb-2">
                            <div className="rounded-full bg-blue-500/10 p-3 w-fit mb-2">
                                <BadgePercentIcon className="h-6 w-6 text-blue-500" />
                            </div>
                            <CardTitle className="text-xl">Analytics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Track campaign performance metrics and measure your return on investment.</p>
                            <div className="mt-4">
                                <Button variant="ghost" className="gap-2">
                                    View analytics <ArrowRightIcon size={16} />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}