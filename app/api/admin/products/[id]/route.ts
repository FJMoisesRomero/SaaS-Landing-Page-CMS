import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    
    if (!body.title || !body.description || !body.icon) {
      return NextResponse.json(
        { error: 'Title, description, and icon are required' },
        { status: 400 }
      );
    }

    // First delete existing features
    await prisma.feature.deleteMany({
      where: {
        productId: id,
      },
    });

    // Then update the product with new features
    const product = await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        icon: body.icon,
        image: body.image,
        title: body.title,
        description: body.description,
        buttonText: body.buttonText,
        buttonUrl: body.buttonUrl,
        order: body.order,
        isActive: body.isActive,
        features: {
          create: body.features.map((feature: string, index: number) => ({
            text: feature,
            order: index,
          })),
        },
      },
      include: {
        features: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product. Please try again.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    // Delete associated features first
    await prisma.feature.deleteMany({
      where: {
        productId: id,
      },
    });

    // Then delete the product
    const product = await prisma.product.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product. Please try again.' },
      { status: 500 }
    );
  }
}
