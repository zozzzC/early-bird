import HomepageCarousel from "@/components/layout/HomepageCarousel";
import { Carousel } from "@mantine/carousel";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import Image from "next/image";
import FullPageHeader from "@/components/layout/FullPageHeader";

export default function Home() {
  return (
    <div className="absolute w-full h-full">
      <HomepageCarousel />
    </div>
  );
}
