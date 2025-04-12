import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { initializeUserProgress, markModuleAsComplete, getUserProgress } from '../firebase/moduleService';

// Motivational quotes for restaurant owners
const quotes = [
  "The best way to predict the future is to create it.",
  "Success in restaurant business is a marathon, not a sprint.",
  "Great food is not just about recipes—it's about stories.",
  "Every great restaurant started with a single customer.",
  "Quality is not an act, it's a habit."
];

// Module data
const modules = [
  { id: 'module1', title: 'Introduction to Restaurant Management' },
  { id: 'module2', title: 'Business Planning Fundamentals' },
  { id: 'module3', title: 'Kitchen Setup & Costs' },
  { id: 'module4', title: 'Menu Planning & Pricing' },
  { id: 'module5', title: 'Staff Management' },
  { id: 'module6', title: 'Marketing Essentials' },
  { id: 'module7', title: 'Financial Management' },
  { id: 'module8', title: 'Growth Strategies' }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  const [completedModules, setCompletedModules] = useState([]);
  const [totalProgress, setTotalProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchUserProgress = async () => {
      try {
        await initializeUserProgress(user.uid);
        const progress = await getUserProgress(user.uid);
        setCompletedModules(progress.completedModules);
        setTotalProgress(progress.totalProgress);
      } catch (error) {
        console.error('Error fetching user progress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProgress();
  }, [navigate, user]);

  const handleModuleComplete = async (moduleId) => {
    try {
      const updatedModules = await markModuleAsComplete(user.uid, moduleId);
      const progress = await getUserProgress(user.uid);
      setCompletedModules(updatedModules);
      setTotalProgress(progress.totalProgress);
    } catch (error) {
      console.error('Error marking module as complete:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Greeting Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16 shadow-xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-4xl font-bold flex items-center"
            >
              <motion.span
                animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ duration: 1.5, delay: 1, repeat: Infinity, repeatDelay: 5 }}
                className="mr-4 text-5xl"
              >
                👋
              </motion.span>
              Welcome back, {user.email?.split('@')[0]}!
            </motion.div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-orange-50 font-medium"
            >
              {randomQuote}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3 text-sm shadow-lg hover:bg-white/25 transition-all duration-200 cursor-pointer"
            >
              <span className="animate-pulse text-xl">🎯</span>
              <span className="font-medium">Your progress: {totalProgress}% complete</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Course Progress Tracker */}
            <div className="bg-white rounded-xl shadow-lg p-8 col-span-1 md:col-span-2 lg:col-span-2 hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Course Progress 📊</h2>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                  {completedModules.length} of {modules.length} modules completed
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                <motion.div 
                  className="bg-orange-600 h-3 rounded-full transition-all duration-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${totalProgress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                ></motion.div>
              </div>
              <div className="space-y-4 mt-6">
                {modules.map((module) => (
                  <div 
                    key={module.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <span className="font-medium text-gray-900">{module.title}</span>
                    {completedModules.includes(module.id) ? (
                      <span className="text-green-600 font-medium flex items-center">
                        <span className="mr-2">Completed</span>
                        <span>✅</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleModuleComplete(module.id)}
                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200"
                      >
                        Mark Complete
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Access Buttons */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Access 🎓</h2>
              <div className="space-y-4">
                <button className="w-full bg-orange-600 text-white px-6 py-4 rounded-xl hover:bg-orange-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center font-medium shadow-md hover:shadow-xl">
                  <span className="mr-3 text-xl">▶️</span> Resume Course
                </button>
                <button className="w-full bg-blue-600 text-white px-6 py-4 rounded-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center font-medium shadow-md hover:shadow-xl">
                  <span className="mr-3 text-xl">📦</span> Download Free Kit
                </button>
                <button className="w-full bg-green-600 text-white px-6 py-4 rounded-xl hover:bg-green-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center font-medium shadow-md hover:shadow-xl">
                  <span className="mr-3 text-xl">📅</span> Join Next Webinar
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 