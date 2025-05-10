# Sports Betting Application

A modern sports betting application built with React, TypeScript, and Firebase.

## Features

- **Bet Bulletin**
  - List and search betting events
  - View detailed odds for each event
- **Bet Basket**
  - Add bets to cart
  - Remove bets from cart
  - View total stake and potential winnings
- **Firebase Integration**
  - User authentication
  - Analytics tracking for key events

## Tech Stack

- React 18
- TypeScript
- Redux Toolkit for state management
- React Router for navigation
- Firebase for authentication and analytics
- Framer Motion for animations
- Axios for API calls
- Tailwind CSS for styling

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sports-app.git
cd sports-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Firebase configuration:
```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
REACT_APP_API_BASE_URL=your_api_base_url
```

4. Start the development server:
```bash
npm start
```

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── features/       # Feature-specific components and logic
  ├── layouts/        # Layout components
  ├── services/       # API and Firebase services
  ├── store/          # Redux store configuration
  ├── types/          # TypeScript type definitions
  ├── utils/          # Utility functions
  └── App.tsx         # Root component
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
