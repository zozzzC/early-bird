import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import HomepageCarousel from "@/components/home/HomepageCarousel";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import Image from "next/image";
import FullPageHeader from "@/components/layout/FullPageHeader";
import Maps from "@/components/home/Maps";
import logoPhoto from "@/test/early-bird-logo-removebg.png";

export default function Home() {
  return (
    <div className="-z-10 w-full top-0 h-full">
      <HomepageCarousel />
      <div className="flex">
        <div className="flex flex-col w-2/5">
          <p className="text-center">our story</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            ullamcorper efficitur urna, et efficitur quam aliquam sit amet.
            Curabitur sed posuere odio, vitae consectetur nisl. Etiam fermentum
            vehicula sagittis. Sed lobortis tincidunt lectus, quis congue velit
            mattis consectetur. Integer placerat, dolor vitae venenatis porta,
            purus tortor porta purus, vel rhoncus felis leo ac metus. Vestibulum
            eu nulla nibh.
          </p>
        </div>
        <div className="w-full flex items-center justify-center bg-red-50">
          <Image
            src={logoPhoto}
            alt="Earlybird Company Logo"
            className="object-contain"
          />
        </div>
      </div>
      <div className="flex w-full">
        <div className="w-full">
          <p className="text-center">opening times</p>
        </div>
        <div className="w-full flex-3/5">
          <Maps />
        </div>
      </div>
    </div>
  );
}
