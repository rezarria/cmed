import Link from "next/link";
import { Button, Trans } from "../common";
import { MdArrowForwardIos } from "react-icons/md";
import type { Service } from "@/types";
import { twMerge } from "tailwind-merge";
import { Carousel } from "@mantine/carousel";
import { useTranslation } from "react-i18next";
import { useMemo, type FC } from "react";

const Card = ({ service }: { service: Service }) => {
  const { i18n } = useTranslation();
  const currentLang = useMemo(() => {
    switch (i18n.language) {
      case "vi": return ""
      default: return i18n.language.toUpperCase()
    }
  }, [i18n.language])
  return (
    <article className="flex flex-col gap-4 h-full xl:px-10 md:px-3">
      <Link
        href={`/service/${service.id}`}
        className="aspect-square overflow-hidden group"
      >
        <img
          src={service.featuredImage}
          alt={service.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-300 ease-in-out"
        />
      </Link>
      <Link href={`/service/${service.id}`}>
        <h3 className="text-xl font-semibold">{service[`name${currentLang}` as keyof typeof service]}</h3>
      </Link>
      <p className="line-clamp-2 mb-2 text-lg">{service[`description${currentLang}` as keyof typeof service]}</p>
      <Button href={`/service/${service.id}`} variant="outline" className="w-fit">
        <Trans text="common.viewMore" />
      </Button>
    </article>
  );
};

interface ServiceProps {
  services: Service[];
  className?: string;
}

const Services: FC<ServiceProps> = ({ services, className = "" }) => {

  const items = useMemo(() => services.map((Item, index) => (
    <Carousel.Slide key={index}>
      <Card service={Item} />
    </Carousel.Slide>
  )), [services])

  return (
    <section className={twMerge(`mt-10 mb-20 ${className}`)}>
      <div className="container px-4 m-auto">
        <div className="relative flex flex-col lg:flex-row items-center justify-center mb-10">
          <h2 className="capitalize font-semibold md:text-4xl text-2xl text-center mb-4 md:w-[650px] w-full sm:w-[450px] lg:leading-snug">
            <Trans text="home.service.title" />
          </h2>
          <Link
            href="/service"
            className="absolute right-0 -bottom-5 md:bottom-0 ml-auto flex items-center justify-center gap-1 text-sm z-10"
          >
            <Trans text="home.service.viewMore" />
            <MdArrowForwardIos className="text-xs" />
          </Link>
        </div>
        <Carousel
          slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
          slideGap={{ base: 0, sm: "md" }}
          loop
          align="start"
          controlSize={30}
          className="px-3 lg:px-10"
          controlsOffset={"none"}
        >
          {items}
        </Carousel>
      </div>
    </section>
  );
};

export default Services;
