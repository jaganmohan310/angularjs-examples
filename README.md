# HealthB4U Hospital Management System - Angular Frontend

## 🎯 Project Overview
This is a complete Angular-based Hospital Management System UI, migrated from the original HTML/CSS/JS prototype. The application maintains the classic medical software design while leveraging modern Angular framework capabilities.

## 📋 Migration Status

### ✅ Completed
- **Login Page** - Full authentication UI with HealthB4U branding
- **Main Layout** - Utility bar, module tabs, sidebar navigation
- **Dashboard** - Admission statistics and recent admissions table
- **Registration Form** - Complete patient registration with billing
- **Routing** - Full navigation between all pages
- **Styling** - Classic Windows-style medical software UI preserved

### 🔄 Technology Stack
- **Framework**: Angular 21.1.0
- **Language**: TypeScript 5.9.2
- **Icons**: Phosphor Icons 2.1.2
- **Build Tool**: Angular CLI
- **Package Manager**: npm

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v10 or higher)

### Installation
```bash
cd frontend
npm install
```

### Development Server
```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/`

### Build for Production
```bash
npm run build
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── layout/          # Main app layout with nav
│   │   │   ├── header/          # (Reserved for future)
│   │   │   └── sidebar/         # (Reserved for future)
│   │   ├── pages/
│   │   │   ├── login/           # Login page
│   │   │   ├── dashboard/       # Admission statistics
│   │   │   └── registration/    # Patient registration
│   │   ├── services/
│   │   │   └── auth.ts          # Authentication service
│   │   ├── shared-forms.css     # Shared form styles
│   │   ├── app.routes.ts        # Routing configuration
│   │   └── app.ts               # Root component
│   ├── styles.css               # Global styles
│   └── index.html               # Main HTML file
└── package.json
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#5D9CEC`
- **Dark Blue**: `#4A89DC`
- **Navy**: `#1D426E`
- **Utility Background**: `#EAEAEA`
- **Content Background**: `#FFFFFF`
- **Border**: `#CCCCCC`

### UI Components
- Classic Windows-style buttons and forms
- Dense grid layouts for medical data entry
- Professional table designs
- Gradient utility bars and toolbars

## 📱 Features

### Current Modules
1. **In-Patient Module** (Active)
   - Admission Statistics Dashboard
   - Patient Registration
   - Consultation Cancellation (Placeholder)
   - In-Patient List (Placeholder)
   - Procedure Management (Placeholder)
   - Accounting (Placeholder)
   - Discharge Summary (Placeholder)

2. **Other Modules** (Placeholders)
   - App Management
   - Out Patient
   - Soft Lab
   - Accounting
   - Reports
   - Radiology

## 🔐 Authentication
- Simple username-based login (prototype)
- Default username: `MADAVI`
- Ready for backend integration

## 🛣️ Routes
- `/login` - Login page
- `/dashboard` - Admission statistics
- `/admission` or `/registration` - Patient registration form
- `/cancellation` - Consultation cancellation
- `/patients` - In-patient list
- `/procedure` - Procedure management
- `/billing` - Accounting
- `/discharge` - Discharge summary

## 🔧 Next Steps

### Backend Integration (Spring Boot + Jetty + Maven)
1. Create REST API endpoints
2. Implement JWT authentication
3. Connect to database (MySQL/PostgreSQL)
4. Add form validation and error handling
5. Implement real-time updates

### Additional Features
- Complete all placeholder pages
- Add form validation
- Implement search functionality
- Add print functionality
- Create reports module
- Add user management
- Implement role-based access control

## 📝 Notes
- Original HTML/CSS/JS prototype has been removed
- All functionality migrated to Angular components
- Maintains exact same UI/UX as original design
- Ready for backend integration with Spring Boot

## 👨‍💻 Development Guidelines
1. Follow Angular style guide
2. Use TypeScript strict mode
3. Maintain component-based architecture
4. Keep styles modular and reusable
5. Document complex logic

## 🐛 Known Issues
- Some pages are placeholders (using Dashboard component)
- Forms don't have validation yet
- No backend integration
- No data persistence

## 📞 Support
For issues or questions, refer to the Angular documentation:
- [Angular Docs](https://angular.dev)
- [Angular CLI](https://angular.dev/tools/cli)

---

**Version**: 1.0.0  
**Last Updated**: February 4, 2026  
**Status**: Prototype UI Complete - Ready for Backend Integration
