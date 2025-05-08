import React from 'react';

const FaqItem = () => {
  return (
    <details className="border-b border-gray-200 group max-w-7xl w-full px-4 md:px-8 mx-auto py-6 transition-all duration-300 hover:bg-gray-50 open:bg-gray-50">
      <summary className="cursor-pointer flex justify-between items-center list-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg p-2">
        <span className="font-semibold text-gray-900 text-lg md:text-xl lg:text-2xl pr-4">
          How can I cancel my order?
        </span>
        <svg
          className="w-6 h-6 text-gray-700 shrink-0 transition-transform duration-300 group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      
      <div className="mt-4 text-gray-700 space-y-4 text-base md:text-lg pl-2 pb-4">
        <p className="leading-relaxed">
          To cancel an order, please contact our customer service team immediately. The sooner you reach out, the better chance we have to process your cancellation request.
        </p>
        
        <div className="bg-blue-50 rounded-lg p-4 space-y-3">
          <h3 className="font-semibold text-gray-900 text-base md:text-lg">
            Customer Service Contact
          </h3>
          <ul className="space-y-2 text-sm md:text-base">
            <li>
              <a href="/contact" className="text-blue-700 hover:text-blue-900 transition-colors flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                Contact Form
              </a>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              <a href="tel:8552899676" className="text-blue-700 hover:text-blue-900 transition-colors">
                (855) 289-9676
              </a>
            </li>
            <li className="flex items-start">
              <svg className="w-4 h-4 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
              <div>
                <p className="font-medium">Operating Hours:</p>
                <p>Monday - Friday: 6 a.m. - 9 p.m. CT</p>
                <p>Saturday: 7 a.m. - 5 p.m. CT</p>
                <p className="mt-2 text-xs text-gray-600">
                  *Closed on major holidays. View our{' '}
                  <a href="/holiday-schedule" className="text-blue-700 hover:text-blue-900 transition-colors">
                    holiday schedule
                  </a>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </details>
  );
};

export default FaqItem;