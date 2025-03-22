import logo from "@/test/logoipsum-361.svg";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="w-full flex justify-between p-5 ">
      <div className="flex gap-12">
        <div className="h-full w-36 flex justify-center">
          <Image src={logo} alt="logo" className="flex-1" />
        </div>
        <div className="flex flex-col ">
          <p>home</p>
          <p>about</p>
          <p>order</p>
          <p>contact</p>
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
