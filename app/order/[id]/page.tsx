import { prisma } from "@/lib/prisma";
import OrderClient from "@/component/OrderClient";

// shared prisma

export default async function Order({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ clearcart?: string }>;
}) {
  // Await the promises
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  const OrderId = decodeURIComponent(resolvedParams.id);

  // Fetch the order including products
  const order = await prisma.order.findUnique({
    where: { orderID: OrderId },
    include: {
      products: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    return <div className="p-10 text-center text-red-600">Order Not Found.</div>;
  }

  // Pass order and optional clearcart query param to the client component
  return (
    <OrderClient
      order={order}
      clearCartParam={resolvedSearchParams?.clearcart}
    />
  );
}
