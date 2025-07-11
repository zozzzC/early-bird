import HomepageCarousel from "@/components/home/HomepageCarousel";
import Maps from "@/components/home/Maps";
import Testimonial from "@/components/home/Testimonial";
import logoPhoto from "@/test/early-bird-logo-removebg.png";
import "@mantine/carousel/styles.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import Image from "next/image";

export default function Home() {
  return (
    <div className="-z-10 w-full top-0 h-full">
      <div className="relative h-dvh">
        <HomepageCarousel />
        <div className="top-0 py-10 h-full px-10 flex flex-col items-center justify-center absolute w-full text-center">
          <p className="text-5xl text-background">
            lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <p className="pt-3 text-xl text-background">
            sed ullamcorper efficitur urna, et efficitur quam aliquam sit amet.
            curabitur sed posuere odio, vitae consectetur nisl. Etiam fermentum
            vehicula sagittis. sed lobortis tincidunt lectus, quis congue velit
            mattis consectetur.
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex py-30 px-40 w-full items-center gap-5">
          <div className="flex  flex-col w-3/5">
            <p className="text-center text-3xl pb-5 ">our story</p>
            <p className="text-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              ullamcorper efficitur urna, et efficitur quam aliquam sit amet.
              Curabitur sed posuere odio, vitae consectetur nisl. Etiam
              fermentum vehicula sagittis. Sed lobortis tincidunt lectus, quis
              congue velit mattis consectetur. Integer placerat, dolor vitae
              venenatis porta, purus tortor porta purus, vel rhoncus felis leo
              ac metus. Vestibulum eu nulla nibh.
            </p>
          </div>
          <div className="w-full flex items-center justify-center h-full">
            <Image
              src={logoPhoto}
              alt="Earlybird Company Logo"
              className="object-contain"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center flex-col px-10">
        <div className="py-5">
          <p className="text-6xl">⭐⭐⭐⭐⭐</p>
        </div>
        <div className="flex flex-row gap-10 justify-center">
          <Testimonial>
            The flat white and the spinach, feta & pesto (scone?) I took away
            were both absolutely delicious. Thanks for making my morning so
            lovely!
          </Testimonial>
          <Testimonial>
            The barista is lovely and all smiles for the morning coffee and,
            also the coffee tastes good. We were visiting for a few days but
            went twice and enjoyed it both times. The cinnamon sprinkle option
            for a cappuccino is great, with that little biscuit button on top.
            Would recommend if you're in Rotorua!
          </Testimonial>
          <Testimonial>
            The bakery selection was equally impressive, with fresh and
            delicious treats that paired perfectly with my drinks. The
            atmosphere is cozy and inviting, making it a perfect spot to relax
            and enjoy a great cup of coffee. The staff were friendly and
            attentive, adding to the overall wonderful experience. Highly
            recommend!
          </Testimonial>
        </div>
      </div>

      <div className="flex w-full">
        <div className="w-full">
          <p className="text-center ">opening times</p>
        </div>
        <Maps />
      </div>
    </div>
  );
}
