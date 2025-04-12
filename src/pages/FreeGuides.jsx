import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';

const FreeGuides = () => {
  const [email, setEmail] = useState('');
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleDownload = (guide) => {
    setSelectedGuide(guide);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the email submission and guide delivery
    // For now, we'll just simulate the download
    window.open(selectedGuide.downloadUrl, '_blank');
    setShowModal(false);
    setEmail('');
  };

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
            Free Restaurant Business Guides
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            Download practical guides and templates to help grow your restaurant
          </motion.p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide, index) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="text-orange-600 mb-4">
                  {guide.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {guide.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {guide.description}
                </p>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleDownload(guide)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
                  >
                    Download Guide
                  </button>
                  <span className="text-sm text-gray-500">{guide.format}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Email Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg p-8 max-w-md w-full mx-4"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Download {selectedGuide?.title}
              </h3>
              <p className="text-gray-600 mb-6">
                Enter your email to receive your free guide. We'll also send you our weekly restaurant tips newsletter (you can unsubscribe anytime).
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700"
                  >
                    Download Now
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </Layout>
  );
};

const guides = [
  {
    id: 1,
    title: 'Restaurant Business Plan Template',
    description: 'A comprehensive template to help you create a professional business plan for your restaurant.',
    format: 'PDF + Excel',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    downloadUrl: '/guides/restaurant-business-plan-template.pdf'
  },
  {
    id: 2,
    title: 'Kitchen Equipment Checklist',
    description: 'Essential equipment list with cost estimates and vendor recommendations.',
    format: 'PDF',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    downloadUrl: '/guides/kitchen-equipment-checklist.pdf'
  },
  {
    id: 3,
    title: 'Menu Pricing Calculator',
    description: 'Calculate food costs and optimal pricing for your menu items.',
    format: 'Excel',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    downloadUrl: '/guides/menu-pricing-calculator.xlsx'
  },
  {
    id: 4,
    title: 'Staff Training Manual Template',
    description: 'Customizable training manual for front-of-house and kitchen staff.',
    format: 'Word + PDF',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    downloadUrl: '/guides/staff-training-manual-template.pdf'
  },
  {
    id: 5,
    title: 'Restaurant Marketing Plan',
    description: 'Marketing strategy template with social media calendar and campaign ideas.',
    format: 'PDF + Excel',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
    downloadUrl: '/guides/restaurant-marketing-plan.pdf'
  },
  {
    id: 6,
    title: 'Food Cost Control Guide',
    description: 'Strategies and worksheets for managing food costs and reducing waste.',
    format: 'PDF',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    downloadUrl: '/guides/food-cost-control-guide.pdf'
  }
];

export default FreeGuides; 