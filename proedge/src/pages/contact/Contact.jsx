import React from 'react'
import bg from '../../assets/images/productDetails/bg.jpeg'
import greater from '../../assets/images/productDetails/greater.png'
import call from '../../assets/images/contact/call.png'
import mail from '../../assets/images/contact/mail.png'
import location from '../../assets/images/contact/location.png'
import insta from '../../assets/images/contact/insta.png'
import fb from '../../assets/images/contact/fb.png'
import ln from '../../assets/images/contact/in.png'
import twit from '../../assets/images/contact/twit.png'
import map from '../../assets/images/contact/map.png'

const Contact = () => {
  return (
    <div>
      <section class="relative w-full h-[20vh] md:h-[30vh] lg:h-[20vw] overflow-hidden">

        <img src={bg} alt="A man using a grinder on wood"
          class="absolute inset-0 w-full h-full object-cover object-center" />


        <div class="absolute inset-0 bg-black/60 bg-opacity-60"></div>


        <div
          class="relative container mx-auto h-full flex flex-col justify-center items-start px-6 md:px-12 lg:px-20 text-white">
          <h1 class="text-3xl md:text-4xl font-semibold">Contact Us</h1>
          <nav class="mt-2 text-sm md:text-base flex items-center gap-2 md:gap-4">
            <a href="/" class="hover:underline">Home</a>
            <img src={greater} alt="An icon pointing to the right" class="w-6 h-6" />
            <span class="text-gray-300">Contact</span>
          </nav>
        </div>
      </section>


      <section class="w-full mt-3 md:mt-20 flex flex-col lg:flex-row justify-around items-start gap-10">

        <div
          class="w-full md:w-[424px] h-[549px] bg-[#3F66BC] py-8 px-6 rounded-[16px] flex flex-col justify-between text-white">
          <div class="flex flex-col gap-[16px]">
            <h1 class="font-semibold text-[32px] leading-10">Contact Information</h1>
            <p class="font-medium text-[16px] leading-[26px]">Have questions or need assistance? Reach out to our
              friendly team!</p>
          </div>
          <div class="h-[344.5px] flex flex-col justify-between ">

            <div class="flex gap-4 items-center">
              <div class="w-12 h-12 bg-[#FFFFFF]/15 rounded-[39px] flex items-center justify-center">
                <img src={call} alt="" class="w-7 h-7" />
              </div>
              <div>
                <h2 class="font-medium text-[16px] leading-6">Phone Number</h2>
                <h5 class="text-[16px] leading-5">(236) 461-2622</h5>
              </div>
            </div>
            <div class="border-b-2 border-[#FFFFFF]/10 h-[1.5px]"></div>

            <div class="flex gap-4 items-center">
              <div class="w-12 h-12 bg-[#FFFFFF]/15 rounded-[39px] flex items-center justify-center">
                <img src={mail} alt="" class="w-7 h-7" />
              </div>
              <div>
                <h2 class="font-medium text-[16px] leading-6">Email Address</h2>
                <h5 class="text-[16px] leading-5">info@divihardware.com</h5>
              </div>
            </div>
            <div class="border-b-2 border-[#FFFFFF]/10 h-[1.5px]"></div>


            <div class="flex gap-4 items-center">
              <div class="w-12 h-12 bg-[#FFFFFF]/15 rounded-[39px] flex items-center justify-center">
                <img src={location} alt="" class="w-7 h-7" />
              </div>
              <div>
                <h2 class="font-medium text-[16px] leading-6">Location</h2>
                <h5 class="text-[16px] leading-5">1234 Divi St. San Francisco, CA 93145</h5>
              </div>
            </div>
            <div class="border-b-2 border-[#FFFFFF]/10 h-[1.5px]"></div>


            <div class="flex gap-[24px]">
              <a href="#">
                <div class="w-10 h-10 bg-[#FFFFFF]/15 rounded-[39px] flex items-center justify-center">
                  <img src={insta} alt="" class="w-5 h-5" />
                </div>
              </a>
              <a href="#">
                <div class="w-10 h-10 bg-[#FFFFFF]/15 rounded-[39px] flex items-center justify-center">
                  <img src={fb} alt="" class="w-5 h-5" />
                </div>
              </a>
              <a href="#">
                <div class="w-10 h-10 bg-[#FFFFFF]/15 rounded-[39px] flex items-center justify-center">
                  <img src={ln} alt="" class="w-5 h-5" />
                </div>
              </a>
              <a href="#">
                <div class="w-10 h-10 bg-[#FFFFFF]/15 rounded-[39px] flex items-center justify-center">
                  <img src={twit} alt="" class="w-5 h-5" />
                </div>
              </a>
            </div>

          </div>

        </div>


        <div class="w-full md:w-[720px] h-[630px] relative">
          <h1 class="font-semibold text-4xl leading-12">Get In Touch</h1>
          <div class="flex flex-col gap-[16px] mt-8">
            <div class="flex flex-col md:flex-row justify-between gap-6">

              <input type="text" id="fname" name="fname" placeholder="First Name*" required
                class="w-[348px] bg-[#F8F9FB] border border-[#ECF0F9] rounded-[8px] px-4 py-[17px] text-[16px] text-[#5D6576] leading-[22px] placeholder-opacity-100 placeholder-[#5D6576] focus:outline-none focus:ring-2 focus:ring-[#cfd8e6] transition duration-200" />


              <input type="text" id="lname" name="lname" placeholder="Last Name*" required
                class="w-[348px] bg-[#F8F9FB] border border-[#ECF0F9] rounded-[8px] px-4 py-[17px] placeholder-opacity-100 placeholder-[#5D6576] text-[16px] leading-[22px] focus:outline-none focus:ring-2 focus:ring-[#cfd8e6] transition duration-200" />
            </div>
            <div class="flex flex-col md:flex-row justify-between gap-6">

              <input type="email" id="email" name="email" placeholder="Email Address*" required
                class="bg-[#F8F9FB] border border-[#ECF0F9] rounded-[8px] px-4 py-[17px] text-[#5D6576] placeholder-opacity-100 placeholder-[#5D6576] text-[16px] w-[348px] leading-[22px] focus:outline-none focus:ring-2 focus:ring-[#cfd8e6] transition duration-200" />


              <input type="tel" id="phone" name="phone" placeholder="Phone Number*" required
                class="bg-[#F8F9FB] border border-[#ECF0F9] rounded-[8px] px-4 py-[17px] text-[#5D6576] placeholder-opacity-100 placeholder-[#5D6576] text-[16px] w-[348px] leading-[22px] focus:outline-none focus:ring-2 focus:ring-[#cfd8e6] transition duration-200" />
            </div>

            <input type="text" id="subject" name="subject" placeholder="Subject*" required
              class="bg-[#F8F9FB] border border-[#ECF0F9] rounded-[8px] px-4 py-[17px] text-[#5D6576] placeholder-opacity-100 placeholder-[#5D6576] text-[16px] w-[348px] md:w-full leading-[22px] focus:outline-none focus:ring-2 focus:ring-[#cfd8e6] transition duration-200" />


            <select id="category" name="category" required
              class="bg-[#F8F9FB] border border-[#ECF0F9] rounded-[8px] px-4 py-[17px] text-[#5D6576] text-[16px] leading-[22px] w-[348px] md:w-full focus:outline-none focus:ring-2 focus:ring-[#cfd8e6] transition duration-200">
              <option value="" disabled selected>Select a Category</option>
              <option value="general">General Inquiry</option>
              <option value="support">Customer Support</option>
              <option value="feedback">Feedback</option>
              <option value="partnership">Partnership</option>
              <option value="other">Other</option>
            </select>


            <textarea id="details" name="details" placeholder="Details*" required rows="5"
              class="bg-[#F8F9FB] border border-[#ECF0F9] rounded-[8px] px-4 pt-4 pb-[47px] w-[348px] md:w-full text-[#5D6576] text-[16px] placeholder-opacity-100 placeholder-[#5D6576] leading-[22px] resize-none focus:outline-none focus:ring-2 focus:ring-[#cfd8e6] transition duration-200"></textarea>
            <a href="#">
              <button
                class="md:absolute right-0 bottom-0 bg-[#3F66BC] rounded-[180px] py-4 px-8 text-white text-lg leading-6 hover:bg-[#3F66BC]/80 cursor-pointer">Submit
                Now
              </button>
            </a>
          </div>

        </div>

      </section>


      <section class="mt-48 md:mt-18">
        <img src={map} alt="" class="w-full h-[400px] object-cover " />
      </section>

    </div>
  )
}

export default Contact
