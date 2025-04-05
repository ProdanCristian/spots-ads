'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Logo } from "@/components/layout/logo"
import { CameraIcon, Loader2, MegaphoneIcon } from "lucide-react"

export default function UserTypePage() {
    const [isLoading, setIsLoading] = useState(false)
    const [selectedType, setSelectedType] = useState<'creator' | 'advertiser' | null>(null)
    const router = useRouter()

    const handleUserTypeSelection = async (userType: 'creator' | 'advertiser') => {
        setSelectedType(userType)
        setIsLoading(true)
        try {
            const response = await fetch('/api/user/create-type', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userType }),
            })

            if (response.ok) {
                router.push(`/dashboard/${userType}`)
            } else {
                console.error('Failed to update user type')
                setIsLoading(false)
                setSelectedType(null)
            }
        } catch (error) {
            console.error('Error updating user type:', error)
            setIsLoading(false)
            setSelectedType(null)
        }
    }

    return (
        <div className="min-h-svh flex flex-col items-center justify-center">
            {/* Background design */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,rgba(var(--primary-rgb),0.1),rgba(var(--background-rgb),0))]" />

            <div className="w-full max-w-md px-4 py-12">
                <div className="flex flex-col gap-8">
                    <div className="flex justify-center">
                        <Logo className="w-32 h-32" />
                    </div>

                    <Card className="border border-border/40 shadow-xl">
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl font-bold">Welcome to SpotsAds</CardTitle>
                            <CardDescription className="text-base">
                                How would you like to use our platform?
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-8">
                            <div className="grid gap-6">
                                <Card
                                    className={`relative overflow-hidden border-2 transition-all cursor-pointer hover:shadow-md ${selectedType === 'creator' ? 'border-primary' : 'border-border/40'}`}
                                    onClick={() => !isLoading && handleUserTypeSelection('creator')}
                                >
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full"></div>
                                    <CardContent className="p-6">
                                        <div className="flex gap-4 items-start">
                                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                <CameraIcon className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                                                    Creator
                                                    {isLoading && selectedType === 'creator' && <Loader2 className="w-4 h-4 animate-spin" />}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">Share your influence and earn by featuring products in your content</p>
                                                <div className="flex gap-2 mt-3">
                                                    <div className="bg-muted text-xs px-2 py-1 rounded-full">Monetize Content</div>
                                                    <div className="bg-muted text-xs px-2 py-1 rounded-full">Grow Audience</div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card
                                    className={`relative overflow-hidden border-2 transition-all cursor-pointer hover:shadow-md ${selectedType === 'advertiser' ? 'border-blue-500' : 'border-border/40'}`}
                                    onClick={() => !isLoading && handleUserTypeSelection('advertiser')}
                                >
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-bl-full"></div>
                                    <CardContent className="p-6">
                                        <div className="flex gap-4 items-start">
                                            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                                                <MegaphoneIcon className="w-6 h-6 text-blue-500" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                                                    Advertiser
                                                    {isLoading && selectedType === 'advertiser' && <Loader2 className="w-4 h-4 animate-spin" />}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">Promote your brand through authentic creator partnerships</p>
                                                <div className="flex gap-2 mt-3">
                                                    <div className="bg-muted text-xs px-2 py-1 rounded-full">Reach Customers</div>
                                                    <div className="bg-muted text-xs px-2 py-1 rounded-full">Boost Sales</div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
