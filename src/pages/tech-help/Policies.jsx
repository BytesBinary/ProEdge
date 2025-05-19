import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const policyContent = {
    "/return-policy": {
        title: "Return Policy",
        sections: [
            {
                title: 'Introduction',
                content: `We strive to ensure you're satisfied with every purchase. If you're not, here's how to initiate a return.`
            },
            {
                title: 'Eligibility',
                content: `Returns are accepted within 30 days of delivery. Products must be unused and in original packaging.`
            },
            {
                title: 'Process',
                content: (
                    <ul className="list-disc list-inside space-y-2">
                        <li>Log in to your account</li>
                        <li>Navigate to 'My Orders'</li>
                        <li>Select the order and click 'Return'</li>
                    </ul>
                )
            }
        ]
    },
    "/payment-policy": {
        title: "Payment Policy",
        sections: [
            {
                title: 'Accepted Methods',
                content: `We accept Visa, MasterCard, PayPal, and more.`
            },
            {
                title: 'Security',
                content: `All transactions are encrypted and secure.`
            }
        ]
    },
    "/terms-of-use": {
        title: "Terms of Use",
        sections: [
            {
                title: 'Introduction',
                content: `Welcome to our platform. By using our services, you agree to the following terms.`
            },
            {
                title: 'Responsibilities',
                content: `You agree not to misuse the service.`
            }
        ]
    },
    "/shipping-policy": {
        title: "Shipping Policy",
        sections: [
            {
                title: 'Delivery Time',
                content: `Orders are shipped within 2-5 business days.`
            },
            {
                title: 'Carriers',
                content: `We use FedEx, UPS, and USPS.`
            }
        ]
    }
};

const Policies = () => {
    const { pathname } = useLocation();

    const defaultContent = {
        title: "Policy Information",
        sections: [
            {
                title: "Notice",
                content: "The policy you're looking for doesn't exist or wasn't found."
            }
        ]
    };

    const policy = policyContent[pathname] || defaultContent;

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">{policy.title}</h1>
                    <p className="text-gray-600 mb-6">Last Updated: {new Date().toLocaleDateString()}</p>

                    <div className="space-y-6">
                        {policy.sections.map((section, index) => (
                            <section key={index}>
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                    {section.title}
                                </h2>
                                <div className="text-gray-600 leading-relaxed">
                                    {section.content}
                                </div>
                                {index < policy.sections.length - 1 && (
                                    <hr className="my-6 border-gray-200" />
                                )}
                            </section>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Policies;
