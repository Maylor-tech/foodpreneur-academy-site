import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const resourcesData = [
  {
    id: 1,
    title: "Restaurant Cost Calculator",
    description: "Calculate food costs, overhead, and profit margins with our easy-to-use spreadsheet.",
    type: "spreadsheet",
    icon: "📊",
    downloadUrl: "/resources/restaurant-cost-calculator.xlsx"
  },
  {
    id: 2,
    title: "Staff Training Manual Template",
    description: "Comprehensive template for creating your restaurant's staff training program.",
    type: "document",
    icon: "📋",
    downloadUrl: "/resources/staff-training-template.pdf"
  },
  {
    id: 3,
    title: "Menu Engineering Guide",
    description: "Learn how to analyze and optimize your menu for maximum profitability.",
    type: "guide",
    icon: "📚",
    downloadUrl: "/resources/menu-engineering-guide.pdf"
  },
  {
    id: 4,
    title: "Marketing Calendar Template",
    description: "Plan your restaurant's marketing activities with this 12-month calendar template.",
    type: "template",
    icon: "📅",
    downloadUrl: "/resources/marketing-calendar.pdf"
  },
  {
    id: 5,
    title: "Inventory Management System",
    description: "Track inventory, costs, and waste with our management spreadsheet.",
    type: "spreadsheet",
    icon: "📦",
    downloadUrl: "/resources/inventory-management.xlsx"
  },
  {
    id: 6,
    title: "Restaurant Checklist Bundle",
    description: "Daily, weekly, and monthly checklists for restaurant operations.",
    type: "bundle",
    icon: "✅",
    downloadUrl: "/resources/restaurant-checklists.zip"
  }
];

const blogPosts = [
  {
    id: 1,
    title: "5 Strategies to Reduce Food Waste in Your Restaurant",
    excerpt: "Learn practical tips to minimize waste and maximize profits in your kitchen operations.",
    date: "2024-03-15",
    readTime: "5 min read",
    image: "/images/placeholders/blog-1.jpg"
  },
  {
    id: 2,
    title: "Building a Strong Restaurant Team: Hiring and Training Tips",
    excerpt: "Discover effective methods for recruiting and developing top talent in the restaurant industry.",
    date: "2024-03-10",
    readTime: "7 min read",
    image: "/images/placeholders/blog-2.jpg"
  },
  {
    id: 3,
    title: "Menu Psychology: Design Tips That Increase Sales",
    excerpt: "Understanding how design and layout influence customer ordering behavior.",
    date: "2024-03-05",
    readTime: "6 min read",
    image: "/images/placeholders/blog-3.jpg"
  }
];

const Resources = () => {
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setNewsletterStatus({ loading: true, success: false, error: null });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setNewsletterStatus({ loading: false, success: true, error: null });
      setEmail('');
    } catch (error) {
      setNewsletterStatus({
        loading: false,
        success: false,
        error: 'Failed to subscribe. Please try again later.'
      });
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Resources Hero Section */}
      <section className="resources-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Free Resources for Restaurant Success
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Download practical tools and templates to help you manage and grow your restaurant business
          </motion.p>
        </div>
      </section>

      {/* Downloadable Resources Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resourcesData.map((resource) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="text-4xl mb-4">{resource.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  <motion.a
                    href={resource.downloadUrl}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
                  >
                    Download {resource.type === 'bundle' ? 'Bundle' : 'Resource'}
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-orange-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Get More Resources
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Subscribe to our newsletter for weekly tips, templates, and industry insights
            </p>
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                <motion.button
                  type="submit"
                  disabled={newsletterStatus.loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-white text-orange-600 rounded-lg font-semibold hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
                >
                  {newsletterStatus.loading ? 'Subscribing...' : 'Subscribe'}
                </motion.button>
              </div>
              <AnimatePresence>
                {newsletterStatus.success && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-white mt-4"
                  >
                    Thank you for subscribing! Check your email for confirmation.
                  </motion.p>
                )}
                {newsletterStatus.error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-200 mt-4"
                  >
                    {newsletterStatus.error}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Latest from Our Blog
            </h2>
            <p className="text-xl text-gray-600">
              Expert advice and insights for restaurant owners
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <motion.a
                    href={`/blog/${post.id}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-orange-600 font-semibold hover:text-orange-700"
                  >
                    Read More →
                  </motion.a>
                </div>
              </motion.article>
            ))}
          </div>
          <div className="text-center mt-12">
            <motion.a
              href="/blog"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
            >
              View All Articles
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources; 