import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 'women', name: 'Women', image: '/assets/images/category-women.jpg' },
  { id: 'men', name: 'Men', image: '/assets/images/category-men.jpg' },
  { id: 'kids', name: 'Kids', image: '/assets/images/category-kids.jpg' },
  { id: 'accessories', name: 'Accessories', image: '/assets/images/category-accessories.jpg' }
];

const Categories = ({ items = categories }) => {
  return (
    <section className="py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-lg md:text-2xl font-semibold text-center">Shop by Category</h2>
        </div>

        <div className="mx-auto grid grid-cols-4 gap-8 sm:gap-10 md:flex md:flex-wrap md:justify-center lg:gap-12 lg:max-w-4xl px-4">
          {items.map((c) => (
            <Link to={`/products/${c.id}`} key={c.id} className="flex flex-col items-center justify-center text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200 group-hover:shadow-lg transition transform hover:scale-105">
                {/* Use img tag so local or external images work; fallback to a colored circle if missing */}
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/assets/images/product1.svg'; }}
                />
              </div>
              <span className="mt-2 text-xs sm:text-sm md:text-sm text-gray-700 group-hover:text-black font-medium">{c.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
