import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const user = req.auth?.user as any;

  const adminPaths = ['/admin'];
  const sellerPaths = ['/seller'];
  const customerPaths = ['/customer'];

  if (adminPaths.some((p) => pathname.startsWith(p))) {
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  if (sellerPaths.some((p) => pathname.startsWith(p))) {
    if (!user || (user.role !== 'SELLER' && user.role !== 'ADMIN')) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  if (customerPaths.some((p) => pathname.startsWith(p))) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/admin/:path*', '/seller/:path*', '/customer/:path*'],
};
