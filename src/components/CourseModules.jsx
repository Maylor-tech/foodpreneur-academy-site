import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { updateModuleCompletion, getModuleProgress } from '../firebase/moduleService';

const modules = [
  {
    id: 1,
    title: 'Validate Your Idea',
    description: 'Test and validate your food business concept',
    downloadUrl: '/resources/module1-guide.pdf'
  },
  {
    id: 'module2',
    title: 'Business Planning Fundamentals',
    description: 'Master the essentials of business planning, from market analysis to financial projections for your restaurant.',
    downloadUrl: '/resources/module2-guide.pdf'
  },
  {
    id: 'module3',
    title: 'Kitchen Setup & Costs',
    description: 'Understand kitchen layout optimization, equipment selection, and cost management strategies.',
    downloadUrl: '/resources/module3-guide.pdf'
  },
  {
    id: 'module4',
    title: 'Menu Planning & Pricing',
    description: 'Learn effective menu engineering, pricing strategies, and food cost optimization techniques.',
    downloadUrl: '/resources/module4-guide.pdf'
  },
  {
    id: 'module5',
    title: 'Staff Management',
    description: 'Master hiring, training, and team management practices specific to the restaurant industry.',
    downloadUrl: '/resources/module5-guide.pdf'
  },
  {
    id: 'module6',
    title: 'Marketing Essentials',
    description: 'Discover practical marketing strategies to attract and retain customers in the digital age.',
    downloadUrl: '/resources/module6-guide.pdf'
  },
  {
    id: 'module7',
    title: 'Financial Management',
    description: 'Learn essential financial skills including budgeting, cash flow management, and profit optimization.',
    downloadUrl: '/resources/module7-guide.pdf'
  },
  {
    id: 'module8',
    title: 'Growth Strategies',
    description: 'Explore expansion strategies, multiple location management, and scaling your restaurant business.',
    downloadUrl: '/resources/module8-guide.pdf'
  }
];

const CourseModules = () => {
  const [moduleProgress, setModuleProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        if (!user?.uid) return;
        const progress = await getModuleProgress(user.uid);
        setModuleProgress(progress);
      } catch (error) {
        console.error('Error fetching user progress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProgress();
  }, [user]);

  const handleMarkComplete = async (moduleId) => {
    try {
      if (!user?.uid) return;
      
      const isCurrentlyComplete = moduleProgress[`module_${moduleId}`];
      await updateModuleCompletion(user.uid, moduleId, !isCurrentlyComplete);
      
      setModuleProgress(prev => ({
        ...prev,
        [`module_${moduleId}`]: !isCurrentlyComplete
      }));
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Course Modules</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {modules.map((module) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{module.title}</h3>
            <p className="text-gray-600 mb-6">{module.description}</p>
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleMarkComplete(module.id)}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 flex items-center ${
                  moduleProgress[`module_${module.id}`]
                    ? 'bg-green-100 text-green-700'
                    : 'bg-orange-600 text-white hover:bg-orange-700'
                }`}
              >
                {moduleProgress[`module_${module.id}`] ? (
                  <>
                    <span className="mr-2">✓</span>
                    Completed
                  </>
                ) : (
                  'Mark Complete'
                )}
              </button>
              <a
                href={module.downloadUrl}
                className="text-orange-600 hover:text-orange-700 font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Resources
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CourseModules; 