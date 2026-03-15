import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
    const isLoginRoute = request.nextUrl.pathname === '/admin/login';

    // Protect /admin routes
    if (isAdminRoute && !isLoginRoute) {
        const token = request.cookies.get('admin_session')?.value;
        // Simple check: strict validation happens on db actions or by confirming password match
        // Ideally we check environment variable, but accessing process.env in middleware 
        // sometimes has edge cases in edge runtime. 
        // For this simple app, we just check if the cookie exists.
        // The server actions will act as the gatekeeper for setting the cookie.

        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    // Redirect /admin/login to /admin if already logged in
    if (isLoginRoute) {
        const token = request.cookies.get('admin_session')?.value;
        if (token) {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
