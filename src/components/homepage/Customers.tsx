import { Customer } from "@/types";
import { twMerge } from "tailwind-merge";
import { Trans } from "../common";
import { Carousel } from "@mantine/carousel";
import { memo, useMemo, type FC } from "react";
import useLang from "@/hooks/useLang";

interface CustomersProps {
  customers: Customer[];
  className?: string;
}

const Customers: FC<CustomersProps> = ({ customers, className = "" }) => {
  const { currentLanguage } = useLang()

  const items = useMemo(() => customers.map((customer, index) => <CustomerItem lang={currentLanguage} customer={customer} key={index} />), [customers, currentLanguage])

  return (
    <section className={twMerge(`mt-20 bg-secondary-dark ${className}`)}>
      <div className="container m-auto w-full">
        <h2 className="text-center text-4xl font-semibold py-10 ">
          <Trans text="home.customer.title" />
        </h2>
        <Carousel
          slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
          slideGap={{ base: 0, sm: "md" }}
          loop
          align="start"
          controlSize={40}
          className="flex justify-center items-center lg:px-12 pb-20"
        >
          {items}
        </Carousel>
      </div>
    </section>
  );
};

const CustomerItem = memo<{
  customer: Customer;
  lang: string
}>(({ customer, lang }) => {
  return <Carousel.Slide>
    <div className="group px-8 bg-secondary w-full h-full flex flex-col items-center relative cursor-pointer transition-all">
      <div className="absolute w-full h-full hover:hidden group-hover:opacity-0 transition-all">
        <img src={customer.image} title="slide" className="w-full h-full object-cover content-center" />
      </div>
      <div className="absolute w-full h-full bg-primary opacity-80 group-hover:-translate-y-[60%] group-hover:opacity-0 transition-all flex justify-center items-center">
        <img src={customer.icon} alt="icon" className="w-1/2" />
      </div>
      <img
        src={customer.logo}
        alt={customer.name}
        className="object-contain mb-8 mt-12 h-32"
      />
      <h3 className="text-center text-2xl font-medium mb-8 mx-10">
        {customer[`name${lang}` as keyof Customer] as string}
      </h3>

      <p className="text-center text-base mb-12">
        {customer[`description${lang}` as keyof Customer] as string}
      </p>
    </div>
  </Carousel.Slide>
})

export default Customers;
