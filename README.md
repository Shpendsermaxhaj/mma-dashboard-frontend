# MMA Stats Dashboard

A Vue.js dashboard application for visualizing MMA fighter statistics with a clean, responsive interface.

## Features

- Real-time statistics visualization
- Responsive design for mobile and desktop
- Reusable components architecture
- Collapsible sidebar navigation
- Interactive data tables

## Tech Stack

- Vue.js 3 (Composition API)
- Vuetify 3
- Vite
- Axios
- ESLint
- Vitest

## Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── DataTable.vue
│   │   └── StatsCard.vue
│   └── Sidebar/
│       └── Sidebar.vue
├── composables/
│   ├── useFighters.js
│   ├── useScreenSize.js
│   └── useSidebar.js
├── services/
│   └── axios.js
└── views/
    ├── Dashboard.vue
    └── About.vue
```

## Setup and Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/mma-dashboard-frontend.git
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file with:

```
VITE_API_URL=your_api_url
```

4. Run development server:

```bash
npm run dev
```

## Design Decisions

- **Reusable Components**: Created generic DataTable and StatsCard components to maintain DRY principles and ensure consistency
- **Composables**: Extracted common logic into composables for screen size detection and sidebar state management
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Dark Theme**: Enhanced visual appeal and reduced eye strain
- **Performance**: Implemented efficient data fetching and state management

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test:unit` - Run unit tests
- `npm run lint` - Run ESLint

## API Integration

The dashboard connects to a backend API serving MMA fighter statistics. The API endpoints include:

- GET `/users` - Retrieve fighter statistics
