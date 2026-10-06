import { categories } from "../data/categories";

function CategoryList({ activeCategory, setActiveCategory }) {
  return (
    <div className="flex gap-3 mt-6 overflow-x-auto pb-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setActiveCategory(category.name)}
          className={`
            min-w-24 h-24 rounded-2xl border
            flex flex-col items-center justify-center gap-1
            cursor-pointer transition
            ${
              activeCategory === category.name
                ? "bg-amber-400 border-amber-400 shadow-md"
                : "bg-white border-gray-200 hover:border-amber-400"
            }
          `}
        >
          <span className="text-3xl">
            {category.emoji}
          </span>

          <span className="text-sm font-medium">
            {category.name}
          </span>
        </button>
      ))}
    </div>
  );
}

export default CategoryList;