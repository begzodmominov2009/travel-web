import Banner from "@/components/shared/home/Banner";
import Destination from "@/components/shared/home/Destination";
import Faq from "@/components/shared/home/Faq";
import Hero from "@/components/shared/home/Hero";
import Package from "@/components/shared/home/Package";
import Partners from "@/components/shared/home/Partners";
import Tour from "@/components/shared/home/Tour";
import Containers from "@/components/ui/Containers";
import getData from "@/services/api";
import React, { Fragment } from "react";

const page = async () => {
  const res = await getData({ url: "destination" });
  console.log(res);

  return (
    <Fragment>
      <Hero />
      <Partners />
      <Destination />
      <Banner />
      <Package />
      <Faq />
      <Tour />
    </Fragment>
  );
};

export default page;
