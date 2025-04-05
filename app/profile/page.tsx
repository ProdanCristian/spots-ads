"use client";

import { SessionDisplay } from "@/components/session/SessionDisplay";
import { SwitchAccountType } from "@/components/account/SwitchAccountType";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default function ProfilePage() {
    const { data: session, status } = useSession();

    // Redirect to login if not authenticated
    if (status === "unauthenticated") {
        redirect("/login");
    }

    return (
        <div className="container max-w-4xl py-10">
            <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

            <div className="grid gap-6">
                <SessionDisplay />

                {session?.user?.userType && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Account Type</CardTitle>
                            <CardDescription>Switch between creator and advertiser account types</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <SwitchAccountType currentType={session.user.userType as 'creator' | 'advertiser'} />
                        </CardContent>
                    </Card>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle>Account Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="flex gap-4">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => signOut({ callbackUrl: "/" })}
                        >
                            Sign Out
                        </Button>

                        <Button
                            variant="default"
                            className="flex-1"
                            onClick={() => window.location.href = `/dashboard/${session?.user?.userType || ''}`}
                        >
                            Go to Dashboard
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 