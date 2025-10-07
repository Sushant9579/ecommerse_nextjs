import https from "https";
import { NextRequest, NextResponse } from "next/server";
import PaytmChecksum from "paytmchecksum";
import { PrismaClient } from '@prisma/client';
import pincodes from '@/pincodes.json';

interface PaytmParams {
  body: {
    requestType: string;
    mid: string | undefined;
    websiteName: string;
    orderId: string;
    callbackUrl: string;
    txnAmount: {
      value: string;
      currency: string;
    };
    userInfo: {
      custId: string;
    };
  };
  head?: {
    signature: string;
  };
}

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // Parse request body safely
    const { subTotal, email, oid,fullAddress,pincode,cart,name,phone } = await req.json();
    //console.log("Request body:", { subTotal, email, oid, cart });
    if (!oid || !subTotal || !email || !cart) {
      return NextResponse.json({success: false, message: "Missing orderId or Amount or Email or Cart" }, { status: 400 });
    }
    if (!Object.keys(pincodes).includes(pincode)) {
      return NextResponse.json({success: false, message: "The pincode you have Entered is not serviceable" }, { status: 400 });
    }

      // Check if the cart is tampered with
      let sumTotal = 0;

      for (let item in cart) {
        const dbProduct = await prisma.product.findFirst({
          where: { id: cart[item].id },
        });

        if (!dbProduct) {
          return NextResponse.json( { success: false, message: "Invalid product in cart" },{ status: 400 });
        }

        sumTotal += cart[item].price * cart[item].qty;

        if(dbProduct.availableQty < cart[item].qty){
          return NextResponse.json( { success: false, message: "Some items in your cart went out of stock. Please try again!!" }, { status: 400 } );
        }

        // Price mismatch
        if (dbProduct.price !== cart[item].price) {
          return NextResponse.json( { success: false, message: "Product price mismatch" }, { status: 400 } );
        }
      }

      // Subtotal mismatch
      if (sumTotal !== subTotal) {
        return NextResponse.json( { success: false, message: "Subtotal mismatch" }, { status: 400 } );
      }


    //Check if the cart items are out of stock -- [pending]

    //check if the details are valid --[pending]

    const order = await prisma.order.create({
      data: {
        orderID: String(oid),
        email,
        address: fullAddress,
        amount: subTotal,
        status: "Pending",
        products: {
          create: Object.values(cart).map((item: any) => ({
            productId: item.id,
            quantity: Number(item.qty),
            price: item.price,
            size: item.size,
            color: item.color,
          })),
        },
      },
    });

    // console.log("Order created:", order);

  //   return NextResponse.json({ order, message: "Order created (Paytm skipped in dev)" });
  // }catch(err:any){
  //   console.error("Catch error:", err);
  //   return NextResponse.json({ error: err.message, stack: err.stack }, { status: 500 });
  // }
    const paytmParams: PaytmParams = {
      body: {
        requestType: "Payment",
        mid: process.env.PAYTM_MID,
        websiteName: "E-COMMERSE",
        orderId: oid,
        callbackUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/paytm/postTransaction`,
        txnAmount: {
          value: subTotal,
          currency: "INR",
        },
        userInfo: {
          custId: email,
        },
      },
    };

    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      process.env.PAYTM_MERCHANT_KEY as string // store securely in .env
    );

    paytmParams.head = { signature: checksum };

    const post_data = JSON.stringify(paytmParams);

    const options = {
      //hostname: "securestage.paytmpayments.com", // staging
       hostname: "secure.paytmpayments.com",   // production
      port: 443,
      path: `/theia/api/v1/initiateTransaction?mid=${process.env.PAYTM_MID}&orderId=${oid}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": post_data.length,
      },
    };

    return new Promise((resolve, reject) => {
      let response = "";

      const post_req = https.request(options, (post_res) => {
        post_res.on("data", (chunk) => {
          response += chunk;
        });

        post_res.on("end", () => {
          //console.log("Paytm Response:", response);
          resolve(NextResponse.json(JSON.parse(response)));
        });
      });

      post_req.on("error", (err) => {
        reject(NextResponse.json({ error: err.message }, { status: 501 }));
      });

      post_req.write(post_data);
      post_req.end();
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 502 });
  }
}

// import { NextRequest, NextResponse } from "next/server";
// import Razorpay from "razorpay";

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID as string,       // server only
//   key_secret: process.env.RAZORPAY_KEY_SECRET as string, // server only
// });

// export async function POST(req: NextRequest) {
//   try {
//     const { oid, subTotal } = await req.json();

//     if (!subTotal || subTotal <= 0) {
//       return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
//     }

//     const options = {
//       amount: Number(subTotal) * 100, // amount in paise
//       currency: "INR",
//       receipt: String(oid),
//     };

//     const order = await razorpay.orders.create(options);

//     return NextResponse.json(order);
//   } catch (err: any) {
//     console.error("Razorpay order error:", err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }
