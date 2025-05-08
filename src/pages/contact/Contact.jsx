import React from "react";
import ContactInfoItem from "../../components/contactus/ContactInfoItem";
import SocialIcon from "../../components/contactus/SocialIcon";
import InputField from "../../components/contactus/InputField";
import SelectField from "../../components/contactus/SelectField";
import TextareaField from "../../components/contactus/TextArea";
import SubPageHeader from "../../components/common/utils/banner/SubPageHeader";
import bgImage from "../../assets/images/cart.png";
import categoryOptions from "../../data/contactus/CategoryOption";
import breadcrumbs from "../../data/contactus/Breadcrumbs";
import socialLinks from "../../data/contactus/SocialLinks";
import formFields from "../../data/contactus/FormFields";
import contactInfoItems from "../../data/contactus/ContactInfoItems";
import Map from "../../components/contactus/Map";
import Button from "../../components/contactus/Button";
import axios from "axios";
import { useEffect, useState } from "react";

const Contact = () => {
  const [footer, setFooter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ALL_FOOTER_QUERY = `
  query{
    Footer{
      id
      footer_title
      contact_number
      fax
      phone_no
      email
      location_title
      location_url
    }
  }
  `;
  const fetchFooter = async () => {
    setLoading(true);
    setError(null);
    try{
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/graphql`,
        {
          query: ALL_FOOTER_QUERY,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }
      setFooter(response.data.data.Footer || []);
    } catch (error) {
      console.error("GraphQL fetch error:", error);
      setError(error.message);
      setLoading(false);
    }
    finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFooter();
  }, []);



  return (
    <>
      <SubPageHeader
        title="Contact Us"
        bgImage={bgImage}
        breadcrumbs={breadcrumbs}
      />

      <section className="w-full max-w-[1200px] mx-auto mt-3 md:mt-20 flex flex-col lg:flex-row justify-center items-center lg:items-start gap-10">
        {/* Contact Information Section */}
        <div className="w-full max-w-md h-[549px] bg-[#3F66BC] py-8 px-6 rounded-[16px] mx-auto flex flex-col justify-between text-white">
          <div className="flex flex-col gap-[16px]">
            <h1 className="font-semibold text-[32px] leading-10">
              Contact Information
            </h1>
            <p className="font-medium text-[16px] leading-[26px]">
              Have questions or need assistance? Reach out to our friendly team!
            </p>
          </div>

          <div className="h-[344.5px] flex flex-col justify-between">
            {contactInfoItems.map((item, index) => (
              <ContactInfoItem
                key={index}
                icon={item.icon}
                title={item.title}
                content={item.content}
              />
            ))}

            <div className="flex gap-[24px]">
              {socialLinks.map((social, index) => (
                <SocialIcon key={index} icon={social.icon} href={social.href} />
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="w-full max-w-3xl h-[630px] relative mx-auto">
          <h1 className="font-semibold text-4xl leading-12 text-center md:text-left">Get In Touch</h1>

          <div className="flex flex-col items-center lg:items-start gap-[16px] mt-8">
            {/* First row of fields */}
            <div className="flex flex-col md:w-full md:flex-row justify-between gap-6">
              {formFields.slice(0, 2).map((field, index) => (
                <InputField
                  key={index}
                  type={field.type}
                  id={field.id}
                  name={field.name}
                  placeholder={field.placeholder}
                  fullWidth={field.fullWidth}
                />
              ))}
            </div>

            {/* Second row of fields */}
            <div className="flex flex-col md:w-full md:flex-row justify-between gap-6">
              {formFields.slice(2, 4).map((field, index) => (
                <InputField
                  key={index}
                  type={field.type}
                  id={field.id}
                  name={field.name}
                  placeholder={field.placeholder}
                  fullWidth={field.fullWidth}
                />
              ))}
            </div>

            {/* Full width fields */}
            {formFields.slice(4).map((field, index) => (
              <InputField
                key={index}
                type={field.type}
                id={field.id}
                name={field.name}
                placeholder={field.placeholder}
                fullWidth={field.fullWidth}
              />
            ))}

            <SelectField
              id="category"
              name="category"
              options={categoryOptions}
              fullWidth={false}
            />
            
            <TextareaField id="details" name="details" placeholder="Details*" fullWidth={false} />

            <Button className="md:absolute right-0 bottom-0">Submit Now</Button>
          </div>
        </div>
      </section>
            {/* {console.log(fo)} */}
      <Map locationUrl={footer?.location_url}/>
    </>
  );
};

export default Contact;
