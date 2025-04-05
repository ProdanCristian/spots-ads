"use client";

import { useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export function SessionDisplay({ minimal = false }: { minimal?: boolean }) {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        );
    }

    if (status === "unauthenticated" || !session) {
        return (
            <Card className="border-dashed">
                <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">Not signed in</p>
                </CardContent>
            </Card>
        );
    }

    if (minimal) {
        return (
            <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={session.user.image || undefined} alt={session.user.name || "User"} />
                    <AvatarFallback>{session.user.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="text-sm font-medium">{session.user.name}</span>
                    {session.user.userType && (
                        <Badge variant="outline" className="text-xs">
                            {session.user.userType}
                        </Badge>
                    )}
                </div>
            </div>
        );
    }

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">Session Info</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-start space-x-4">
                    <Avatar className="h-14 w-14">
                        <AvatarImage src={session.user.image || undefined} alt={session.user.name || "User"} />
                        <AvatarFallback>{session.user.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>

                    <div className="space-y-1 flex-1">
                        {session.user.name && (
                            <div className="flex justify-between items-center">
                                <p className="font-medium text-lg">{session.user.name}</p>
                                {session.user.userType && (
                                    <Badge variant={session.user.userType === "creator" ? "default" : "secondary"}>
                                        {session.user.userType}
                                    </Badge>
                                )}
                            </div>
                        )}

                        {session.user.email && (
                            <p className="text-sm text-muted-foreground">{session.user.email}</p>
                        )}

                        <div className="pt-2 space-y-1">
                            <div className="text-xs text-muted-foreground"><span className="font-medium">ID:</span> {session.user.id}</div>
                            {!session.user.userType && (
                                <div className="text-xs text-amber-500 font-medium">User type not set</div>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 