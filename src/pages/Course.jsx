import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../services/firebase';

function Course() {
  const { user } = useAuth();
  const [completedModules, setCompletedModules] = useState([]);
  const [loading, setLoading] = useState(true);

  const modules = [
    {
      id: 1,
      title: 'Validate Your Idea',
      description: 'Test and validate your food business concept',
      content: `Learn how to validate your food business idea before investing time and money:
        • Market research techniques
        • Competitor analysis
        • Target customer interviews
        • Minimum viable product testing
        • Cost analysis basics`,
      resources: ['Market Research Template', 'Competitor Analysis Worksheet']
    },
    {
      id: 2,
      title: 'Brand + Plan',
      description: 'Create your brand identity and business plan',
      content: `Develop your brand identity and create a solid business plan:
        • Brand story development
        • Visual identity basics
        • Business plan essentials
        • Financial projections
        • Marketing strategy outline`,
      resources: ['Business Plan Template', 'Brand Guidelines Template']
    },
    {
      id: 3,
      title: 'Kitchen Setup',
      description: 'Essential equipment and kitchen organization',
      content: `Set up an efficient commercial kitchen operation:
        • Essential equipment list
        • Kitchen layout optimization
        • Food safety requirements
        • Inventory management system
        • Workflow optimization`,
      resources: ['Kitchen Equipment Checklist', 'Layout Planning Guide']
    },
    {
      id: 4,
      title: 'Legal Basics',
      description: 'Permits, licenses, and food safety regulations',
      content: `Navigate legal requirements for your food business:
        • Business registration
        • Food handler certification
        • Health department permits
        • Insurance requirements
        • Food safety regulations`,
      resources: ['Legal Requirements Checklist', 'Food Safety Guidelines']
    },
    {
      id: 5,
      title: 'Pricing + Packaging',
      description: 'Calculate costs and design packaging',
      content: `Develop pricing strategies and packaging solutions:
        • Cost calculation methods
        • Pricing strategy development
        • Packaging requirements
        • Label design basics
        • Inventory management`,
      resources: ['Pricing Calculator', 'Packaging Design Guide']
    },
    {
      id: 6,
      title: 'Selling Online or at Markets',
      description: 'Set up your sales channels',
      content: `Establish your sales presence online and at markets:
        • E-commerce platform setup
        • Food market applications
        • Order management systems
        • Payment processing
        • Delivery logistics`,
      resources: ['Online Sales Setup Guide', 'Market Vendor Checklist']
    },
    {
      id: 7,
      title: 'Easy Marketing',
      description: 'Marketing strategies for food businesses',
      content: `Implement effective marketing strategies:
        • Social media marketing
        • Food photography basics
        • Email marketing setup
        • Local SEO optimization
        • Customer retention tactics`,
      resources: ['Marketing Plan Template', 'Social Media Calendar']
    },
    {
      id: 8,
      title: 'Launch Day',
      description: 'Prepare for your grand opening',
      content: `Plan and execute a successful launch:
        • Launch timeline planning
        • Promotion strategy
        • Event planning basics
        • Press release writing
        • Customer feedback system`,
      resources: ['Launch Checklist', 'Press Release Template']
    }
  ];

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setCompletedModules(userData.completedModules || []);
        }
      } catch (error) {
        console.error('Error fetching progress:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProgress();
    }
  }, [user]);

  const handleModuleCompletion = async (moduleId) => {
    try {
      const userRef = doc(db, 'users', user.uid);
      if (completedModules.includes(moduleId)) {
        await updateDoc(userRef, {
          completedModules: arrayRemove(moduleId)
        });
        setCompletedModules(completedModules.filter(id => id !== moduleId));
      } else {
        await updateDoc(userRef, {
          completedModules: arrayUnion(moduleId)
        });
        setCompletedModules([...completedModules, moduleId]);
      }
    } catch (error) {
      console.error('Error updating module completion:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Course Modules</h1>
        
        <div className="space-y-8">
          {modules.map((module) => (
            <div
              key={module.id}
              id={`module-${module.id}`}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {module.title}
                  </h2>
                  <button
                    onClick={() => handleModuleCompletion(module.id)}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      completedModules.includes(module.id)
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                    }`}
                  >
                    {completedModules.includes(module.id) ? 'Completed' : 'Mark as Complete'}
                  </button>
                </div>
                
                <p className="mt-2 text-gray-600">{module.description}</p>
                
                <div className="mt-4 bg-gray-50 rounded-md p-4">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700">
                    {module.content}
                  </pre>
                </div>

                <div className="mt-4">
                  <h3 className="font-medium text-gray-900">Resources</h3>
                  <ul className="mt-2 space-y-2">
                    {module.resources.map((resource, index) => (
                      <li key={index}>
                        <a
                          href="#"
                          className="text-orange-600 hover:text-orange-800 text-sm flex items-center"
                        >
                          <svg
                            className="h-4 w-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {resource}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Course; 