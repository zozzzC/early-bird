import Image from "next/image";
import logo from "@/test/early-bird-logo-removebg.png";
import Link from "next/link";
import CheckoutAddOn from "../checkout/CheckoutAddOn";
import ViewCartButton from "../checkout/ViewCartButton";

export default function FullPageHeader() {
  return (
    <div className="w-full h-30 flex justify-between">
      <div className="h-full w-36 min-w-20 flex items-center justify-center">
        <Link href="/" >
          <Image src={logo} alt="logo" className="object-cover" />
        </Link>
      </div>
      <div className="flex items-center gap-5 m-10">
        <Link href="/order">order</Link>
        <Link href="/contact">contact</Link>
        <ViewCartButton/>
      </div>
    </div>
  );
}
