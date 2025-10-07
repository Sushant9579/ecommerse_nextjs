'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SimpleDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="px-2 py-1 rounded border text-sm"
      >
        Select Items
      </button>

      {open && (
        <div className="absolute mt-2 w-26 bg-white border rounded shadow-md">
          <ul>
            <li className="px-4 py-2 text-sm cursor-pointer"><Link href={`${process.env.NEXT_PUBLIC_API_URL}/tshirt`}>T-Shirts</Link>         </li>
            <li className="px-4 py-2 text-sm cursor-pointer"><Link href={`${process.env.NEXT_PUBLIC_API_URL}/hoodies`}>Hoodies</Link>         </li>
            <li className="px-4 py-2 text-sm cursor-pointer"><Link href={`${process.env.NEXT_PUBLIC_API_URL}/mugs`}>Mugs</Link>               </li>
            <li className="px-4 py-2 text-sm cursor-pointer"><Link href={`${process.env.NEXT_PUBLIC_API_URL}/wallpapers`}>Wallpapers</Link>        </li>
          </ul>
        </div>
      )}
    </div>
  );
}
