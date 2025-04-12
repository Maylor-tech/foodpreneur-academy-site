import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { FaSearch, FaClock, FaFilter } from 'react-icons/fa';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Filter posts based on search query and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get current posts for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  // Get unique categories
  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Restaurant Business Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            Expert insights and practical tips for restaurant owners
          </motion.p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <FaFilter className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-64 lg:h-auto">
              <img
                src="/images/blog/featured-post.jpg"
                alt="Restaurant management"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-8 lg:p-12">
              <div className="text-orange-600 text-sm font-semibold mb-2">FEATURED POST</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                10 Proven Strategies to Increase Restaurant Profit Margins
              </h2>
              <p className="text-gray-600 mb-6">
                Learn the key strategies successful restaurant owners use to optimize their operations and increase profitability, from menu engineering to cost control.
              </p>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span>Operations</span>
                <span className="mx-2">•</span>
                <span>8 min read</span>
              </div>
              <Link
                to="/blog/increase-restaurant-profit-margins"
                className="text-orange-600 hover:text-orange-700 font-medium inline-flex items-center"
              >
                Read More
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="relative h-48">
                <img
                  src={post.image}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span>{post.category}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime} min read</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-orange-600 hover:text-orange-700 font-medium inline-flex items-center"
                >
                  Read More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Pagination */}
        {filteredPosts.length > postsPerPage && (
          <div className="flex justify-center space-x-2">
            {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === i + 1
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

const blogPosts = [
  {
    id: 1,
    title: 'Essential Kitchen Equipment for New Restaurants',
    excerpt: 'A comprehensive guide to selecting and purchasing the right equipment for your new restaurant.',
    image: '/images/blog/kitchen-equipment.jpg',
    category: 'Equipment',
    readTime: 8,
    slug: 'essential-kitchen-equipment'
  },
  {
    id: 2,
    title: 'Building a Strong Restaurant Team',
    excerpt: 'Tips for hiring, training, and retaining top talent in the competitive restaurant industry.',
    image: '/images/blog/restaurant-team.jpg',
    category: 'Management',
    readTime: 6,
    slug: 'building-restaurant-team'
  },
  {
    id: 3,
    title: 'Menu Engineering Basics',
    excerpt: 'Learn how to design and price your menu to maximize profitability while keeping customers happy.',
    image: '/images/blog/menu-engineering.jpg',
    category: 'Operations',
    readTime: 7,
    slug: 'menu-engineering-basics'
  },
  {
    id: 4,
    title: 'Restaurant Marketing in the Digital Age',
    excerpt: 'Modern marketing strategies to attract and retain customers in today\'s digital world.',
    image: '/images/blog/digital-marketing.jpg',
    category: 'Marketing',
    readTime: 5,
    slug: 'restaurant-digital-marketing'
  },
  {
    id: 5,
    title: 'Cost Control Strategies',
    excerpt: 'Effective methods to manage and reduce costs without compromising quality.',
    image: '/images/blog/cost-control.jpg',
    category: 'Finance',
    readTime: 9,
    slug: 'cost-control-strategies'
  },
  {
    id: 6,
    title: 'Creating a Memorable Customer Experience',
    excerpt: 'Tips for delivering exceptional service that keeps customers coming back.',
    image: '/images/blog/customer-experience.jpg',
    category: 'Service',
    readTime: 6,
    slug: 'memorable-customer-experience'
  }
];

export default Blog; 