# Contributing to UPI MCC Checker

Contributions are welcome! Please feel free to submit a Pull Request.

## Tech Stack

- React Native with Expo
- TypeScript

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI

## Installation

1. Clone the repository:
```bash
git clone https://github.com/GamerJagdish/UPI-MCC-Checker.git
cd UPI-MCC-Checker
```

2. Install dependencies:
```bash
npm install
```

## Running the App

### Development Server

Start the Expo development server:
```bash
npx expo start
```

Then just scan the QR in your console with Expo Go app or Open in web on localhost:8081

## Project Structure

```
UPI-MCC-Checker/
├── app/
│   ├── index.tsx              # Main entry point
│   ├── _layout.tsx            # Root layout
│   └── +not-found.tsx         # 404 screen
├── types/                     # TypeScript type definitions
├── constants/                 # Colors and styles
├── utils/                     # Helper functions (UPI parser, MCC lookup, QR scanner)
├── hooks/                     # Custom React hooks (theme, camera)
├── components/                # Reusable UI components
│   ├── WebCamera.tsx
│   ├── PermissionView.tsx
│   ├── ScannerOverlay.tsx
│   ├── ResultsView.tsx
│   ├── ErrorView.tsx
│   └── SettingsModal/
├── assets/                    # Images and JSON data
├── app.json                   # Expo configuration
└── package.json               # Dependencies and scripts
```
