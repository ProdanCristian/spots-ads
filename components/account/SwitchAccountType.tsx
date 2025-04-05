'use client';

import { useState } from 'react';
import { LoaderIcon, RefreshCwIcon, ArrowRightIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface SwitchAccountTypeProps {
    currentType: 'creator' | 'advertiser';
}

export function SwitchAccountType({ currentType }: SwitchAccountTypeProps) {
    const { update } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const newType = currentType === 'creator' ? 'advertiser' : 'creator';
    const bgColor = currentType === 'creator' ? 'bg-primary/10' : 'bg-blue-500/10';
    const textColor = currentType === 'creator' ? 'text-primary' : 'text-blue-500';
    const buttonColor = currentType === 'creator' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-blue-500 text-white hover:bg-blue-600';

    const handleSwitch = async () => {
        try {
            setIsLoading(true);

            if (typeof window !== 'undefined') {
                sessionStorage.setItem('forceLoadingState', 'true');
                sessionStorage.setItem('accountSwitchTimestamp', Date.now().toString());
            }

            const response = await fetch('/api/user/update-type', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userType: newType }),
            });

            if (!response.ok) {
                throw new Error('Failed to update account type');
            }

            await update({
                userType: newType
            });

            router.push(`/dashboard/${newType}`);
        } catch (error) {
            console.error('Error switching account type:', error);
            if (typeof window !== 'undefined') {
                sessionStorage.removeItem('forceLoadingState');
                sessionStorage.removeItem('accountSwitchTimestamp');
            }
            setIsLoading(false);
        }
    };

    return (
        <div className={`flex items-center justify-between p-5 rounded-lg ${bgColor} border border-muted/50 shadow-sm transition-all hover:shadow`}>
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${bgColor}`}>
                    <RefreshCwIcon className={`h-5 w-5 ${textColor}`} />
                </div>
                <div>
                    <h3 className="font-medium text-lg">Account Type</h3>
                    <p className="text-sm text-muted-foreground">
                        Currently using as <span className={`font-semibold capitalize ${textColor}`}>{currentType}</span>
                    </p>
                </div>
            </div>
            <button
                onClick={handleSwitch}
                disabled={isLoading}
                className={`px-4 py-2 rounded-md ${buttonColor} disabled:opacity-50 flex items-center gap-2 transition-colors`}
            >
                Switch to {newType}
                {isLoading ? (
                    <LoaderIcon className="h-4 w-4 animate-spin" />
                ) : (
                    <ArrowRightIcon className="h-4 w-4" />
                )}
            </button>
        </div>
    );
}