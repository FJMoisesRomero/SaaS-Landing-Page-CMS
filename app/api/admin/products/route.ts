import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        features: {
          orderBy: {
            order: 'asc',
          },
        },
      },
      orderBy: {
        order: 'asc',
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products. Please try again.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.title || !body.description || !body.icon) {
      return NextResponse.json(
        { error: 'Title, description, and icon are required' },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
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
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product. Please try again.' },
      { status: 500 }
    );
  }
}
