import Image from "next/image";
import logo from "@/test/early-bird-logo-removebg.png";
import Link from "next/link";

export default function FullPageHeader() {
  return (
    <div className="w-full h-20 flex justify-between items-center">
      <Image src={logo} alt="logo" className="m-5" />
      <div className="flex gap-5 m-5">
        <Link href="/">home</Link>
        <Link href="/about">about</Link>
        <Link href="/order">order</Link>
        <Link href="/contact">contact</Link>
      </div>
    </div>
  );
}
