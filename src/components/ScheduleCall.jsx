import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, addDays, startOfWeek, addWeeks, isSameDay } from 'date-fns';

// Available time slots (in 24-hour format)
const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'
];

const ScheduleCall = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    restaurantName: '',
    topic: 'general'
  });
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  // Generate week days
  const weekDays = [...Array(7)].map((_, index) => addDays(currentWeekStart, index));

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    setStatus({ loading: true, success: false, error: null });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would typically send the data to your backend
      // const response = await fetch('/api/schedule-call', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     ...formData,
      //     date: selectedDate,
      //     time: selectedTime
      //   })
      // });

      setStatus({ loading: false, success: true, error: null });
    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        error: 'Failed to schedule call. Please try again later.'
      });
    }
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
            Schedule a Free Consultation
          </h2>
          <p className="text-lg text-gray-600">
            Book a call with our restaurant business experts to discuss your goals and challenges
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {status.success ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-5xl mb-4 text-green-500"
              >
                ✓
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">Call Scheduled!</h3>
              <p className="text-gray-600 mb-6">
                We&apos;ve sent you a calendar invitation for {format(selectedDate, 'MMMM d, yyyy')} at {selectedTime}.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setStatus({ loading: false, success: false, error: null });
                  setSelectedDate(null);
                  setSelectedTime(null);
                }}
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200"
              >
                Schedule Another Call
              </motion.button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Calendar Section */}
              <div className="calendar-section">
                <h3 className="text-lg font-semibold mb-4">Select a Date</h3>
                <div className="flex justify-between items-center mb-4">
                  <button
                    onClick={() => setCurrentWeekStart(prev => addWeeks(prev, -1))}
                    className="text-gray-600 hover:text-orange-600"
                  >
                    ← Previous Week
                  </button>
                  <button
                    onClick={() => setCurrentWeekStart(prev => addWeeks(prev, 1))}
                    className="text-gray-600 hover:text-orange-600"
                  >
                    Next Week →
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {weekDays.map((date) => (
                    <motion.button
                      key={date.toString()}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDateSelect(date)}
                      className={`p-4 rounded-lg text-center transition-colors duration-200 ${
                        selectedDate && isSameDay(date, selectedDate)
                          ? 'bg-orange-600 text-white'
                          : 'hover:bg-orange-50'
                      }`}
                    >
                      <div className="text-sm mb-1">{format(date, 'EEE')}</div>
                      <div className="font-semibold">{format(date, 'd')}</div>
                    </motion.button>
                  ))}
                </div>

                {selectedDate && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6"
                  >
                    <h3 className="text-lg font-semibold mb-4">Select a Time</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {TIME_SLOTS.map((time) => (
                        <motion.button
                          key={time}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleTimeSelect(time)}
                          className={`p-3 rounded-lg text-center transition-colors duration-200 ${
                            time === selectedTime
                              ? 'bg-orange-600 text-white'
                              : 'hover:bg-orange-50'
                          }`}
                        >
                          {time}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Form Section */}
              <div className="form-section">
                <h3 className="text-lg font-semibold mb-4">Your Information</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Restaurant Name
                    </label>
                    <input
                      type="text"
                      name="restaurantName"
                      value={formData.restaurantName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Discussion Topic <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="topic"
                      value={formData.topic}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="general">General Consultation</option>
                      <option value="courses">Course Information</option>
                      <option value="custom">Custom Training Program</option>
                      <option value="pricing">Pricing & Packages</option>
                    </select>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={!selectedDate || !selectedTime || status.loading}
                    whileHover={!status.loading && { scale: 1.02 }}
                    whileTap={!status.loading && { scale: 0.98 }}
                    className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                  >
                    {status.loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Scheduling...
                      </>
                    ) : (
                      'Schedule Call'
                    )}
                  </motion.button>

                  <AnimatePresence>
                    {status.error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-600 text-sm mt-2"
                      >
                        {status.error}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default ScheduleCall; 