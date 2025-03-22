import Image from "next/image";
import logo from "@/test/logoipsum-361.svg";
import Link from "next/link";

export default function FullPageHeader() {
  return (
    <div className="w-full h-20 flex justify-between items-center">
      <Image src={logo} alt="logo" className="m-5" />
      <div className="flex gap-5 m-5 items-center">
        <Link className="p-0 m-0" href="/">
          home
        </Link>
        <Link className="p-0 m-0" href="/about">
          about
        </Link>
        <Link className="p-0 m-0" href="/menu">
          menu
        </Link>
        <Link className="p-0 m-0 h-full" href="/contact">
          contact
        </Link>
        <Link href="/order">order</Link>
      </div>
    </div>
  );
}
