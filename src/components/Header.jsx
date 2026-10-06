function Header({
  search,
  setSearch,
  openForm,
  openCart,
  cartCount,
}) {
  return (
    <header className="flex items-center gap-2 sm:gap-3">

      {/* MENU */}
      <button
        className="
          shrink-0
          w-11
          h-11
          sm:w-12
          sm:h-12
          bg-amber-400
          hover:bg-amber-500
          rounded-xl
          cursor-pointer
          transition
        "
      >
        ☰
      </button>

      {/* SEARCH */}
      <div
        className="
          flex-1
          min-w-0
          h-11
          sm:h-12
          bg-gray-100
          rounded-xl
          flex
          items-center
          px-3
          sm:px-5
          gap-2
        "
      >
        <span className="text-sm">
          🔍
        </span>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search food..."
          className="
            w-full
            min-w-0
            bg-transparent
            outline-none
            text-sm
          "
        />
      </div>

      {/* =========================
          MOBILE CART BUTTON
      ========================= */}

      <button
        onClick={openCart}
        className="
          lg:hidden
          relative
          shrink-0
          w-11
          h-11
          sm:w-12
          sm:h-12
          bg-gray-900
          hover:bg-black
          text-white
          rounded-xl
          cursor-pointer
          transition
        "
      >
        🛒

        {/* CART BADGE */}
        {cartCount > 0 && (
          <span
            className="
              absolute
              -top-2
              -right-2
              min-w-5
              h-5
              px-1
              bg-amber-400
              text-black
              text-[11px]
              font-bold
              rounded-full
              flex
              items-center
              justify-center
            "
          >
            {cartCount > 99 ? "99+" : cartCount}
          </span>
        )}

      </button>

      {/* =========================
          DESKTOP ADD PRODUCT
      ========================= */}

      <button
        onClick={openForm}
        className="
          hidden
          md:block
          shrink-0
          px-5
          h-12
          bg-gray-900
          hover:bg-black
          text-white
          rounded-xl
          font-medium
          cursor-pointer
          transition
        "
      >
        + Add Product
      </button>

    </header>
  );
}

export default Header;