import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


// shared prisma
type ProductMapValue = {
  id: string;
  title: string;
  product: string;
  desc: string;
  img: string;
  category: string;
  price: number;
  availableQty: number;
  createdAt: Date;
  updatedAt: Date;
  size: string[];
  color: string[];
};

export async function GET() {
  try {
    const products = await prisma.product.findMany(); // Fetch all Data

    const data: Record<string, ProductMapValue> = {} as Record<string, ProductMapValue>;

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
          data[item.title] = {
            id: item.id,
            title: item.title,
            product: item.product,
            desc: item.desc,
            img: item.img,
            category: item.category,
            price: item.price,
            availableQty: item.availableQty,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            // will override below
            size: [],
            color: [],
          };
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
