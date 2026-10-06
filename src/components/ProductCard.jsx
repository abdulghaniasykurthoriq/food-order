function ProductCard({
  product,
  addToCart,
  editProduct,
  deleteProduct,
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm hover:shadow-lg transition group">
      <div className="flex justify-center">
        <div className="w-24 h-24 rounded-full bg-amber-50 flex items-center justify-center text-6xl">
          {product.emoji}
        </div>
      </div>

      <p className="text-xs text-amber-600 font-medium mt-4">
        {product.category}
      </p>

      <h3 className="font-semibold mt-1 min-h-12">
        {product.name}
      </h3>

      <div className="text-xs text-gray-400 flex gap-2 mt-2">
        <span>{product.calories} cal</span>
        <span>•</span>
        <span>{product.portion} portion</span>
      </div>

      <div className="flex items-center justify-between mt-5">
        <p className="text-xl font-bold">
          ${product.price.toFixed(2)}
        </p>

        <button
          onClick={() => addToCart(product)}
          className="w-10 h-10 rounded-full bg-amber-400 hover:bg-amber-500 font-bold text-xl cursor-pointer"
        >
          +
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <button
          onClick={() => editProduct(product)}
          className="py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm cursor-pointer"
        >
          ✏️ Edit
        </button>

        <button
          onClick={() => deleteProduct(product.id)}
          className="py-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 text-sm cursor-pointer"
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

export default ProductCard;