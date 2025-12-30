# MedScheduler - Medical Scheduling Platform

A comprehensive Angular enterprise application for medical scheduling with real-time analytics, user management, and customizable reporting.

![Angular](https://img.shields.io/badge/Angular-17-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![Material](https://img.shields.io/badge/Angular%20Material-17-purple)
![RxJS](https://img.shields.io/badge/RxJS-7.8-pink)

## Features

### Dashboard
- Real-time statistics and KPIs
- Interactive charts (weekly appointments, appointment types)
- Today's schedule overview
- Provider performance metrics

### Calendar
- Monthly calendar view with appointment visualization
- Filter by provider
- Click-to-view daily appointment details
- Color-coded appointment statuses

### Appointments
- Comprehensive appointment management
- Advanced filtering (status, type, search)
- Sortable data table
- Quick status updates
- Virtual visit indicators

### Patients
- Patient profile cards
- Medical history tracking
- Allergy alerts
- Insurance information
- Quick scheduling actions

### Providers
- Provider profiles with credentials
- Availability schedules
- Performance statistics
- Education and certifications

## Tech Stack

- **Framework**: Angular 17 (Standalone Components)
- **UI Library**: Angular Material
- **Styling**: SCSS with CSS Variables
- **Charts**: Chart.js
- **State Management**: RxJS
- **Type Safety**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+
- Angular CLI 17+

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/medical-scheduler.git
cd medical-scheduler
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

4. Open your browser to `http://localhost:4200`

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/      # Dashboard with analytics
│   │   ├── calendar/       # Calendar scheduling view
│   │   ├── appointments/   # Appointments management
│   │   ├── patients/       # Patient management
│   │   └── providers/      # Provider management
│   ├── services/
│   │   └── mock-data.service.ts  # Mock data for demo
│   ├── models/
│   │   └── index.ts        # TypeScript interfaces
│   ├── app.component.ts    # Main app with navigation
│   └── app.routes.ts       # Route configuration
├── styles.scss             # Global styles
└── index.html              # Entry HTML
```

## Key Angular Concepts Demonstrated

- **Standalone Components**: Modern Angular architecture without NgModules
- **Lazy Loading**: Route-based code splitting
- **RxJS Observables**: Reactive data handling
- **Angular Material**: Enterprise-grade UI components
- **TypeScript**: Strong typing with interfaces
- **Responsive Design**: Mobile-first approach

## Screenshots

### Dashboard
Real-time statistics, charts, and today's schedule overview.

### Calendar View
Monthly calendar with appointment visualization and filtering.

### Appointments List
Comprehensive table with search, filter, and sort capabilities.

### Patient Management
Patient cards with medical history and quick actions.

### Provider Profiles
Detailed provider information with credentials and availability.

## Customization

### Theming
Update CSS variables in `styles.scss`:

```scss
:root {
  --primary: #1a365d;
  --primary-light: #2c5282;
  --accent: #10b981;

}
```

### Mock Data
Modify `mock-data.service.ts` to customize:
- Patients
- Providers
- Appointments
- Notifications

## Deployment

Build for production:
```bash
ng build --configuration production
```

Deploy the `dist/medical-scheduler` folder to your hosting provider.

## License

MIT License - feel free to use for personal or commercial projects.

---

Built by Chelsea J. Thompson - Application Developer & Software Engineer
