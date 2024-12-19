import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const slides = await prisma.slide.findMany({
      where: {
        isActive: true
      },
      orderBy: { 
        order: 'asc' 
      },
    });
    return NextResponse.json(slides);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch slides' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const slide = await prisma.slide.create({
      data: json,
    });
    return NextResponse.json(slide);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create slide' }, { status: 500 });
  }
}