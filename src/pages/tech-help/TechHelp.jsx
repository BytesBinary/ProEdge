import React from "react";
import bg from "../../assets/images/productDetails/bg.jpeg";
import greater from "../../assets/images/productDetails/greater.png";
import pick from "../../assets/images/techHelp/pick.png";
import returning from "../../assets/images/techHelp/return.png";
import history from "../../assets/images/techHelp/history.png";
import qoute from "../../assets/images/techHelp/qoute.png";
import modify from "../../assets/images/techHelp/modify.png";
import leftArrow from "../../assets/images/techHelp/leftArrow.png";
import returni from "../../assets/images/techHelp/retur.png";
import payment from "../../assets/images/techHelp/payment.png";
import term from "../../assets/images/techHelp/terms.png";
import shopping from "../../assets/images/techHelp/shopping.png";

import Icon from "../../components/TechHelp/Icon";
import FAQ from "../../components/TechHelp/FAQ";
import PolicyIcon from "../../components/TechHelp/PolicyIcon";
import PageHeader from "../../components/common/utils/banner/SubPageHeader";
import { useFetchPageBlocks } from "../../context/PageContext";

const TechHelp = () => {
  const { blocks } = useFetchPageBlocks("tech-help");

  const breadcrumb = blocks?.filter(
    (block) => block?.item?.type?.toLowerCase().trim() === "breadcrumb"
  )[0];
  const whatToDo = [
    { image: pick, title: "Track an order", link: "/track-order" },
    { image: returning, title: "Start a return", link: "/return-order" },
    { image: history, title: "View order history", link: "/order-history" },
    { image: qoute, title: "Request a quote", link: "/contact-us" },
    {
      image: modify,
      title: "Modify or cancel an order",
      link: "/modify-order",
    },
  ];

  const policies = [
    { image: returni, title: "Return Policy", link: "/return-policy" },
    { image: payment, title: "Payment Policy", link: "/payment-policy" },
    { image: term, title: "Terms of Use", link: "/terms-of-use" },
    { image: shopping, title: "Shipping Policy", link: "/shipping-policy" },
  ];

  return (
    <div>

      <PageHeader
        title={breadcrumb?.item?.title}
        bgImage={`${import.meta.env.VITE_SERVER_URL}/assets/${breadcrumb?.item?.image?.id}`}
        breadcrumbs={[{ link: "/", label: "Home" }, { label: breadcrumb?.item?.title }]}
      />

      <section className="my-10 max-w-7xl mx-auto">
        <h1 className="text-[#182B55] text-3xl md:text-5xl leading-tight font-semibold text-center">
          What would you like to do?
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 ">
          {whatToDo.map((item, index) => (
            <Icon
              key={index}
              imageSrc={item.image}
              title={item.title}
              link={item.link}
            />
          ))}
        </div>
      </section>

      <section className="my-20 md:my-10 max-w-7xl mx-auto">
        <h1 className="text-[#182B55] text-3xl md:text-5xl leading-tight font-semibold text-center">
          Help Topics
        </h1>
        <FAQ seeAllLink="see all" leftArrow={leftArrow} />
      </section>

      <section className="my-10 max-w-7xl mx-auto">
        <h1 className="text-[#182B55] text-3xl md:text-5xl leading-tight font-semibold text-center">
          Pro Edge Policies
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          {policies.map((policy, index) => (
            <PolicyIcon
              key={index}
              imageSrc={policy.image}
              title={policy.title}
              link={policy.link}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default TechHelp;
