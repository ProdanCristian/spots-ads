'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon, BarChart3Icon, CheckCircleIcon, UserIcon } from 'lucide-react'
import { signOut } from '@/components/theme/auth-utils'
import { SwitchAccountType } from '@/components/account/SwitchAccountType'

export default function CreatorDashboard() {
    const { data: session } = useSession()

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/50">
            <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight">Creator Dashboard</h1>
                        <p className="text-muted-foreground mt-1">Manage your sponsorships and content</p>
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
                <Card className="mb-8 border-none shadow-lg bg-gradient-to-r from-primary/10 to-background">
                    <CardHeader>
                        <CardTitle className="text-2xl">Welcome back, {session?.user?.name}!</CardTitle>
                        <CardDescription className="text-base">
                            Your creator platform is ready for you to start managing your sponsored content.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <Button variant="default" className="gap-2">
                                Complete your profile <ArrowRightIcon size={16} />
                            </Button>
                            <Button variant="outline">Browse opportunities</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Account Type Switcher */}
                <div className="mb-8">
                    <SwitchAccountType currentType="creator" />
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <Card className="hover:shadow-md transition-all">
                        <CardHeader className="pb-2">
                            <div className="rounded-full bg-primary/10 p-3 w-fit mb-2">
                                <UserIcon className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle className="text-xl">Profile Setup</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Customize your creator profile to attract the right sponsors for your content.</p>
                            <div className="mt-4">
                                <Button variant="ghost" className="gap-2">
                                    Complete profile <ArrowRightIcon size={16} />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-all">
                        <CardHeader className="pb-2">
                            <div className="rounded-full bg-primary/10 p-3 w-fit mb-2">
                                <CheckCircleIcon className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle className="text-xl">Active Campaigns</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Manage your active sponsorships and track deliverables for each campaign.</p>
                            <div className="mt-4">
                                <Button variant="ghost" className="gap-2">
                                    View campaigns <ArrowRightIcon size={16} />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-all">
                        <CardHeader className="pb-2">
                            <div className="rounded-full bg-primary/10 p-3 w-fit mb-2">
                                <BarChart3Icon className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle className="text-xl">Earnings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Monitor your performance metrics and track your sponsorship earnings.</p>
                            <div className="mt-4">
                                <Button variant="ghost" className="gap-2">
                                    View earnings <ArrowRightIcon size={16} />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}