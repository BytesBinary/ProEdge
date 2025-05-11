import { FaCreditCard, FaLink } from 'react-icons/fa';
import { SiAlipay, SiKlarna } from 'react-icons/si';


const PaymentOption = ({ method, onChange, currency = 'usd' }) => {
  const paymentMethods = [
    {
      id: 'card',
      label: 'Credit/Debit Card',
      icon: <FaCreditCard className="text-lg mr-2" />,
      supported: ['usd', 'eur', 'gbp'].includes(currency)
    },
    // {
    //   id: 'alipay',
    //   label: 'Alipay',
    //   icon: <SiAlipay className="text-lg mr-2" />,
    //   supported: currency === 'usd'
    // },
    // {
    //   id: 'klarna',
    //   label: 'Klarna',
    //   icon: <SiKlarna className="text-lg mr-2" />,
    //   supported: ['usd', 'eur', 'gbp'].includes(currency)
    // },
    // {
    //   id: 'afterpay_clearpay',
    //   label: 'Afterpay/Clearpay',
    //   icon: <span className="text-lg mr-2">💳</span>,
    //   supported: ['usd', 'gbp'].includes(currency)
    // },
    // {
    //   id: 'link',
    //   label: 'Link by Stripe',
    //   icon: <FaLink className="text-lg mr-2" />,
    //   supported: currency === 'usd'
    // },
    // {
    //   id: 'ideal',
    //   label: 'iDEAL',
    //   icon: <span className="text-lg mr-2">🏦</span>,
    //   supported: currency === 'eur'
    // }
  ].filter(m => m.supported);

  return (
    <div className="flex flex-wrap gap-3 mt-4">
      {paymentMethods.map((payment) => (
        <button
          key={payment.id}
          type="button"
          className={`flex items-center text-sm sm:text-md font-semibold px-5 py-2.5 rounded-full transition-all border ${
            method === payment.id
              ? 'bg-[#3F66BC] text-white border-[#3F66BC] shadow-md'
              : 'bg-white text-[#3F66BC] border-[#ECF0F9] hover:shadow-md'
          }`}
          onClick={() => onChange(payment.id)}
        >
          {payment.icon}
          <span>{payment.label}</span>
        </button>
      ))}
    </div>
  );
};

export default PaymentOption;