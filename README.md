# Portfolio

A futuristic, cyberpunk-themed developer portfolio built with React, TypeScript, and Vite. Features neural network animations, magnetic interactions, and an integrated contact/service ordering system.

## Features

- **Neural Network Visuals**: Dynamic animated background with interconnected nodes
- **Cyberpunk UI**: Sleek, dark-themed interface with cyan accents and glitch effects
- **Magnetic Interactions**: Interactive magnetic wrappers for enhanced UX
- **EmailJS Integration**: Contact form and service ordering with email notifications
- **Fully Responsive**: Optimized for mobile, tablet, and desktop
- **TypeScript**: Fully typed for better DX and maintainability
- **Vite**: Lightning-fast HMR and build times

## Prerequisites

- **Node.js** 18+ and npm
- **EmailJS Account**: For contact form functionality
  - Sign up at [https://dashboard.emailjs.com/](https://dashboard.emailjs.com/)
  - Create two email templates (one for contact, one for service orders)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Vikrant-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   VITE_EMAIL_PUBLIC_KEY=your_emailjs_public_key
   VITE_EMAIL_SERVICE_ID=your_emailjs_service_id
   VITE_EMAIL_TEMPLATE_ID_CONTACT=your_contact_template_id
   VITE_EMAIL_TEMPLATE_ID_ORDER=your_order_template_id
   ```

   **How to get EmailJS credentials:**
   - Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
   - Get your **Public Key** from Account settings
   - Create a **Service** (Gmail, Outlook, etc.) and note the Service ID
   - Create two **Templates**:
     - One for general contact (use template variables: `{{to_name}}`, `{{name}}`, `{{email}}`, `{{message}}`)
     - One for service orders (use variables: `{{to_name}}`, `{{name}}`, `{{email}}`, `{{budget}}`, `{{service_name}}`, `{{message}}`)

## Development

Start the development server with hot reload:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Build

Build the project for production:

```bash
npm run build
```

Output will be in the `dist/` directory.

## 👀 Preview

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
Vikrant-portfolio/
├── components/           # React components
│   ├── AboutSection.tsx
│   ├── AchievementsSection.tsx
│   ├── ContactSection.tsx
│   ├── EducationSection.tsx
│   ├── ExperienceSection.tsx
│   ├── HeroSection.tsx
│   ├── NeuralCore.tsx
│   ├── OrderModal.tsx
│   ├── ProjectsSection.tsx
│   ├── Sections.tsx
│   ├── ServicesSection.tsx
│   └── SkillsSection.tsx
├── public/              # Static assets
├── App.tsx              # Main app component
├── index.tsx            # Entry point
├── types.ts             # TypeScript type definitions
├── constants.ts         # App constants and data
├── metadata.json        # Portfolio content metadata
├── env.d.ts             # Environment variable types
├── .env.local           # Environment variables (git-ignored)
├── vite.config.ts       # Vite configuration
└── tsconfig.json        # TypeScript configuration
```

## Environment Variables

All environment variables must be prefixed with `VITE_` to be exposed to the client-side code.

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_EMAIL_PUBLIC_KEY` | EmailJS public key from account settings | Yes |
| `VITE_EMAIL_SERVICE_ID` | EmailJS service ID (e.g., Gmail service) | Yes |
| `VITE_EMAIL_TEMPLATE_ID_CONTACT` | Template ID for contact form | Yes |
| `VITE_EMAIL_TEMPLATE_ID_ORDER` | Template ID for service orders | Yes |

**Note:** The `.env.local` file is git-ignored by default. Never commit sensitive keys to version control.

## Customization

### Portfolio Content
Edit `constants.ts` to update:
- Personal information
- Skills and technologies
- Project listings
- Service offerings
- Experience and education

### Styling
- Colors and theme: Modify Tailwind classes in components
- Animations: Adjust `NeuralCore.tsx` for visual effects

### EmailJS Templates
Ensure your EmailJS templates include these variables:
- **Contact Template**: `{{to_name}}`, `{{name}}`, `{{email}}`, `{{reply_to}}`, `{{subject}}`, `{{message}}`
- **Order Template**: `{{to_name}}`, `{{name}}`, `{{email}}`, `{{reply_to}}`, `{{subject}}`, `{{message}}`, `{{budget}}`, `{{service_name}}`

## Demo Mode

If EmailJS keys are missing or invalid, the application runs in **demo mode**:
- Form submissions log to the browser console instead of sending emails
- No errors are thrown to the user

This allows for testing the UI without configuring EmailJS.

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling (via inline classes)
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **EmailJS** - Email service integration

## License

Copyright © 2025 Vikrant

Licensed under the Apache License, Version 2.0 (the "License").

**NOTICE:** This portfolio is a personal project. Unauthorized copying, redistribution, or commercial use of this codebase, design, or content is strictly prohibited without explicit written permission from the copyright holder.

For permission inquiries, contact: vikrantkrd@gmail.com

See [LICENSE](LICENSE) for full terms.

## Contributing

This is a personal portfolio project and is not open for contributions. Feel free to fork for learning purposes, but please respect the license restrictions.

## Contact

- **Email**: vikrantkrd@gmail.com
- **GitHub**: [@vikrantwiz02](https://github.com/vikrantwiz02)
- **LinkedIn**: [vikrantwiz02](https://www.linkedin.com/in/vikrantwiz02)

---

**Built by Vikrant**
