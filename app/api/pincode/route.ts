import { NextResponse } from 'next/server';
import pincodes from '@/pincodes.json';

export async function GET() {
// let pincodes = {
//   "110001": ["New Delhi", "Delhi"],
//   "400001": ["Mumbai", "Maharashtra"],
//   "600001": ["Chennai", "Tamil Nadu"],
//   "700001": ["Kolkata", "West Bengal"],
//   "500001": ["Hyderabad", "Telangana"],
//   "560001": ["Bangalore", "Karnataka"],
//   "380001": ["Ahmedabad", "Gujarat"],
//   "682001": ["Kochi", "Kerala"],
//   "751001": ["Bhubaneswar", "Odisha"],
//   "110092": ["Delhi", "Delhi"],
//   "442401": ["Chandrapur", "Maharashtra"]
// };


  return NextResponse.json(pincodes,{status:200});
}
