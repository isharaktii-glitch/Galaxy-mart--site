import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, firstName, lastName, email, phone, whatsapp, address, password, role } = body;

    if (!username || !email || !password || !firstName || !lastName || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const existing = await db.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });
    if (existing) {
      return NextResponse.json({ error: 'Email or username already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await db.user.create({
      data: {
        username, firstName, lastName, email,
        phone, whatsapp, address,
        password: hashedPassword,
        role: role || 'CUSTOMER',
        isActive: true,
        phoneVerified: false,
      },
    });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await db.otpCode.create({
      data: { userId: user.id, code: otp, expiresAt },
    });

    // Send OTP via Twilio (if configured)
    if (process.env.TWILIO_ACCOUNT_SID && phone) {
      try {
        const twilio = require('twilio')(
          process.env.TWILIO_ACCOUNT_SID,
          process.env.TWILIO_AUTH_TOKEN
        );
        await twilio.messages.create({
          body: `Your Galaxy Mart OTP is: ${otp}. Valid for 10 minutes.`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: phone,
        });
      } catch (smsError) {
        console.error('SMS failed:', smsError);
        // Continue without SMS in dev
      }
    }

    console.log(`[DEV] OTP for ${user.id}: ${otp}`);

    return NextResponse.json({ userId: user.id, message: 'OTP sent' });
  } catch (error: any) {
    console.error('Register error:', error);
    return NextResponse.json({ error: error.message || 'Registration failed' }, { status: 500 });
  }
}
