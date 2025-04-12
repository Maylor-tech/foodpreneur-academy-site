import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaChalkboardTeacher, FaChartLine, FaUsers, FaBookOpen } from 'react-icons/fa';

const features = [
  {
    icon: <FaChalkboardTeacher className="w-6 h-6" />,
    title: "Expert-Led Training",
    description: "Learn proven restaurant management strategies from industry experts"
  },
  {
    icon: <FaChartLine className="w-6 h-6" />,
    title: "Business Growth",
    description: "Master the skills to scale your restaurant business effectively"
  },
  {
    icon: <FaUsers className="w-6 h-6" />,
    title: "Community Support",
    description: "Join a network of restaurant owners sharing insights and experiences"
  },
  {
    icon: <FaBookOpen className="w-6 h-6" />,
    title: "Practical Resources",
    description: "Access templates, guides, and tools for immediate implementation"
  }
];

const testimonials = [
  {
    quote: "The financial management course helped me increase my restaurant's profit margin by 25%",
    author: "Restaurant Owner, New York",
    business: "Fine Dining Establishment"
  },
  {
    quote: "Finally, a training program that understands the real challenges of running a restaurant",
    author: "Restaurant Manager, Chicago",
    business: "Casual Dining Chain"
  },
  {
    quote: "The staff management techniques transformed how I run my business",
    author: "Restaurant Owner, Los Angeles",
    business: "Family Restaurant"
  }
];

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform Your Restaurant Business
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100">
              Expert training and resources for independent restaurant owners
            </p>
            <Link
              to="/login"
              className="inline-block bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-50 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Start Learning Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose FoodPreneur Academy?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-orange-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow duration-200"
              >
                <div className="text-orange-600 mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What You'll Learn</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-semibold mb-4">Business Fundamentals</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <span className="text-orange-600 mr-2">✓</span>
                  Restaurant Business Planning
                </li>
                <li className="flex items-center">
                  <span className="text-orange-600 mr-2">✓</span>
                  Financial Management
                </li>
                <li className="flex items-center">
                  <span className="text-orange-600 mr-2">✓</span>
                  Marketing Strategies
                </li>
                <li className="flex items-center">
                  <span className="text-orange-600 mr-2">✓</span>
                  Staff Management
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-semibold mb-4">Operational Excellence</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <span className="text-orange-600 mr-2">✓</span>
                  Kitchen Operations
                </li>
                <li className="flex items-center">
                  <span className="text-orange-600 mr-2">✓</span>
                  Inventory Management
                </li>
                <li className="flex items-center">
                  <span className="text-orange-600 mr-2">✓</span>
                  Quality Control
                </li>
                <li className="flex items-center">
                  <span className="text-orange-600 mr-2">✓</span>
                  Customer Service
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-orange-50 p-8 rounded-xl"
              >
                <p className="text-lg mb-4 italic">"{testimonial.quote}"</p>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-gray-600">{testimonial.business}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to Transform Your Restaurant?</h2>
          <p className="text-xl mb-8 text-orange-100">Join FoodPreneur Academy today and take your business to the next level</p>
          <Link
            to="/login"
            className="inline-block bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-50 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 