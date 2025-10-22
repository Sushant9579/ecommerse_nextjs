import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
//import PaytmChecksum from "paytmchecksum";

export async function POST(req: NextRequest) {

  try {
    const body = await req.json(); // <-- parse JSON correctly
    const { orderId, STATUS,TXNID } = body;

    if (!orderId || !STATUS) {
      return NextResponse.json({ error: "Missing orderId or STATUS" }, { status: 400 });
    }
    // let PaytmChecksum ="";
    // let paytmParams ={}

    // const received_data = body;
    // for(var key in received_data){
    //   if(key == "CHECKSUMHASH"){
    //     PaytmChecksum = received_data[key];
    //   }else{
    //     paytmParams[key]=received_data[key];
    //   }
    // }

    // var isValidChecksum = PaytmChecksum.verifySignature(paytmParams,process.env.PAYTM_KEY,paytmChecksum);
    // if(!isValidChecksum){
    //   console.log("checkSUm Mathched");
    //   return NextResponse.json({ error: "Payment Gateway Error... " }, { status: 400 });
    // }


    if (STATUS === "TXN_SUCCESS") {
      await prisma.order.update({
        where: { orderID: orderId },
        data: {
          status: "Paid",
          paymentInfo: JSON.stringify(body),
          transactionID: TXNID
        },
      });
  
      // Fetch the products in that order
  const order = await prisma.order.findFirst({
    where: { orderID: orderId },
    select: {
      products: {
        select: {
          quantity: true,   // the ordered quantity
          product: {        // actual product details
            select: { id: true },
          },
        },
      },
    },
  });
  // Decrement stock for each product in the order
    for (const item of order?.products || []) {
      await prisma.product.update({
        where: { id: item.product.id },
        data: {
          availableQty: { decrement: item.quantity },
        },
      });
    }
  } else if (STATUS === "PENDING") {
      await prisma.order.update({
        where: { orderID: orderId },
        data: {
          status: "Pending",
          paymentInfo: JSON.stringify(body),
        },
      });
    }

    // Redirect user to order confirmation page
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_API_URL}/order/${orderId}?clearcart=true`);
  } catch (err: unknown) {
    console.error("Paytm postTransaction error:", err);
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
