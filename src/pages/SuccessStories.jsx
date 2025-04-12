import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';

const SuccessStories = () => {
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
            Restaurant Success Stories
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            See how restaurant owners like you achieved their business goals
          </motion.p>
        </div>

        {/* Success Stories */}
        <div className="space-y-12">
          {successStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <img
                    src={story.image}
                    alt={story.businessName}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 lg:p-12">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-5 w-5 ${i < story.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {story.businessName}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {story.description}
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700">{story.achievement1}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700">{story.achievement2}</span>
                    </div>
                  </div>
                  <div className="mt-8 border-t border-gray-200 pt-8">
                    <blockquote className="italic text-gray-600">
                      "{story.testimonial}"
                    </blockquote>
                    <div className="mt-4">
                      <p className="font-medium text-gray-900">{story.ownerName}</p>
                      <p className="text-gray-500">Owner, {story.businessName}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join FoodPreneur Academy and transform your restaurant business
          </p>
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700">
            Get Started Today
          </button>
        </motion.div>
      </div>
    </Layout>
  );
};

const successStories = [
  {
    id: 1,
    businessName: "The Urban Kitchen",
    ownerName: "Sarah Chen",
    description: "A modern Asian fusion restaurant that went from struggling to thriving with our strategies.",
    image: "/images/success-stories/urban-kitchen.jpg",
    rating: 5,
    achievement1: "Increased monthly revenue by 85% in 6 months",
    achievement2: "Reduced food waste by 40% through better inventory management",
    testimonial: "The systems and strategies I learned helped me transform my restaurant from barely surviving to highly profitable. The practical approach made all the difference."
  },
  {
    id: 2,
    businessName: "Rustic Table",
    ownerName: "Michael Rodriguez",
    description: "A farm-to-table restaurant that expanded to multiple locations using our growth framework.",
    image: "/images/success-stories/rustic-table.jpg",
    rating: 5,
    achievement1: "Successfully opened 2 new locations in 18 months",
    achievement2: "Maintained 92% staff retention rate during expansion",
    testimonial: "The expansion strategies and operational systems we learned made it possible to grow while maintaining quality and culture across all locations."
  },
  {
    id: 3,
    businessName: "Sweet & Savory Café",
    ownerName: "Emily Thompson",
    description: "A neighborhood café that transformed its business model and doubled profitability.",
    image: "/images/success-stories/sweet-savory-cafe.jpg",
    rating: 5,
    achievement1: "Doubled average ticket size through menu optimization",
    achievement2: "Increased customer satisfaction score from 4.2 to 4.8",
    testimonial: "The menu engineering and customer experience strategies completely transformed our business. Our regulars love the changes, and we're attracting new customers every day."
  }
];

export default SuccessStories; 