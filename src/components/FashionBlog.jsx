import React from "react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    title: "Top 10 Fashion Trends for 2025",
    image:
      "https://images.unsplash.com/photo-1521335629791-ce4aec67ddaf?auto=format&fit=crop&w=1000&q=80",
    date: "Nov 2, 2025",
    link: "/blog/top-trends-2025",
  },
  {
    title: "How to Build a Capsule Wardrobe",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80",
    date: "Oct 15, 2025",
    link: "/blog/capsule-wardrobe",
  },
  {
    title: "Perfect Outfit for Every Occasion",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15d3b5d46?auto=format&fit=crop&w=1000&q=80",
    date: "Sep 30, 2025",
    link: "/blog/perfect-outfit",
  },
];

const FashionBlog = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-10 py-16">
      {/* Section Heading */}
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-gray-900">
        Style Tips & Fashion Guides
      </h2>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <div
            key={index}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-[250px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5">
              <p className="text-xs text-gray-400 mb-1">{post.date}</p>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {post.title}
              </h3>
              <Link
                to={post.link}
                className="text-pink-600 font-medium text-sm hover:underline"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FashionBlog;
