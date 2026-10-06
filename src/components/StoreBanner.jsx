function StoreBanner({ productCount }) {
  return (
    <section className="mt-6">
      <div className="text-sm mb-4">
        <span className="text-gray-400">Store</span>
        <span className="mx-2 text-amber-400">•</span>
        <span className="font-medium">Bell Fresh</span>
      </div>

      <div className="bg-gray-900 text-white rounded-2xl px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold">
            BF
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              Bell Fresh
            </h2>

            <p className="text-sm text-gray-400">
              Fresh & healthy food recipe
            </p>
          </div>
        </div>

        <div className="flex gap-8">
          <Stat number={productCount} label="Total Item" />
          <Stat number="05" label="Category" />
          <Stat number="04" label="Outlet" />
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }) {
  return (
    <div className="text-center">
      <p className="text-xl text-amber-400 font-bold">
        {number}
      </p>

      <p className="text-xs text-gray-400">
        {label}
      </p>
    </div>
  );
}

export default StoreBanner;