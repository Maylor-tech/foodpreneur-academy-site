import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  {
    id: 1,
    question: "What is FoodPreneur Academy?",
    answer: "FoodPreneur Academy is an online learning platform specifically designed for independent restaurant owners. We provide expert training, resources, and tools to help you grow and manage your restaurant business more effectively."
  },
  {
    id: 2,
    question: "Who are the courses designed for?",
    answer: "Our courses are designed for independent restaurant owners, managers, and aspiring restaurateurs who want to improve their business operations, increase profitability, and learn industry best practices."
  },
  {
    id: 3,
    question: "What topics do your courses cover?",
    answer: "Our courses cover essential areas of restaurant management including menu optimization, financial planning, staff training, marketing strategies, inventory management, and customer service excellence."
  },
  {
    id: 4,
    question: "How do I access the training materials?",
    answer: "Once you enroll, you'll get immediate access to our online learning platform. All materials are available 24/7, and you can learn at your own pace from any device with an internet connection."
  },
  {
    id: 5,
    question: "Do you offer any free resources?",
    answer: "Yes! We provide free templates, guides, and tools in our Resources section. These include menu costing sheets, staff scheduling templates, and marketing checklists to help you get started."
  },
  {
    id: 6,
    question: "What kind of support do you offer?",
    answer: "We offer comprehensive support including email assistance, community forums, and regular Q&A sessions. Our team is available Monday through Friday to help you with any questions or challenges."
  }
];

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className={`w-full py-6 text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg ${
          isOpen ? 'text-orange-600' : 'text-gray-900'
        }`}
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">{question}</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={`transform transition-colors duration-200 ${
              isOpen ? 'text-orange-600' : 'text-gray-500'
            }`}
          >
            ▼
          </motion.span>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-gray-600">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (id) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <section className="py-20 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Find answers to common questions about FoodPreneur Academy
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="divide-y divide-gray-200">
            {faqData.map((item) => (
              <FAQItem
                key={item.id}
                question={item.question}
                answer={item.answer}
                isOpen={openItems.has(item.id)}
                onToggle={() => toggleItem(item.id)}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Still have questions? We&apos;re here to help!
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
          >
            Contact Us
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default FAQ; 