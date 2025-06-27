import { getWixClient } from "@/lib/wix-client.base";
import Link from "next/link";
import logo from "@/assets/logo (2).png";
import Image from "next/image";
import { getCart } from "@/wix-api/cart";
import { getWixSeverClient } from "@/lib/wix-client.server";

export default async function NavBar() {
  const wixClient = await getWixSeverClient();
  const cart = await getCart(wixClient);
  const totalQuantity =
    cart?.lineItems?.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0;
  return (
    <header className="bg-background shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 p-5">
        <Link href="/" className="flex items-center gap-4">
          <Image src={logo} alt="Nextstixch logo" width={40} height={40} />
          <span className="text-xl font-bold">Nextstixch</span>
        </Link>
        {totalQuantity} item in you cart
      </div>
    </header>
  );
}
