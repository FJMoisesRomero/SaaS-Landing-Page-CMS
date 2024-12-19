import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();

    const slide = await prisma.slide.update({
      where: { id },
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    await prisma.slide.delete({
      where: { id }
    });
    
    return NextResponse.json({ message: "Slide deleted successfully" });
  } catch (error) {
    console.error('Error deleting slide:', error);
    return NextResponse.json({ error: "Failed to delete slide" }, { status: 500 });
  }
}
