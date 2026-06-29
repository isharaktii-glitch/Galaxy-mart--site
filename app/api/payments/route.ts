import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { orderId, receiptUrl } = await req.json();

    const payment = await db.payment.upsert({
      where: { orderId },
      update: { status: 'PAID', receiptUrl, paidAt: new Date() },
      create: { orderId, amount: 0, status: 'PAID', receiptUrl, paidAt: new Date() },
    });
    return NextResponse.json(payment);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if ((session?.user as any)?.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const payments = await db.payment.findMany({
      include: {
        order: {
          include: {
            customer: { select: { username: true, email: true } },
            seller: { select: { username: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(payments);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
