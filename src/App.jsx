import { useEffect, useState } from "react";

import Header from "./components/Header";
import StoreBanner from "./components/StoreBanner";
import CategoryList from "./components/CategoryList";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import Cart from "./components/Cart";

import { initialProducts } from "./data/products";

function App() {
  // =========================
  // PRODUCTS
  // =========================

  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");

    return savedProducts
      ? JSON.parse(savedProducts)
      : initialProducts;
  });

  // =========================
  // CART
  // =========================

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  // =========================
  // SEARCH & CATEGORY
  // =========================

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // =========================
  // PRODUCT FORM
  // =========================

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // =========================
  // MOBILE CART
  // =========================

  const [isCartOpen, setIsCartOpen] = useState(false);

  // =========================
  // LOCAL STORAGE
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "products",
      JSON.stringify(products)
    );
  }, [products]);

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  // =========================
  // PRODUCT CRUD
  // =========================

  const openAddForm = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const editProduct = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setEditingProduct(null);
    setIsFormOpen(false);
  };

  const saveProduct = (product) => {
    // UPDATE
    if (editingProduct) {
      setProducts((currentProducts) =>
        currentProducts.map((item) =>
          item.id === editingProduct.id
            ? {
                ...product,
                id: editingProduct.id,
              }
            : item
        )
      );

      // Update data juga kalau product sudah ada di cart
      setCart((currentCart) =>
        currentCart.map((item) =>
          item.id === editingProduct.id
            ? {
                ...item,
                ...product,
                id: editingProduct.id,
                quantity: item.quantity,
              }
            : item
        )
      );
    }

    // CREATE
    else {
      const newProduct = {
        ...product,
        id: Date.now(),
      };

      setProducts((currentProducts) => [
        ...currentProducts,
        newProduct,
      ]);
    }

    closeForm();
  };

  // DELETE PRODUCT
  const deleteProduct = (productId) => {
    const confirmed = window.confirm(
      "Delete this product?"
    );

    if (!confirmed) return;

    setProducts((currentProducts) =>
      currentProducts.filter(
        (product) => product.id !== productId
      )
    );

    // Kalau product ada di cart, hapus juga
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== productId
      )
    );
  };

  // =========================
  // ADD TO CART
  // =========================

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      // Kalau sudah ada → quantity + 1
      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      // Kalau belum ada → tambah baru
      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // =========================
  // INCREASE QUANTITY
  // =========================

  const increaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // =========================
  // DECREASE QUANTITY
  // =========================

  const decreaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // =========================
  // REMOVE FROM CART
  // =========================

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== productId
      )
    );
  };

  // =========================
  // FILTER PRODUCT
  // =========================

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All" ||
      product.category === activeCategory;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // =========================
  // CART COUNT
  // =========================

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-amber-50 p-3 sm:p-5 lg:p-10">

      {/* =========================
          MAIN CONTAINER
      ========================= */}

      <div
        className="
          max-w-[1500px]
          mx-auto
          bg-white
          rounded-2xl
          lg:rounded-[32px]
          shadow-xl
          overflow-hidden
          flex
        "
      >

        {/* =========================
            LEFT CONTENT
        ========================= */}

        <section className="w-full lg:w-[75%] p-4 sm:p-6 lg:p-8">

          <Header
            search={search}
            setSearch={setSearch}
            openForm={openAddForm}
            openCart={() => setIsCartOpen(true)}
            cartCount={cartCount}
          />

          <StoreBanner
            productCount={products.length}
          />

          <CategoryList
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          <ProductList
            products={filteredProducts}
            addToCart={addToCart}
            editProduct={editProduct}
            deleteProduct={deleteProduct}
          />

        </section>

        {/* =========================
            DESKTOP CART
        ========================= */}

        <aside
          className="
            hidden
            lg:block
            lg:w-[25%]
            border-l
            border-gray-100
            p-8
          "
        >
          <Cart
            cart={cart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            removeFromCart={removeFromCart}
          />
        </aside>

      </div>

      {/* =========================
          MOBILE CART DRAWER
      ========================= */}

      {isCartOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">

          {/* DARK BACKGROUND */}
          <div
            onClick={() => setIsCartOpen(false)}
            className="
              absolute
              inset-0
              bg-black/50
              backdrop-blur-[2px]
            "
          />

          {/* CART PANEL */}
          <div
            className="
              absolute
              right-0
              top-0
              h-full
              w-[90%]
              max-w-sm
              bg-white
              p-6
              overflow-y-auto
              shadow-2xl
            "
          >

            {/* CLOSE BUTTON */}
            <div className="flex justify-end mb-5">

              <button
                onClick={() => setIsCartOpen(false)}
                className="
                  w-10
                  h-10
                  bg-gray-100
                  hover:bg-gray-200
                  rounded-full
                  cursor-pointer
                  font-bold
                "
              >
                ✕
              </button>

            </div>

            <Cart
              cart={cart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeFromCart={removeFromCart}
            />

          </div>

        </div>
      )}

      {/* =========================
          PRODUCT FORM MODAL
      ========================= */}

      <ProductForm
        isOpen={isFormOpen}
        closeForm={closeForm}
        saveProduct={saveProduct}
        editingProduct={editingProduct}
      />

      {/* =========================
          MOBILE ADD PRODUCT
      ========================= */}

      <button
        onClick={openAddForm}
        className="
          md:hidden
          fixed
          bottom-5
          left-5
          z-40
          w-14
          h-14
          bg-amber-400
          hover:bg-amber-500
          rounded-full
          shadow-xl
          text-2xl
          font-bold
          cursor-pointer
        "
      >
        +
      </button>

    </main>
  );
}

export default App;