function Cart({
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}) {
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="sticky top-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">
          My Cart
        </h2>

        <span className="text-sm text-gray-400">
          {cart.length} items
        </span>
      </div>

      {cart.length === 0 ? (
        <div className="text-center mt-20">
          <div className="text-6xl">🛒</div>

          <p className="font-semibold mt-4">
            Your cart is empty
          </p>

          <p className="text-gray-400 text-sm mt-1">
            Add something delicious.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-5 mt-7">
            {cart.map((item) => (
              <div key={item.id}>
                <div className="flex gap-3">
                  <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center text-3xl">
                    {item.emoji}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">
                      {item.name}
                    </h3>

                    <p className="font-bold text-sm mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-300 hover:text-red-500 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="w-8 h-8 border border-gray-200 rounded-lg cursor-pointer"
                    >
                      −
                    </button>

                    <span className="font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="w-8 h-8 bg-amber-400 rounded-lg cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <p className="font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 mt-8 pt-6">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-gray-400 mt-3">
              <span>Discount</span>
              <span>$0.00</span>
            </div>

            <div className="flex justify-between items-center mt-5">
              <span className="font-bold">Total</span>

              <span className="text-2xl font-bold">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() =>
                alert(`Checkout success! Total $${subtotal.toFixed(2)}`)
              }
              className="w-full py-4 bg-amber-400 hover:bg-amber-500 rounded-xl font-bold mt-6 cursor-pointer"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;