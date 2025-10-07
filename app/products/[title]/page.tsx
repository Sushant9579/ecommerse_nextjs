import { PrismaClient } from '@prisma/client';
import ProductClient from '@/component/ProductCLient';

export default async function ProductPage({params}: {params:Promise <{ title: string }>}) {
  const param = await params;
  const titleName = decodeURIComponent(param.title);

  const prisma = new PrismaClient();

  // Fetch all products with this title
  const values = await prisma.product.findMany({
    where: { title: titleName },
  });

  if (!values || values.length === 0) return (
    <div className='flex justify-center mt-6 text-2xl'>Sorry!!!, No such product found.</div>
  );

  // Grouping: color -> size -> product
  const data: Record<string,any> = {};

  for (const item of values) {
    if (!data[item.size]) {
      data[item.size] = {};
    }
    data[item.size][item.color] = item;
  }
  //console.log(data)
  return <ProductClient ListProduct={data} />;
}
