import Image from "next/image";
import logo from "@/test/early-bird-logo-removebg.png";
import Link from "next/link";

export default function FullPageHeader() {
  return (

    <div className="w-full bg-orange-main h-30 flex justify-between">
        <div className="h-full w-36 flex justify-center">
          <Image src={logo} alt="logo" className="flex-1" />
        </div>
      <div className="flex gap-5 m-10">
        <Link href="/">home</Link>
        <Link href="/about">about</Link>
        <Link href="/order">order</Link>
        <Link href="/contact">contact</Link>
      </div>
    </div>
  );
}
