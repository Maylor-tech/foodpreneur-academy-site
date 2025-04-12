import React from 'react';
import Layout from '../components/Layout';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-orange max-w-none">
          <p className="text-lg text-gray-600 mb-8">
            Last updated: March 21, 2024
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="mb-4">
              FoodPreneur Academy (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information about you when you use our website and services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-medium text-gray-900 mb-3">2.1 Information You Provide</h3>
            <ul className="list-disc pl-6 mb-6">
              <li>Account information (name, email, password)</li>
              <li>Business information (restaurant name, type, location)</li>
              <li>Payment information</li>
              <li>Course progress and completion data</li>
              <li>Communications with us</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 mb-3">2.2 Automatically Collected Information</h3>
            <ul className="list-disc pl-6 mb-6">
              <li>Device and browser information</li>
              <li>IP address and location data</li>
              <li>Usage data and analytics</li>
              <li>Cookies and similar technologies</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Provide and improve our services</li>
              <li>Personalize your experience</li>
              <li>Process your payments</li>
              <li>Send you updates and marketing communications</li>
              <li>Respond to your requests and support needs</li>
              <li>Analyze and improve our platform</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information Sharing</h2>
            <p className="mb-4">We may share your information with:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Service providers who assist in operating our platform</li>
              <li>Payment processors for secure transactions</li>
              <li>Analytics providers to improve our services</li>
              <li>Law enforcement when required by law</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights and Choices</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>Manage cookie preferences</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Contact Us</h2>
            <p className="mb-4">
              If you have questions about this Privacy Policy or our practices, please contact us at:
            </p>
            <p className="mb-4">
              Email: privacy@foodpreneuracademy.com<br />
              Address: [Your Business Address]<br />
              Phone: [Your Phone Number]
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy; 