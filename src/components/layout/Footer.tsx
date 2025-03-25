import logo from "@/test/early-bird-logo-removebg.png";
import Image from "next/image";
import Link from "next/link";


export default function Footer() {
  return (
    <div className="bg-orange-main w-full flex justify-between p-5 ">
      <div className="flex gap-12">
        <div className="h-full w-36 flex justify-center">
          <Image src={logo} alt="logo" className="flex-1" />
        </div>
        <div className="flex flex-col ">
          <Link href="/">home</Link>
          <Link href="/about">about</Link>
          <Link href="/order">order</Link>
          <Link href="/contact">contact</Link>
        </div>
        <div className="flex flex-col">
          <p>lorem</p>
          <p>ipsum</p>
          <p>dolor</p>
          <p>sit</p>
        </div>
      </div>
      <div className="flex flex-col">
        <p>all rights reserved</p>
        <div>
          <p>terms and conditions</p>
          <p>privacy policy</p>
        </div>
      </div>
    </div>
  );
}
