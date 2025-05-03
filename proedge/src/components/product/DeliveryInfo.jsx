import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../context/CartContext';

const DeliveryInfo = ({ product, imageId, price, originalPrice, stock, sku }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);

  // Check if product is in cart and get its quantity
  useEffect(() => {
    const cartItem = cartItems.find(item => item.id === product.id);
    setIsInCart(!!cartItem);
    setCartQuantity(cartItem?.quantity || 0);
  }, [cartItems, product.id]);

  // Ensure we have proper numeric values
  const numericPrice = typeof price === 'string' ? 
    parseFloat(price.replace(/[^0-9.]/g, '')) : 
    Number(price);
  
  const numericOriginalPrice = originalPrice ? 
    (typeof originalPrice === 'string' ? 
      parseFloat(originalPrice.replace(/[^0-9.]/g, '')) : 
      Number(originalPrice)) : 
    null;

  const handleAddToCart = () => {
    const itemToAdd = {
      id: product.id,
      title: product.title,
      price: numericPrice,
      regular_price: numericOriginalPrice,
      quantity: quantity,
      sku: sku,
      image: imageId,
      stock: stock
    };
    addToCart(itemToAdd);
  };

  const handleRemoveFromCart = () => {
    removeFromCart({ id: product.id });
  };

  // Update quantity if product is already in cart
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);
    
    if (isInCart) {
      const updatedItem = {
        id: product.id,
        title: product.title,
        price: numericPrice,
        regular_price: numericOriginalPrice,
        quantity: newQuantity,
        sku: sku,
        image: imageId,
        stock: stock
      };
      addToCart(updatedItem); // This will update the quantity
    }
  };

  return (
    <div className="h-auto max-w-xs rounded-xl border-2 bg-[#F8F9FB] border-[#ECF0F9] py-4 px-3 mx-auto lg:mx-0">
      <div className="w-full max-w-xs md:max-w-[180px] flex flex-col justify-between space-y-4">
        {/* Price */}
        <div className="flex items-center justify-start text-base leading-4 text-[#182B55]">
          <span>$</span>&nbsp;
          <h1 className="text-3xl font-medium">{(numericPrice * quantity).toFixed(2)}</h1>
          {/* {numericOriginalPrice && (
            <span className="ml-2 text-sm line-through text-gray-500">
              ${(numericOriginalPrice * quantity).toFixed(2)}
            </span>
          )} */}
        </div>

        {/* Shipping Info */}
        <div>
          <p className="text-sm">
            <span className="text-[#5D6576]">Get Fast, </span>
            <span className="font-medium text-[#182B55]">
              Free Shipping on Orders Over $500.
            </span>
          </p>
        </div>

        {/* Stock */}
        <div>
          <p className="text-[#3F66BC] font-medium">{stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
          {stock > 0 && (
            <select 
              className="mt-2 border rounded p-1 w-full"
              value={isInCart ? cartQuantity : quantity}
              onChange={handleQuantityChange}
            >
              {[...Array(Math.min(stock, 5))].map((_, i) => (
                <option key={i} value={i+1}>{i+1}</option>
              ))}
            </select>
          )}
        </div>

        {/* Buttons */}
        {isInCart ? (
          <>
            <button 
              className="bg-red-500 hover:bg-red-600 text-white py-2 rounded"
              onClick={handleRemoveFromCart}
            >
              Remove from Cart
            </button>
            <div className="text-center text-sm text-green-600">
              {cartQuantity} in cart
            </div>
          </>
        ) : (
          <button 
            className="bg-[#FCD700] hover:bg-[#FCD700]/70 text-[#182B55] py-2 rounded"
            onClick={handleAddToCart}
            disabled={stock <= 0}
          >
            Add to Cart
          </button>
        )}
        
        <button 
          className="bg-[#3F66BC] hover:bg-[#3F66BC]/80 text-white py-2 rounded"
          disabled={stock <= 0}
        >
          Buy Now
        </button>

        {/* Info Items */}
        <div className="text-xs text-[#5D6576] space-y-1">
          <p><span className="font-medium">Ships from:</span> Controls Pro</p>
          <p><span className="font-medium">SKU:</span> {sku}</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;