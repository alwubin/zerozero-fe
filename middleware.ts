import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const publicPaths = ['/', '/login', '/signup'];
    const protectedPaths = ['/main', '/mypage', '/report', '/detail'];

    const isPublicPath = publicPaths.some(path => pathname.startsWith(path));
    const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

    const token = request.cookies.get('accessToken');
    const auth = !!token;

    if (!auth && isProtectedPath) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (auth && isPublicPath && pathname !== '/') {
        return NextResponse.redirect(new URL('/main', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};