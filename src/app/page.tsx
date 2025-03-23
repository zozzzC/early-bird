import HomepageCarousel from "@/components/home/HomepageCarousel";
import { Carousel } from "@mantine/carousel";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import Image from "next/image";
import FullPageHeader from "@/components/layout/FullPageHeader";
import Maps from "@/components/home/Maps";
import OpeningTimesNotice from "@/components/home/OpeningTimesNotice";

export default function Home() {
  return (
    <div className="-z-10 w-full top-0 h-full">
      <HomepageCarousel />
      <div className="flex h-[36rem]">
        <div className="flex flex-col justify-center text-black-main w-3/5">
          <p className="text-center text-2xl">our story</p>
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
        <div className="w-full">
          {/* write the code for the photo in here */}
          {/* import the photo using Image component in Next.js */}
        </div>
      </div>
      <div className="flex w-full">
        <div className="w-full flex items-center flex-col text-black-main">
          <p className="text-2xl pb-5">opening times</p>
          <div className="text-black-main w-1/2 text-center grid grid-cols-2 ">
            <p>mon-fri</p>
            <p>6:30 - 3:00</p>
            <p>sat</p>
            <p>7:00 - 1:00</p>
            <p>sun</p>
            <p>closed</p>
          </div>
          <OpeningTimesNotice />
        </div>
        <div className="w-full flex-3/5">
          <Maps />
        </div>
      </div>
    </div>
  );
}
