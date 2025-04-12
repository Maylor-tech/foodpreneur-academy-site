import React from 'react';
import Layout from '../components/Layout';

const TermsOfService = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="prose prose-orange max-w-none">
          <p className="text-lg text-gray-600 mb-8">
            Last updated: March 21, 2024
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p className="mb-4">
              By accessing or using FoodPreneur Academy (&quot;the Platform&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Platform.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Services</h2>
            <p className="mb-4">
              FoodPreneur Academy provides online educational content, resources, and training materials for restaurant owners and managers. Our services include:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Online courses and training modules</li>
              <li>Downloadable resources and templates</li>
              <li>Community features and discussion forums</li>
              <li>Progress tracking and certification</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
            <p className="mb-4">To access certain features, you must create an account. You agree to:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized access</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Payment Terms</h2>
            <p className="mb-4">
              Certain services require payment. By making a purchase, you agree to:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Provide valid payment information</li>
              <li>Pay all fees and charges incurred</li>
              <li>Accept our refund and cancellation policies</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Intellectual Property</h2>
            <p className="mb-4">
              All content on the Platform is protected by copyright and other intellectual property rights. You may not:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Copy or reproduce any content without permission</li>
              <li>Distribute or share access to course materials</li>
              <li>Modify or create derivative works</li>
              <li>Use content for commercial purposes</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. User Conduct</h2>
            <p className="mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Violate any laws or regulations</li>
              <li>Interfere with other users&apos; access</li>
              <li>Upload harmful content or malware</li>
              <li>Impersonate others or misrepresent your affiliation</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
            <p className="mb-4">
              FoodPreneur Academy is provided &quot;as is&quot; without warranties. We are not liable for:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Service interruptions or errors</li>
              <li>Data loss or security breaches</li>
              <li>Direct or indirect damages</li>
              <li>Business losses or opportunities</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of the Platform constitutes acceptance of new terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Information</h2>
            <p className="mb-4">
              For questions about these Terms, please contact us at:
            </p>
            <p className="mb-4">
              Email: legal@foodpreneuracademy.com<br />
              Address: [Your Business Address]<br />
              Phone: [Your Phone Number]
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfService; 