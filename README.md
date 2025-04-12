# FoodPreneur Academy

A comprehensive online learning platform for independent restaurant owners and food entrepreneurs. This platform provides structured courses, resources, and tools to help you start and grow your food business.

## Features

- User authentication with email and Google sign-in
- Interactive course modules with progress tracking
- Downloadable resources and templates
- Newsletter subscription
- Mobile-responsive design
- User profile and settings management

## Tech Stack

- React 18
- Firebase (Authentication & Firestore)
- Tailwind CSS
- Brevo (Sendinblue) for email marketing
- Vite for build tooling

## Prerequisites

- Node.js 16+ and npm
- Firebase account
- Brevo (Sendinblue) account

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/foodpreneur-academy.git
   cd foodpreneur-academy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your Firebase and Brevo credentials.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── auth/          # Authentication components
│   ├── course/        # Course-related components
│   ├── dashboard/     # Dashboard components
│   └── layout/        # Layout components
├── pages/             # Page components
├── hooks/             # Custom React hooks
├── services/          # API services
└── styles/            # CSS styles
```

## Firebase Setup

1. Create a new Firebase project
2. Enable Authentication (Email/Password and Google)
3. Create a Firestore database
4. Add your Firebase configuration to `.env`

## Brevo (Sendinblue) Setup

1. Create a Brevo account
2. Generate an API key
3. Create a contact list
4. Add your Brevo configuration to `.env`

## Environment Variables Setup

1. Copy the `.env.example` file to create your own `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Fill in your actual API keys and configuration values in the `.env` file:
   - Firebase configuration from your Firebase Console
   - Stripe API keys from your Stripe Dashboard
   - Mailchimp API key from your Mailchimp account

3. Important: Never commit your `.env` file to version control. The `.gitignore` file is configured to prevent this.

4. For deployment:
   - Set up environment variables in your hosting platform (e.g., Vercel, Netlify, Heroku)
   - Use the same variable names as in `.env.example`
   - Keep your production API keys secure and separate from development keys

5. The application will validate required environment variables on startup and throw an error if any are missing.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Building for Production

1. Ensure all environment variables are set:
   ```bash
   cp .env.example .env
   # Edit .env with production values
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the application:
   ```bash
   npm run build
   ```
   This will create a production-ready build in the `/build` directory with:
   - Minified JavaScript and CSS
   - Optimized assets
   - Removed console logs and debugger statements
   - Code splitting for better performance
   - Source maps disabled for production

4. Preview the production build locally:
   ```bash
   npm run preview
   ```

5. Deploy the contents of the `/build` directory to your hosting platform.

## Production Optimization Features

- **Code Splitting**: Automatic chunking of vendor and application code
- **Asset Optimization**: Minified and compressed JavaScript, CSS, and images
- **Tree Shaking**: Unused code is removed from the final bundle
- **Browser Compatibility**: Production build targets modern browsers with fallbacks
- **Performance**: Optimized loading with preload hints and efficient caching 