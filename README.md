# MMA Dashboard Frontend

A Vue.js dashboard application that displays MMA fighter statistics and profiles.

## Features

- Dashboard view with summary statistics
- Fighter profiles with detailed stats
- Searchable fighter database
- Responsive design for mobile and desktop

## Tech Stack

- Vue 3 (Composition API)
- Vuetify 3 for UI components
- Vite as build tool
- Axios for API communication
- Vue Router for navigation

## Project Structure

```
src/
├── api/               # API endpoints organized by resource
├── components/        # Reusable Vue components
├── composables/       # Shared composition functions
├── router/            # Vue Router configuration
├── services/          # Core services (e.g. axios instance)
├── views/             # Page components
└── App.vue            # Root component
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/mma-dashboard-frontend.git
cd mma-dashboard-frontend
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the project root with:

```
VITE_API_URL=http://localhost:3000
```

4. Start the development server

```bash
npm run dev
```

5. Build for production

```bash
npm run build
```

## Architecture

This project uses Vue 3's Composition API to organize code by logical concerns:

- **Composables**: Business logic is extracted into reusable functions like `useFighters` and `useDebounce`
- **Components**: UI is broken down into reusable components like `FighterDetail`
- **Views**: Page-level components that compose smaller components
- **API**: HTTP requests are organized by resource type

## License

Made with ❤️ by Shpend Sermaxhaj
