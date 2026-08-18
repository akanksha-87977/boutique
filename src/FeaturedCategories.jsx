import React from 'react';

const FeaturedCategories = ({ onNavigate }) => {
  const categories = [
    {
      id: 1,
      name: 'Dresses',
      slug: 'dresses',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop'
    },
    {
      id: 2,
      name: 'Knitwear',
      slug: 'knitwear',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=1000&fit=crop'
    },
    {
      id: 3,
      name: 'Accessories',
      slug: 'accessories',
      image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&h=1000&fit=crop'
    },
    {
      id: 4,
      name: 'Outerwear',
      slug: 'outerwear',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop'
    },
    {
      id: 5,
      name: 'Tops',
      slug: 'tops',
      image: 'https://images.unsplash.com/photo-1564859228273-274232fdb516?w=800&h=1000&fit=crop'
    },
    {
      id: 6,
      name: 'Bottoms',
      slug: 'bottoms',
      image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&h=1000&fit=crop'
    },
    {
      id: 7,
      name: 'Shoes',
      slug: 'shoes',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&h=1000&fit=crop'
    },
    {
      id: 8,
      name: 'Bags',
      slug: 'bags',
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=1000&fit=crop'
    }
  ];

  return (
    <section className="featured-categories">
      <h2 className="section-title">Shop By Category</h2>
      <div className="categories-grid">
        {categories.map(category => (
          <div 
            key={category.id} 
            className="category-card"
            onClick={() => onNavigate('shop', category.slug)}
          >
            <div className="category-image">
              <img src={category.image} alt={category.name} />
            </div>
            <h3 className="category-name">{category.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;