<?php

namespace App\Http\Controllers\Concerns;

use Illuminate\Http\Request;

trait AuthorizesRoles
{
    /**
     * Authorize user roles.
     * Pass an array of allowed roles e.g. ['superadmin', 'admin'].
     * Pass empty array [] or ['*'] to allow ALL authenticated roles.
     */
    protected function authorizeRole(Request $request, array $allowedRoles = []): void
    {
        $user = $request->user();

        if (!$user) {
            abort(401, 'Unauthenticated.');
        }

        // Allow all roles if $allowedRoles is empty or contains '*'
        if (empty($allowedRoles) || in_array('*', $allowedRoles)) {
            return;
        }

        if (!in_array($user->role, $allowedRoles)) {
            abort(403, 'Unauthorized action. You do not have permission to access this resource.');
        }
    }
}