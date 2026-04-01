# FinDash: Modern Finance Dashboard UI

A robust, enterprise-grade mock finance dashboard showcasing modern frontend engineering patterns. Built from scratch with React, Vite, Tailwind CSS, Zustand, and Recharts, this application demonstrates comprehensive UI/UX development via modular components, data persistence, and performant state orchestration.

## 🚀 Key Features

### 1. Dashboard & Recharts Visualizations
- **Summary Metrics**: Overview cards indicating real-time cumulative Account Balance, Total Income, and Total Expenses with intuitive up/down trend iconography.
- **Balance Trend Analysis**: A responsive, full-width `LineChart` interpolating the chronological history of the user's spending habits to formulate a clear timeline dataset.
- **Expenses By Category**: A clean Donut PieChart visualizing expenditure allocation featuring dynamic explicit percentage labels embedded within a responsive, formatted Custom Legend.

### 2. Intelligent Insights Engine
- Generates algorithmic readouts comparing datasets contextually.
- Calculates and presents actionable metrics like **Savings Rate Health** (>20% targeting), **Average Daily Spend**, and explicitly surfacing the **Largest Single Expense** creating budget drag.

### 3. Comprehensive Transactions Hub
- Searchable data-grid containing individual transaction ledgers.
- Extensively filtered by active search-string matching and Income/Expense gating inputs.
- Natively exports the currently active/filtered data-grid view into a valid `.csv` payload strictly bound to user contexts.

### 4. Advanced Component Architecture & State Management
- **Simulated Role Security**: Instant toggling between generic "Viewer" capabilities and strict "Admin" capabilities (un-gating Add/Edit/Delete transaction mutations).
- **Dark Mode**: Tailored dark-mode mappings configured across Tailwind configurations, dynamically switching chart axes, select dropdowns, and tooltip contrast rendering.
- **Mock API Latency**: Seamlessly interacts with `localStorage` wrapped explicitly in randomized `setTimeout` delays to mirror real-world REST operations testing component `isLoading` lifecycle `<Skeleton>` handlers.
- **Tabbed Layout Navigation**: Custom-built reactive Sidebar converting conditionally into a bottom-bar on mobile to strictly partition component loads between Dashboard, Transactions, and Insight hubs leveraging the Zustand global store.

## 🛠️ Technology Stack
- **Framework**: React 18 + TypeScript + Vite.
- **Global Data State**: Zustand (Slim, un-opinionated state orchestration).
- **Styling**: Tailwind CSS (Custom semantic variants leveraging `clsx` and `tailwind-merge`).
- **Visualization**: Recharts (Responsive, accessible SVG rendering).
- **Icons**: Lucide React.
- **Date Manipulation**: Date-Fns.

## 🚦 Local Setup & Installation Instructions

Ensure you have **Node.js (v18.0.0 or higher)** installed on your system.

1. **Navigate to the core project directory:**
   ```bash
   cd zorvyn-assessment
   ```

2. **Install the required package dependencies:**
   ```bash
   npm install
   ```
   *(This downloads React, Vite, Recharts, TailwindCSS, etc., as specified within `package.json`)*

3. **Start the Vite Development Server:**
   ```bash
   npm run dev
   ```

4. **View the Dashboard:**
   Vite will automatically bind the app to `http://localhost:5173` (or the next available port). Open that URL in your browser to begin interaction!

## 🧠 Architectural Approach & Design Philosophy

The core task required building a complex application relying strictly on *Frontend-only constraints* while keeping operations modular and hyper-scalable.

**Decoupled State Orchestration**
Instead of nesting highly-coupled React states arbitrarily inside deeply wrapped Prop-drilled trees, I opted for **Zustand**. The `<Sidebar/>` strictly updates a unified `activePage` cursor string inside `useFinanceStore.ts` bridging all layout interaction contexts cleanly alongside the simulated backend data calls.

**Atomic Component Reusability**
Instead of directly writing Tailwind layouts arbitrarily inside the main business-logic views, specific UI primitives (`src/components/shared/Button.tsx`, `Card.tsx`, `Input.tsx`, `Select.tsx`, `Modal.tsx`) were heavily extracted. This design choice mimics best-practice enterprise Library patterns ensuring complex composed nodes (like `TransactionsTable.tsx`) scale rapidly without visual code-bloat.

**Data Persistence**
Because the UX requirement requested actual mock-changes (Add/Edit/Delete capabilities) without a backend, the `src/api/mockApi.ts` abstracts asynchronous promise chains parsing and setting strictly into `localStorage`. The application survives browser refreshes identically to standard DB-oriented platforms.
