import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const serverNowTime = Date.now();

  // ضبط الموعد: السبت 29/08/2026 الساعة 12:00 ظهراً
  const targetDate = new Date("2026-08-29T12:00:00+03:00"); 
  const serverTargetTime = targetDate.getTime();

  return NextResponse.json({
    serverNowTime,
    serverTargetTime,
  });
}