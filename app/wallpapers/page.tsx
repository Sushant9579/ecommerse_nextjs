import { FaIndianRupeeSign } from "react-icons/fa6";
import { PrismaClient } from '@prisma/client';
import Link from "next/link";

export default async function Wallpapers(){
    const prisma = new PrismaClient();

    const products = await prisma.product.findMany({
      where:{
        category:'wallpapers'
      }
    });

    if (!products || products.length === 0) return (
    <div className='flex justify-center mt-6 text-2xl'>Sorry!!!, All the Wallpapers are Out of Stock.</div>
  );

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

    return(
            <div className="grid grid-cols-1 gap-6 my-10 mx-8 md:grid-cols-3 lg:grid-cols-4 items-stretch">
            {Object.keys(data).map((item) => (
              <Link key={data[item].id} href={`${process.env.NEXT_PUBLIC_API_URL}/products/${data[item].title}`}>
                <div className="flex flex-col p-3 w-full h-full shadow-xl rounded-2xl bg-white">
                  <span className="block overflow-hidden rounded">
                    <img alt={data[item].title} src={data[item].img} className="object-cover object-top w-3/5 h-48 mx-auto rounded-lg" />
                  </span>

                  <div className="flex flex-col flex-grow mt-4">
                    <h3 className="mb-1 text-xs tracking-widest text-gray-500"> {data[item].title} </h3>
                    <h2 className="text-lg font-medium text-gray-900 flex-grow"> {data[item].desc} </h2>
                    <p className="mt-1 flex items-center"> <FaIndianRupeeSign /> {data[item].price} </p>

                    {/* Sizes */}
                    <ul className="flex justify-center gap-x-2 mt-3 overflow-x-auto">
                      {["1920x1080px", "2560x1440px","3840x2160px"].map((size) => data[item].size.includes(size) && (
                            <li key={size} className="px-2 border rounded-xl"> {size} </li>
                          ))}
                    </ul>

                    {/* Colors */}
                    <ul className="flex justify-center gap-x-2 mt-3 overflow-x-auto">
                      {data[item].color.map((color: string, index: number) => (
                        <li key={index}> <button aria-label={`Color ${color}`} className="w-6 h-6 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500" style={{ backgroundColor: color }} ></button> </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          )
}