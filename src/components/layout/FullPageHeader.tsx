import Image from "next/image";
import logo from "@/test/logoipsum-361.svg";

export default function FullPageHeader() {
  return (
    <div className="w-full bg-neutral-500 h-20 opacity-25 flex justify-between items-center">
      <Image src={logo} alt="logo" className="m-5" />
      <div className="flex gap-5 m-5">
        <p>home</p>
        <p>about</p>
        <p>order</p>
        <p>contact</p>
      </div>
    </div>
  );
}
