import React from 'react';
import bg from '../../assets/images/productDetails/bg.jpeg';
import greater from '../../assets/images/productDetails/greater.png';
import pick from '../../assets/images/techHelp/pick.png';
import returning from '../../assets/images/techHelp/return.png';
import history from '../../assets/images/techHelp/history.png';
import qoute from '../../assets/images/techHelp/qoute.png';
import modify from '../../assets/images/techHelp/modify.png';
import leftArrow from '../../assets/images/techHelp/leftArrow.png';
import returni from '../../assets/images/techHelp/retur.png';
import payment from '../../assets/images/techHelp/payment.png';
import term from '../../assets/images/techHelp/terms.png';
import shopping from '../../assets/images/techHelp/shopping.png';

import Icon from '../../components/TechHelp/Icon';
import FAQ from '../../components/TechHelp/FAQ';
import PolicyIcon from '../../components/TechHelp/PolicyIcon';

const TechHelp = () => {
  const whatToDo = [
    { image: pick, title: 'Track an order', link: '/track-order' },
    { image: returning, title: 'Start a return', link: '/return-order' },
    { image: history, title: 'View order history', link: '/order-history' },
    { image: qoute, title: 'Request a quote', link: '#' },
    { image: modify, title: 'Modify or cancel an order', link: '/modify-order' },
  ];

  const helpTopics = [
    {
      heading: 'Ordering',
      questions: [
        { href: '#', text: 'How long does it take to process and deliver an order?' },
        { href: '#', text: 'How can I cancel my order?' },
      ],
      seeAllLink: '#',
    },
    {
      heading: 'Shipping',
      questions: [
        { href: '#', text: 'What shipping methods are available?' },
        { href: '#', text: 'Do you ship internationally?' },
      ],
      seeAllLink: '#',
    },
  ];

  const policies = [
    { image: returni, title: 'Return Policy', link: '#' },
    { image: payment, title: 'Payment Policy', link: '#' },
    { image: term, title: 'Terms of Use', link: '#' },
    { image: shopping, title: 'Shipping Policy', link: '#' },
  ];

  return (
    <div>
      <div className="relative w-full h-[20vh] md:h-[30vh] lg:h-[20vw] overflow-hidden">
        <img src={bg} alt="A man using a grinder on wood" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/60"></div>


        <div className="relative container mx-auto h-full flex flex-col justify-center items-start px-6 md:px-12 lg:px-20 text-white">

          <h1 className="text-3xl md:text-4xl font-semibold">Tech Help</h1>
          <nav className="mt-2 text-sm md:text-base flex items-center gap-2 md:gap-4">
            <a href="/" className="hover:underline">Home</a>
            <img src={greater} alt="An icon pointing to the right" className="w-6 h-6" />
            <span className="text-gray-300">Tech Help</span>
          </nav>
        </div>
      </div>


      <section className="my-10 max-w-7xl mx-auto">
        <h1 className="text-[#182B55] text-3xl md:text-5xl leading-tight font-semibold text-center">

          What would you like to do?
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {whatToDo.map((item, index) => (
            <Icon key={index} imageSrc={item.image} title={item.title} link={item.link} />
          ))}
        </div>
      </section>

      <section className="my-20 md:my-10 max-w-7xl mx-auto">
        <h1 className="text-[#182B55] text-3xl md:text-5xl leading-tight font-semibold text-center">
          Help Topics
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          {helpTopics.map((topic, index) => (
            <FAQ
              key={index}
              heading={topic.heading}
              questions={topic.questions}
              seeAllLink={topic.seeAllLink}
              leftArrow={leftArrow}
            />
          ))}
        </div>
      </section>


      <section className="my-10 max-w-7xl mx-auto">
        <h1 className="text-[#182B55] text-3xl md:text-5xl leading-tight font-semibold text-center">

          Pro Edge Policies
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          {policies.map((policy, index) => (
            <PolicyIcon key={index} imageSrc={policy.image} title={policy.title} link={policy.link} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default TechHelp;