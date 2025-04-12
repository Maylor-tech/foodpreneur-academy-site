import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaBook, FaChartLine, FaUsers, FaDownload } from 'react-icons/fa';
import Layout from '../components/layout/Layout';

const courses = [
  {
    id: 1,
    title: 'Staff Management',
    progress: 100,
    completed: true,
    description: 'Learn effective techniques for hiring, training, and managing restaurant staff.',
    modules: 5
  },
  {
    id: 2,
    title: 'Marketing Essentials',
    progress: 100,
    completed: true,
    description: 'Master digital and traditional marketing strategies for restaurants.',
    modules: 4
  },
  {
    id: 3,
    title: 'Financial Management',
    progress: 100,
    completed: true,
    description: 'Understand key financial metrics and optimize your restaurant\'s profitability.',
    modules: 6
  },
  {
    id: 4,
    title: 'Growth Strategies',
    progress: 100,
    completed: true,
    description: 'Learn proven strategies to scale your restaurant business.',
    modules: 5
  }
];

const resources = [
  {
    id: 1,
    title: 'Employee Handbook Template',
    type: 'PDF',
    icon: <FaDownload />
  },
  {
    id: 2,
    title: 'Marketing Calendar Template',
    type: 'Excel',
    icon: <FaDownload />
  },
  {
    id: 3,
    title: 'Financial Planning Spreadsheet',
    type: 'Excel',
    icon: <FaDownload />
  }
];

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name || 'Restaurant Owner'}!
          </h1>
          <p className="text-gray-600">
            Track your progress and access your learning resources below.
          </p>
        </motion.div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-orange-50 rounded-lg p-6"
          >
            <div className="text-orange-600 mb-2">
              <FaBook className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">4/4</div>
            <div className="text-gray-600">Courses Completed</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-orange-50 rounded-lg p-6"
          >
            <div className="text-orange-600 mb-2">
              <FaChartLine className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">100%</div>
            <div className="text-gray-600">Overall Progress</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-orange-50 rounded-lg p-6"
          >
            <div className="text-orange-600 mb-2">
              <FaUsers className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">20</div>
            <div className="text-gray-600">Modules Completed</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-orange-50 rounded-lg p-6"
          >
            <div className="text-orange-600 mb-2">
              <FaDownload className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{resources.length}</div>
            <div className="text-gray-600">Resources Available</div>
          </motion.div>
        </div>

        {/* Course Progress */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Course Progress</h2>
          <div className="space-y-6">
            {courses.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                      {course.completed && (
                        <FaCheckCircle className="ml-2 text-green-500 w-5 h-5" />
                      )}
                    </div>
                    <p className="text-gray-600 mt-1">{course.description}</p>
                    <div className="text-sm text-gray-500 mt-2">{course.modules} Modules</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-orange-600">{course.progress}%</div>
                    <div className="text-sm text-gray-500">Complete</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-600 rounded-full h-2"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Resources Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="border border-gray-200 rounded-lg p-4 hover:border-orange-500 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                    <div className="text-sm text-gray-500 mt-1">{resource.type}</div>
                  </div>
                  <button
                    className="text-orange-600 hover:text-orange-700 transition-colors duration-200"
                    aria-label={`Download ${resource.title}`}
                  >
                    {resource.icon}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard; 