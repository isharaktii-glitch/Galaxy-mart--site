import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const user = await db.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ success: true }); // Don't reveal

    const token = uuidv4();
    await db.passwordReset.create({
      data: {
        userId: user.id, token,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

    if (process.env.EMAIL_SERVER_USER) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.EMAIL_SERVER_USER, pass: process.env.EMAIL_SERVER_PASSWORD },
      });
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Galaxy Mart - Reset Your Password',
        html: `<div style="font-family:Arial;max-width:600px;margin:0 auto;background:#030712;color:white;padding:40px;border-radius:16px;">
          <h1 style="color:#6366f1;">Galaxy Mart</h1>
          <h2>Reset Your Password</h2>
          <p>Click the button below to reset your password:</p>
          <a href="${resetUrl}" style="background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;padding:14px 28px;border-radius:8px;text-decoration:none;display:inline-block;margin:20px 0;">Reset Password</a>
          <p style="color:#6b7280;font-size:12px;">This link expires in 1 hour.</p>
        </div>`,
      });
    }

    console.log(`[DEV] Reset URL: ${resetUrl}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
