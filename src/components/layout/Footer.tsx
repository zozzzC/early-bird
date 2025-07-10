import logo from "@/test/early-bird-logo-removebg.png";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full py-5 text-sm sm:text-base flex bg-orange-main justify-between">
      <div className="flex gap-2 sm:gap-12">
        <div className="h-full max-w-20 sm:max-w-36 flex justify-center">
          <Image src={logo} alt="logo" className="object-cover" />
        </div>
        <div className="flex flex-col">
          <Link href="/">home</Link>
          <Link href="/about">about</Link>
          <Link href="/order">order</Link>
          <Link href="/contact">contact</Link>
        </div>
      </div>
      <div className="flex flex-col pr-5">
        <p>all rights reserved</p>
        <div>
          <p>terms and conditions</p>
          <p>privacy policy</p>
        </div>
      </div>
    </div>
  );
}
