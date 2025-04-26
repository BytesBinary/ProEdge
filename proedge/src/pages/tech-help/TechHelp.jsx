import React from 'react'
import bg from '../../assets/images/productDetails/bg.jpeg'
import greater from '../../assets/images/productDetails/greater.png'
import pick from '../../assets/images/techHelp/pick.png'
import returning from '../../assets/images/techHelp/return.png'
import history from '../../assets/images/techHelp/history.png'
import qoute from '../../assets/images/techHelp/qoute.png'
import modify from '../../assets/images/techHelp/modify.png'
import leftArrow from '../../assets/images/techHelp/leftArrow.png'
import returni from '../../assets/images/techHelp/retur.png'
import payment from '../../assets/images/techHelp/payment.png'
import term from '../../assets/images/techHelp/terms.png'
import shopping from '../../assets/images/techHelp/shopping.png'

import Icon from '../../components/TechHelp/Icon'
import FAQ from '../../components/TechHelp/FAQ'



const TechHelp = () => {

  return (
    <div>
      <div class="relative w-full h-[20vh] md:h-[30vh] lg:h-[20vw] overflow-hidden">

        <img src={bg} alt="A man using a grinder on wood"
          class="absolute inset-0 w-full h-full object-cover object-center" />


        <div class="absolute inset-0 bg-black/60 bg-opacity-60"></div>


        <div
          class="relative container mx-auto h-full flex flex-col justify-center items-start px-6 md:px-12 lg:px-20 text-white">
          <h1 class="text-3xl md:text-4xl font-semibold">Tech Help</h1>
          <nav class="mt-2 text-sm md:text-base flex items-center gap-2 md:gap-4">
            <a href="/" class="hover:underline">Home</a>
            <img src={greater} alt="An icon pointing to the right" class="w-6 h-6" />
            <span class="text-gray-300">Tech Help</span>
          </nav>
        </div>
      </div>


      <section class="my-10">
        <h1 class="text-[#182B55] text-3xl md:text-5xl leading-16 font-semibold text-center">What would you like to do?
        </h1>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Icon imageSrc={pick} title="Track an order" link="#" />
          <Icon imageSrc={returning} title="Start a return" link="#" />
          <Icon imageSrc={history} title="View order history" link="#" />
          <Icon imageSrc={qoute} title="Request a quote" link="#" />
          <Icon imageSrc={modify} title="Modify or cancel an order" link="#" />
        </div>
      </section>


      <section class="my-20 md:my-10">
        <h1 class="text-[#182B55] text-3xl md:text-5xl leading-16 font-semibold text-center">Help Topics</h1>
        <div class=" container grid grid-cols-1 md:grid-cols-3 mx-auto gap-10 mt-10">

          <FAQ
            heading="Ordering"
            questions={[
              { href: '#', text: 'How long does it take to process and deliver an order?' },
              { href: '#', text: 'How can I cancel my order?' }
            ]}
            seeAllLink="#"
            leftArrow={leftArrow}
          /> 
          
          <FAQ
            heading="Shipping"
            questions={[
              { href: '#', text: 'What shipping methods are available?' },
              { href: '#', text: 'Do you ship internationally?' }
            ]}
            seeAllLink="#"
            leftArrow={leftArrow}
          />

        </div>
      </section>


      <section class="my-10">
        <h1 class="text-[#182B55] text-3xl md:text-5xl leading-16 font-semibold text-center">Pro Edge Policies</h1>
        <div class="flex flex-col md:flex-row justify-center gap-10 mt-12">
          <Icon imageSrc={returni} title="Return Policy" link="#" />
          <Icon imageSrc={payment} title="Payment Policy" link="#" />
          <Icon imageSrc={term} title="Terms of Use" link="#" />
          <Icon imageSrc={shopping} title="Shipping Policy" link="#" />
        </div>
      </section>
    </div>
  )
}

export default TechHelp
