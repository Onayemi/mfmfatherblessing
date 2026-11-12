import { usePage } from "@inertiajs/react";
import { ReactNode } from "react";

interface CanProps {
    roles?: string[]; // e.g. ['superadmin', 'admin'] or ['*']
    children: ReactNode;
}

export default function Can({ roles = [], children }: CanProps) {
    const { auth } = usePage().props as any;
    const userRole = auth?.user?.role;

    // If no user is logged in, hide protected elements
    if (!userRole) {
        return null;
    }

    // If roles is empty or includes '*', show element to all logged-in roles
    if (roles.length === 0 || roles.includes("*")) {
        return <>{children}</>;
    }

    // Check specific role match
    if (!roles.includes(userRole)) {
        return null;
    }

    return <>{children}</>;
}
