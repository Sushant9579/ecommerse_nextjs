import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const products = await prisma.product.findMany(); // Fetch all Data

    const data: Record<string, any> = {};

      for (let i = 0; i < products.length; i++) {
        const item = products[i];

        if (data[item.title]) {
          // Already exists Data then 
          if (item.availableQty > 0) {
            if (!data[item.title].color.includes(item.color)) {
              data[item.title].color.push(item.color);
            }
            if (!data[item.title].size.includes(item.size)) {
              data[item.title].size.push(item.size);
            }
          }
        } else {
          //Else New entry
          data[item.title] = { ...item }; // clone item
          if (item.availableQty > 0) {
            data[item.title].color = [item.color];
            data[item.title].size = [item.size];
          } else {
            data[item.title].color = [];
            data[item.title].size = [];
          }
        }
      }

    return NextResponse.json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
