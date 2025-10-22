import { prisma } from '@/lib/prisma';
import ProductClient from '@/component/ProductCLient';

export default async function ProductPage({params}: {params:Promise <{ title: string }>}) {
  const param = await params;
  const titleName = decodeURIComponent(param.title);

  // use shared prisma

  // Fetch all products with this title
  const values = await prisma.product.findMany({
    where: { title: titleName },
  });

  if (!values || values.length === 0) return (
    <div className='flex justify-center mt-6 text-2xl'>Sorry!!!, No such product found.</div>
  );

  // Grouping: color -> size -> product
  type ProductByColor = Record<string, {
    id: string;
    title: string;
    product: string;
    size: string;
    color: string;
    price: number;
    desc: string;
    img: string;
    category: string;
    availableQty: number;
  }>;

  const data: Record<string, ProductByColor> = {} as Record<string, ProductByColor>;

  for (const item of values) {
    if (!data[item.size]) {
      data[item.size] = {};
    }
    data[item.size][item.color] = {
      id: item.id,
      title: item.title,
      product: item.product,
      size: item.size,
      color: item.color,
      price: item.price,
      desc: item.desc,
      img: item.img,
      category: item.category,
      availableQty: item.availableQty,
    };
  }
  //console.log(data)
  return <ProductClient ListProduct={data} />;
}
