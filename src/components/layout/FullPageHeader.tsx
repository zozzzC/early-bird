import Image from "next/image";
import logo from "@/test/logoipsum-361.svg";
import Link from "next/link";

export default function FullPageHeader() {
  return (
    <div className="z-10 w-full h-20 flex justify-between items-center">
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
