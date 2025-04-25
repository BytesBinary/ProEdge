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
          <a href="#">
            <div
              class="bg-[#F8F9FB] w-full md:w-[384px] h-[152px] p-6 rounded-xl hover:shadow-sm flex flex-col items-center justify-between gap-4 mx-auto mt-10">
              <img src={pick} alt="" class="w-14 h-14" />
                <h1 class="text-[#3F66BC] text-2xl leading-8 font-medium">Track my Order</h1>
            </div>
          </a>

          <a href="#">
            <div
              class="bg-[#F8F9FB] w-full md:w-[384px] h-[152px] p-6 rounded-xl hover:shadow-sm flex flex-col items-center justify-between gap-4 mx-auto mt-10">
              <img src={returning} alt="" class="w-14 h-14" />
                <h1 class="text-[#3F66BC] text-2xl leading-8 font-medium">Start a Return</h1>
            </div>
          </a>

          <a href="#">
            <div
              class="bg-[#F8F9FB] w-full md:w-[384px] h-[152px] p-6 rounded-xl hover:shadow-sm flex flex-col items-center justify-between gap-4 mx-auto mt-10">
              <img src={history} alt="" class="w-14 h-14" />
                <h1 class="text-[#3F66BC] text-2xl leading-8 font-medium">View order History</h1>
            </div>
          </a>

          <a href="#">
            <div
              class="bg-[#F8F9FB] w-full md:w-[384px] h-[152px] p-6 rounded-xl hover:shadow-sm flex flex-col items-center justify-between gap-4 mx-auto mt-10">
              <img src={qoute} alt="" class="w-14 h-14" />
                <h1 class="text-[#3F66BC] text-2xl leading-8 font-medium">Request a qoute</h1>
            </div>
          </a>
          <a href="#">
            <div
              class="bg-[#F8F9FB] w-full md:w-[384px] h-[152px] p-6 rounded-xl hover:shadow-sm flex flex-col items-center justify-between gap-4 mx-auto mt-10">
              <img src={modify} alt="" class="w-14 h-14" />
                <h1 class="text-[#3F66BC] text-2xl leading-8 font-medium">Modify or cancel an order</h1>
            </div>
          </a>
        </div>
      </section>

  
      <section class="my-20 md:my-10">
        <h1 class="text-[#182B55] text-3xl md:text-5xl leading-16 font-semibold text-center">Help Topics</h1>
        <div class=" container grid grid-cols-1 md:grid-cols-3 mx-auto gap-10 mt-10">
          <div class="w-full md:w-[384px] p-1 md:p-0 h-[232px] rounded-xl bg-white">
            <div
              class="bg-[#ECF0F9] h-12 rounded-t-xl py-[9px] px-4 font-semibold text-[#182B55] text-lg leading-[30px]">
              <h1>Ordering</h1>
            </div>
            <div
              class="p-3 font-medium text-[16px] leading-6 text-[#3F66BC] flex flex-col justify-around gap-4 h-[184px]">
              <div>
                <a href="#">
                  <h2 class="hover:underline">How long does it take to process and deliver an order
                    ?</h2>
                </a>
                <a href="#">
                  <h2 class="hover:underline">How can I cancel my order?</h2>
                </a>
              </div>
              <div class="flex items-center gap-2">
                <a href="#" class="hover:underline">See All</a>
                <img src={leftArrow} alt="" class="w-4 h-4" />
              </div>
            </div>
          </div>

          <div class="w-full md:w-[384px] p-1 md:p-0 h-[232px] rounded-xl bg-white">
            <div
              class="bg-[#ECF0F9] h-12 rounded-t-xl py-[9px] px-4 font-semibold text-[#182B55] text-lg leading-[30px]">
              <h1>Ordering</h1>
            </div>
            <div
              class="p-3 font-medium text-[16px] leading-6 text-[#3F66BC] flex flex-col justify-around gap-4 h-[184px]">
              <div>
                <a href="#">
                  <h2 class="hover:underline">How long does it take to process and deliver an order
                    ?</h2>
                </a>
                <a href="#">
                  <h2 class="hover:underline">How can I cancel my order?</h2>
                </a>
              </div>
              <div class="flex items-center gap-2 ">
                <a href="#" class="hover:underline">See All</a>
                <img src={leftArrow} alt="" class="w-4 h-4" />
              </div>
            </div>
          </div>

          <div class="w-full md:w-[384px] p-1 md:p-0 h-[232px] rounded-xl bg-white">
            <div
              class="bg-[#ECF0F9] h-12 rounded-t-xl py-[9px] px-4 font-semibold text-[#182B55] text-lg leading-[30px]">
              <h1>Ordering</h1>
            </div>
            <div
              class="p-3 font-medium text-[16px] leading-6 text-[#3F66BC] flex flex-col justify-around gap-4 h-[184px]">
              <div>
                <a href="#">
                  <h2 class="hover:underline">How long does it take to process and deliver an order
                    ?</h2>
                </a>
                <a href="#">
                  <h2 class="hover:underline">How can I cancel my order?</h2>
                </a>
              </div>
              <div class="flex items-center gap-2 ">
                <a href="#" class="hover:underline">See All</a>
                <img src={leftArrow} alt="" class="w-4 h-4" />
              </div>
            </div>
          </div>

          <div class="w-full md:w-[384px] p-1 md:p-0 h-[232px] rounded-xl bg-white">
            <div
              class="bg-[#ECF0F9] h-12 rounded-t-xl py-[9px] px-4 font-semibold text-[#182B55] text-lg leading-[30px]">
              <h1>Ordering</h1>
            </div>
            <div
              class="p-3 font-medium text-[16px] leading-6 text-[#3F66BC] flex flex-col justify-around gap-4 h-[184px]">
              <div>
                <a href="#">
                  <h2 class="hover:underline">How long does it take to process and deliver an order
                    ?</h2>
                </a>
                <a href="#">
                  <h2 class="hover:underline">How can I cancel my order?</h2>
                </a>
              </div>
              <div class="flex items-center gap-2">
                <a href="#" class="hover:underline">See All</a>
                <img src={leftArrow} alt="" class="w-4 h-4" />
              </div>
            </div>
          </div>

          <div class="w-full md:w-[384px] p-1 md:p-0 h-[232px] rounded-xl bg-white">
            <div
              class="bg-[#ECF0F9] h-12 rounded-t-xl py-[9px] px-4 font-semibold text-[#182B55] text-lg leading-[30px]">
              <h1>Ordering</h1>
            </div>
            <div
              class="p-3 font-medium text-[16px] leading-6 text-[#3F66BC] flex flex-col justify-around gap-4 h-[184px]">
              <div>
                <a href="#">
                  <h2 class="hover:underline">How long does it take to process and deliver an order
                    ?</h2>
                </a>
                <a href="#">
                  <h2 class="hover:underline">How can I cancel my order?</h2>
                </a>
              </div>
              <div class="flex items-center gap-2 ">
                <a href="#" class="hover:underline">See All</a>
                <img src={leftArrow} alt="" class="w-4 h-4" />
              </div>
            </div>
          </div>

          <div class="w-full md:w-[384px] p-1 md:p-0 h-[232px] rounded-xl bg-white">
            <div
              class="bg-[#ECF0F9] h-12 rounded-t-xl py-[9px] px-4 font-semibold text-[#182B55] text-lg leading-[30px]">
              <h1>Ordering</h1>
            </div>
            <div
              class="p-3 font-medium text-[16px] leading-6 text-[#3F66BC] flex flex-col justify-around gap-4 h-[184px]">
              <div>
                <a href="#">
                  <h2 class="hover:underline">How long does it take to process and deliver an order
                    ?</h2>
                </a>
                <a href="#">
                  <h2 class="hover:underline">How can I cancel my order?</h2>
                </a>
              </div>
              <div class="flex items-center gap-2 ">
                <a href="#" class="hover:underline">See All</a>
                <img src={leftArrow} alt="" class="w-4 h-4" />
              </div>
            </div>
          </div>

          <div class="w-full md:w-[384px] p-1 md:p-0 h-[232px] rounded-xl bg-white">
            <div
              class="bg-[#ECF0F9] h-12 rounded-t-xl py-[9px] px-4 font-semibold text-[#182B55] text-lg leading-[30px]">
              <h1>Ordering</h1>
            </div>
            <div
              class="p-3 font-medium text-[16px] leading-6 text-[#3F66BC] flex flex-col justify-around gap-4 h-[184px]">
              <div>
                <a href="#">
                  <h2 class="hover:underline">How long does it take to process and deliver an order
                    ?</h2>
                </a>
                <a href="#">
                  <h2 class="hover:underline">How can I cancel my order?</h2>
                </a>
              </div>
              <div class="flex items-center gap-2">
                <a href="#" class="hover:underline">See All</a>
                <img src={leftArrow} alt="" class="w-4 h-4" />
              </div>
            </div>
          </div>

          <div class="w-full md:w-[384px] p-1 md:p-0 h-[232px] rounded-xl bg-white">
            <div
              class="bg-[#ECF0F9] h-12 rounded-t-xl py-[9px] px-4 font-semibold text-[#182B55] text-lg leading-[30px]">
              <h1>Ordering</h1>
            </div>
            <div
              class="p-3 font-medium text-[16px] leading-6 text-[#3F66BC] flex flex-col justify-around gap-4 h-[184px]">
              <div>
                <a href="#">
                  <h2 class="hover:underline">How long does it take to process and deliver an order
                    ?</h2>
                </a>
                <a href="#">
                  <h2 class="hover:underline">How can I cancel my order?</h2>
                </a>
              </div>
              <div class="flex items-center gap-2 ">
                <a href="#" class="hover:underline">See All</a>
                <img src={leftArrow} alt="" class="w-4 h-4" />
              </div>
            </div>
          </div>

          <div class="w-full md:w-[384px] p-1 md:p-0 h-[232px] rounded-xl bg-white">
            <div
              class="bg-[#ECF0F9] h-12 rounded-t-xl py-[9px] px-4 font-semibold text-[#182B55] text-lg leading-[30px]">
              <h1>Ordering</h1>
            </div>
            <div
              class="p-3 font-medium text-[16px] leading-6 text-[#3F66BC] flex flex-col justify-around gap-4 h-[184px]">
              <div>
                <a href="#">
                  <h2 class="hover:underline">How long does it take to process and deliver an order
                    ?</h2>
                </a>
                <a href="#">
                  <h2 class="hover:underline">How can I cancel my order?</h2>
                </a>
              </div>
              <div class="flex items-center gap-2 ">
                <a href="#" class="hover:underline">See All</a>
                <img src={leftArrow} alt="" class="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>


      <section class="my-10">
        <h1 class="text-[#182B55] text-3xl md:text-5xl leading-16 font-semibold text-center">Pro Edge Policies</h1>
        <div class="flex flex-col md:flex-row justify-around gap-10 mt-12">
          <a href="#">
            <div
              class="w-[282px] h-[168px] rounded-xl hover:shadow-sm py-6 px-4 bg-[#F8F9FB] flex flex-col items-center justify-between gap-6 mx-auto">
              <img src={shopping} alt="" class="w-16 h-16" />
                <h3 class="font-medium text-[#182B55] text-2xl leading-8">Shipping</h3>
            </div>
          </a>

          <a href="#">
            <div
              class="w-[282px] h-[168px] rounded-xl hover:shadow-sm py-6 px-4 bg-[#F8F9FB] flex flex-col items-center justify-between gap-6 mx-auto">
              <img src={returni} alt="" class="w-16 h-16" />
                <h3 class="font-medium text-[#182B55] text-2xl leading-8">Retruns</h3>
            </div>
          </a>

          <a href="#">
            <div
              class="w-[282px] h-[168px] rounded-xl hover:shadow-sm py-6 px-4 bg-[#F8F9FB] flex flex-col items-center justify-between gap-6 mx-auto">
              <img src={payment} alt="" class="w-16 h-16" />
                <h3 class="font-medium text-[#182B55] text-2xl leading-8">Payment</h3>
            </div>
          </a>

          <a href="#">
            <div
              class="w-[282px] h-[168px] rounded-xl hover:shadow-sm py-6 px-4 bg-[#F8F9FB] flex flex-col items-center justify-between gap-6 mx-auto">
              <img src={term}  alt="" class="w-16 h-16" />
                <h3 class="font-medium text-[#182B55] text-2xl leading-8">Terms & Confitions</h3>
            </div>
          </a>
        </div>
      </section>
    </div>
  )
}

export default TechHelp
