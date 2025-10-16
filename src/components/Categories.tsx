import textbooksIcon from "@/assets/category-textbooks.png";
import electronicsIcon from "@/assets/category-electronics.png";
import furnitureIcon from "@/assets/category-furniture.png";

const categories = [
  { id: 1, name: "Textbooks & Course Materials", icon: textbooksIcon, count: "2.5K items" },
  { id: 2, name: "Electronics", icon: electronicsIcon, count: "1.8K items" },
  { id: 3, name: "Furniture & Dorm Decor", icon: furnitureIcon, count: "950 items" },
  { id: 4, name: "Clothing & Accessories", icon: "👕", count: "1.2K items" },
  { id: 5, name: "Musical Instruments", icon: "🎸", count: "340 items" },
  { id: 6, name: "Sports & Fitness", icon: "⚽", count: "720 items" },
  { id: 7, name: "Services", icon: "🛠️", count: "450 items" },
];

const Categories = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Browse by Category</h2>
          <p className="text-muted-foreground">Find exactly what you need for campus life</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              className="flex flex-col items-center gap-3 p-6 bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group"
            >
              {typeof category.icon === 'string' && category.icon.startsWith('/') ? (
                <img src={category.icon} alt={category.name} className="h-12 w-12 object-contain" />
              ) : (
                <div className="text-4xl">{category.icon}</div>
              )}
              <div className="text-center">
                <div className="font-semibold text-sm group-hover:text-primary transition-colors">
                  {category.name}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{category.count}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
