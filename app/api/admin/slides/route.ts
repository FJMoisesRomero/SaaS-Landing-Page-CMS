import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Add dynamic configuration
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const slides = await prisma.slide.findMany({
      orderBy: {
        order: 'asc'
      }
    });
    return NextResponse.json(slides);
  } catch (error) {
    console.error('Error fetching slides:', error);
    return NextResponse.json({ error: "Failed to fetch slides" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const slide = await prisma.slide.create({
      data: {
        image: body.image,
        title: body.title,
        description: body.description,
        buttonText: body.buttonText || null,
        buttonUrl: body.buttonUrl || null,
        order: body.order || 0,
        isActive: body.isActive
      }
    });
    return NextResponse.json(slide);
  } catch (error) {
    console.error('Error creating slide:', error);
    return NextResponse.json({ error: "Failed to create slide" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.id) {
      return NextResponse.json({ error: "Slide ID is required" }, { status: 400 });
    }

    const slide = await prisma.slide.update({
      where: { id: body.id },
      data: {
        image: body.image,
        title: body.title,
        description: body.description,
        buttonText: body.buttonText || null,
        buttonUrl: body.buttonUrl || null,
        order: body.order || 0,
        isActive: body.isActive
      }
    });

    return NextResponse.json(slide);
  } catch (error) {
    console.error('Error updating slide:', error);
    return NextResponse.json({ error: "Failed to update slide" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await prisma.slide.delete({
      where: { id: parseInt(id) }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting slide:', error);
    return NextResponse.json({ error: "Failed to delete slide" }, { status: 500 });
  }
}
