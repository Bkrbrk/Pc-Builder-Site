# PC Builder - Compatibility Checker

A comprehensive web application for searching PC components, building custom configurations, and verifying compatibility between selected parts.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Documentation](#documentation)
- [License](#license)

## 🎯 Project Overview

PC Builder is designed to help users make informed decisions when building a PC. The application allows users to:

1. **Search** for PC components across multiple sources
2. **Select and organize** parts into temporary builds
3. **Check compatibility** automatically between selected components
4. **Save builds** locally for future reference
5. **Get recommendations** for compatible alternatives

This eliminates confusion and prevents costly mistakes when building a PC by ensuring all components work together seamlessly.

## ✨ Features

### MVP Features
- Component search functionality
- Part information display with detailed specifications
- Build creation and management
- Build storage and retrieval
- Basic compatibility checking engine
- Component categorization (CPU, GPU, RAM, PSU, Motherboard, Storage, Cooler, Case)
- Local storage for builds

### Planned Features (Phase 2)
- User authentication and profiles
- Cloud save for builds
- Build sharing with community
- Advanced filtering and sorting
- Price comparison across retailers
- Component reviews and ratings

### Advanced Features (Phase 3)
- AI-powered build recommendations
- Budget optimization suggestions
- Power consumption predictions
- Community builds showcase
- Real-time part availability tracking

## 🛠 Technology Stack

### Frontend
- **Framework**: React 18+
- **Build Tool**: Vite (Fast bundler)
- **Styling**: CSS3
- **Language**: JavaScript (ES6+)
- **Storage**: Browser LocalStorage
- **State Management**: React Context API / Redux (TBD)

### Backend
- **Runtime**: Node.js 16+
- **Framework**: Express.js
- **Language**: JavaScript (ES6+)
- **Database**: PostgreSQL or MongoDB (TBD)
- **Caching**: Redis or In-memory cache (TBD)
- **API Documentation**: OpenAPI/Swagger (TBD)

### DevOps
- **Version Control**: Git & GitHub
- **Package Manager**: npm
- **Environment**: .env configuration
- **Code Quality**: ESLint (TBD)
- **Testing**: Jest / Vitest (TBD)

## 📁 Project Structure

```
pc-builder/
│
├── frontend/                           # React + Vite frontend
│   ├── public/
│   │   └── favicon.svg                # Site icon
│   ├── src/
│   │   ├── components/                # Reusable React components
│   │   │   ├── SearchBar.jsx          # Search input & filters
│   │   │   ├── SearchResults.jsx      # Display search results
│   │   │   ├── PartCard.jsx           # Individual part card
│   │   │   ├── BuildList.jsx          # Current build display
│   │   │   └── CompatibilityPanel.jsx # Compatibility results
│   │   ├── pages/
│   │   │   └── Home.jsx               # Main page
│   │   ├── services/
│   │   │   └── api.js                 # API communication
│   │   ├── utils/
│   │   │   ├── compatibility.js       # Compatibility helpers
│   │   │   └── partClassifier.js      # Part classification
│   │   ├── storage/
│   │   │   └── buildStorage.js        # LocalStorage management
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   └── package.json
│
├── backend/                            # Express.js API
│   ├── src/
│   │   ├── routes/                    # API endpoints
│   │   │   ├── search.routes.js       # Search endpoints
│   │   │   ├── parts.routes.js        # Parts CRUD
│   │   │   └── compatibility.routes.js # Compatibility check
│   │   ├── controllers/               # Request handlers
│   │   │   ├── search.controller.js
│   │   │   ├── parts.controller.js
│   │   │   └── compatibility.controller.js
│   │   ├── services/                  # Business logic
│   │   │   ├── searchProvider.service.js      # External search
│   │   │   ├── specExtractor.service.js       # Spec extraction
│   │   │   ├── compatibilityEngine.service.js # Core validation
│   │   │   └── cache.service.js               # Caching
│   │   ├── utils/                     # Helpers
│   │   │   ├── normalizeProduct.js    # Data normalization
│   │   │   └── parseSpecs.js          # Spec parsing
│   │   ├── config/
│   │   │   └── env.js                 # Config management
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
├── docs/                              # Documentation
│   ├── project-plan.md                # Development roadmap
│   ├── data-flow.md                   # Data flow diagrams
│   ├── compatibility-rules.md         # Validation rules
│   └── api-endpoints.md               # API documentation
│
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16 or higher
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Bkrbrk/Pc-Builder-Site.git
   cd Pc-Builder-Site
   ```

2. **Install dependencies**
   ```bash
   npm install
   npm install --prefix frontend
   npm install --prefix backend
   ```

3. **Configure environment**
   ```bash
   cp backend/.env.example backend/.env
   # Edit backend/.env with your settings
   ```

## 💻 Development

### Run Development Servers

**Both frontend and backend:**
```bash
npm run dev
```

**Frontend only** (http://localhost:5173):
```bash
cd frontend && npm run dev
```

**Backend only** (http://localhost:3000):
```bash
cd backend && npm run dev
```

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## 📚 Documentation

Comprehensive documentation is available in the `docs/` directory:

### [Project Plan](./docs/project-plan.md)
Development roadmap, phases, timeline, and deliverables

### [Data Flow](./docs/data-flow.md)
User workflows, API interactions, and data flow diagrams

### [Compatibility Rules](./docs/compatibility-rules.md)
Validation rules for component compatibility checking

### [API Endpoints](./docs/api-endpoints.md)
Complete API reference and documentation

## 🔧 Key Concepts

### Component Categories

- **CPU**: Processor (Intel/AMD)
- **Motherboard**: Main circuit board
- **RAM**: Memory modules
- **GPU**: Graphics card
- **PSU**: Power supply unit
- **Storage**: SSD/HDD drives
- **Cooler**: CPU/case cooling
- **Case**: Computer chassis

### Build Workflow

1. User searches for components
2. Selects parts from results
3. Parts added to current build
4. Build saved to localStorage
5. Compatibility check triggered
6. System validates all rules
7. Results shown with errors/warnings
8. User modifies or saves build

### Compatibility Status

- **✅ Compatible**: All validation passes
- **⚠️ Warning**: Works but suboptimal
- **❌ Error**: Won't work/incompatible

## 📅 Development Phases

### Phase 1: MVP (Weeks 1-8)
- Basic UI implementation
- Search functionality
- Local storage
- Compatibility engine

### Phase 2: Enhancement (Weeks 9-16)
- User authentication
- Cloud storage
- Advanced features
- Build sharing

### Phase 3: Advanced (Weeks 17+)
- AI recommendations
- Community features
- Analytics

## 📝 Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes and test
3. Commit with clear messages
4. Push and create Pull Request

## ⚖️ License

MIT License - See LICENSE file

## 👤 Author

**Bkrbrk**

---

**Status**: 🚀 Project skeleton ready - Development phase 1 starting  
**Last Updated**: June 27, 2026
