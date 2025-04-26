const OrderSummaryCard = ({ cart }) => {
    const { items, shipping, tax } = cart;

    const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal + shipping + tax;

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold text-[#182B55] mb-4">
                Order Summary
            </h2>
            <ul className="space-y-2 text-gray-700">
                <li className="flex justify-between">
                    <span>Subtotal ({itemsCount} Items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                </li>
                <li className="flex justify-between text-[#5D6576]">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                </li>
                <li className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                </li>
            </ul>

            <div className="my-3 border-1 border-[#ECF0F9]"></div>

            <div className="flex justify-between font-bold text-lg text-[#182B55]">
                <span className="text-[#5D6576]">Total</span>
                <span>${total.toFixed(2)}</span>
            </div>

            <div className="mt-6 space-y-3">
                <button className="w-full bg-[#3F66BC] text-white py-2 rounded-full hover:bg-[#3457a4] transition">
                    Checkout
                </button>
                <button
                    className="w-full border border-[#3F66BC] text-[#3F66BC] py-2 rounded-full hover:bg-[#3F66BC] hover:text-white transition">
                    Checkout as Guest
                </button>
                <p className="text-xs text-center text-[#182B55] mt-2">
                    Free Shipping on Orders Over $500.
                </p>
            </div>
        </div>
    );
};

export default OrderSummaryCard;