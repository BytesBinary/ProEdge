import React from 'react'
import FaqItem from '../../components/TechHelp/FAQItem';
import PageHeader from '../../components/common/utils/banner/SubPageHeader';
import bgImage from "../../assets/images/cart.png";

const FAQPage = () => {
    return (
        <>
            <PageHeader
                title="FAQ"
                bgImage={bgImage}
                breadcrumbs={[{ link: "/", label: "Home" }, {link:"/tech-help" ,label: "Tech Help" ,},{label:"FAQ"}]}
            />
            <h1 className="text-center text-lg md:text-4xl font-medium mt-10">Customer Service</h1>
            <FaqItem />
        </>
    );
};

export default FAQPage
