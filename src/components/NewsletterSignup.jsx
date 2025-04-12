import { useState } from 'react';
import { motion } from 'framer-motion';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': process.env.VITE_BREVO_API_KEY
        },
        body: JSON.stringify({
          email,
          listIds: [parseInt(process.env.VITE_BREVO_LIST_ID)],
          updateEnabled: true
        })
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Thank you for subscribing to our newsletter!');
        setEmail('');
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      setStatus('error');
      setMessage(error.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-orange-50 p-8 rounded-xl shadow-lg max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h2>
      <p className="text-gray-600 mb-6">
        Get the latest restaurant management tips and exclusive resources delivered to your inbox.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={status === 'loading'}
          className={`w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors duration-200 ${
            status === 'loading' ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {status === 'loading' ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Subscribe to Newsletter'
          )}
        </button>
        
        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-sm ${
              status === 'success' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </motion.p>
        )}
      </form>
    </motion.div>
  );
};

export default NewsletterSignup; 