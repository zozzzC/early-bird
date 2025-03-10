"use client";
import { Carousel } from "@mantine/carousel";
import coffeePhoto from "@/test/nathan-dumlao-Y3AqmbmtLQI-unsplash.jpg";
import coffeePlantPhoto from "@/test/nathan-dumlao-zUNs99PGDg0-unsplash.jpg";
import bread from "@/test/mae-mu-m9pzwmxm2rk-unsplash.jpg";
import { Image } from "@mantine/core";
import NextImage from "next/image";

export default function HomepageCarousel() {
  return (
    <div className="w-full flex h-96">
      <Carousel height="100%" className="flex-1">
        <Carousel.Slide>
          <Image
            src={coffeePhoto}
            component={NextImage}
            alt="Coffee"
            fill={true}
          ></Image>
        </Carousel.Slide>
        <Carousel.Slide>
          <Image
            src={bread}
            component={NextImage}
            alt="Bread"
            fill={true}
          ></Image>
        </Carousel.Slide>
        <Carousel.Slide>
          <Image
            src={coffeePlantPhoto}
            component={NextImage}
            alt="Coffee + Plant"
            fill={true}
          ></Image>
        </Carousel.Slide>
      </Carousel>
    </div>
  );
}
