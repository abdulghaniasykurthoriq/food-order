import ProductCard from "./ProductCard";

function ProductList({
  products,
  addToCart,
  editProduct,
  deleteProduct,
}) {
  return (
    <section className="mt-8">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">
          Popular Dish
        </h2>

        <span className="text-sm text-gray-400">
          {products.length} products
        </span>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-3">🍽️</div>
          Product not found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              editProduct={editProduct}
              deleteProduct={deleteProduct}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductList;