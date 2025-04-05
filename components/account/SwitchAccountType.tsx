'use client';

import { useState } from 'react';
import { LoaderIcon, RefreshCwIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface SwitchAccountTypeProps {
    currentType: 'creator' | 'advertiser';
}

export function SwitchAccountType({ currentType }: SwitchAccountTypeProps) {
    const { update } = useSession();
    const [isLoading, setIsLoading] = useState(false);

    const newType = currentType === 'creator' ? 'advertiser' : 'creator';

    const handleSwitch = async () => {
        try {
            setIsLoading(true);

            // Update user type in database
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

            // Update the session with the new user type
            await update({
                userType: newType
            });

            // Redirect to the new dashboard
            window.location.href = `/dashboard/${newType}`;
        } catch (error) {
            console.error('Error switching account type:', error);
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center space-x-4 p-4 border rounded-lg bg-muted/30">
            <div className="flex-1">
                <h3 className="font-medium flex items-center gap-2">
                    <RefreshCwIcon className="h-4 w-4" />
                    Switch Account Type
                </h3>
                <p className="text-sm text-muted-foreground">
                    Currently using as: <span className="font-medium">{currentType}</span>
                </p>
            </div>
            <button
                onClick={handleSwitch}
                disabled={isLoading}
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2"
            >
                Switch to {newType}
                {isLoading && <LoaderIcon className="h-4 w-4 animate-spin" />}
            </button>
        </div>
    );
} 