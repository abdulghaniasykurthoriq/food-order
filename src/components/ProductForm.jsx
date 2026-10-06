import { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  category: "Burger",
  price: "",
  calories: "",
  portion: "",
  emoji: "🍔",
};

const emojiMap = {
  Burger: "🍔",
  Salad: "🥗",
  Pizza: "🍕",
  Steak: "🥩",
  Drinks: "🥤",
};

function ProductForm({
  isOpen,
  closeForm,
  saveProduct,
  editingProduct,
}) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editingProduct) {
      setForm(editingProduct);
    } else {
      setForm(emptyForm);
    }
  }, [editingProduct, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      setForm({
        ...form,
        category: value,
        emoji: emojiMap[value],
      });

      return;
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.price) return;

    saveProduct({
      ...form,
      price: Number(form.price),
      calories: Number(form.calories),
      portion: Number(form.portion),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-5">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-3xl p-7 shadow-2xl"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {editingProduct ? "Edit Product" : "Add Product"}
          </h2>

          <button
            type="button"
            onClick={closeForm}
            className="text-gray-400 hover:text-black cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 mt-6">
          <Input
            label="Product Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Pepperoni Pizza"
          />

          <div>
            <label className="text-sm font-medium">
              Category
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-amber-400"
            >
              <option>Burger</option>
              <option>Salad</option>
              <option>Pizza</option>
              <option>Steak</option>
              <option>Drinks</option>
            </select>
          </div>

          <Input
            label="Price"
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={handleChange}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Calories"
              name="calories"
              type="number"
              value={form.calories}
              onChange={handleChange}
            />

            <Input
              label="Portion"
              name="portion"
              type="number"
              value={form.portion}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-7">
          <button
            type="button"
            onClick={closeForm}
            className="flex-1 py-3 bg-gray-100 rounded-xl cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex-1 py-3 bg-amber-400 hover:bg-amber-500 rounded-xl font-semibold cursor-pointer"
          >
            {editingProduct ? "Save Changes" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium">
        {label}
      </label>

      <input
        {...props}
        className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-amber-400"
      />
    </div>
  );
}

export default ProductForm;