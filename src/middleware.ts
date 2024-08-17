import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('accessToken')?.value;
    const auth = !!token;

    console.log('현재 경로:', pathname, '인증 상태:', auth);

    if (auth && (pathname === '/' || pathname === '/login' || pathname === '/signup')) {
        return NextResponse.redirect(new URL('/landing', request.url));
    }

    if (!auth && (pathname.startsWith('/landing') || pathname.startsWith('/mypage') || pathname.startsWith('/report') || pathname.startsWith('/detail'))) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};