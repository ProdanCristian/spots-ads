import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema/auth";
import { eq } from "drizzle-orm";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        redirect("/login");
    }

    const result = await db
        .select({ userType: users.userType })
        .from(users)
        .where(eq(users.id, session.user.id))
        .limit(1);

    const userType = result[0]?.userType;

    if (userType === "creator") {
        redirect("/dashboard/creator");
    } else if (userType === "advertiser") {
        redirect("/dashboard/advertiser");
    }

    return <div></div>;
}
