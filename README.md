# UPI MCC Checker

A cross-platform mobile application for scanning and analyzing UPI QR codes. The Idea came to me when I realised some QR codes do have MCC in them and if I just check it beforehand I will have an idea if I should pay with my credit card or my bank account to avoid those 1% surcharge on some mcc and to make sure I'm using the right card for that merchant.

## Features

- Scan UPI QR codes using device camera
- Upload and scan QR codes from images
- Display merchant details (name, VPA, transaction info)
- MCC lookup with business category descriptions
- Dark mode support
- Camera selection (web platform)
- Cross-platform support (Android, Web, iOS (not tested))

## How It Works

1. The app requests camera permission on first launch
2. Point your camera at a UPI QR code or upload an image containing one
3. The app automatically detects and parses the QR code
4. Merchant details are displayed including:
   - Merchant name and VPA (Virtual Payment Address)
   - MCC (Merchant Category Code) with business description
   - Transaction details (amount, reference ID, notes)
   - Organization ID and UPI version
5. Hit go to then launch your UPI app.
Remember if you have a specific offer like "Scan and pay" then it's suggested that you use the main app itself. a good example will be kiwi app ig that thing may only give you 0.5% instead of 1.5% if you redirect from UPI MCC Checker app to their app. so in such cases only use the app to check the mcc and then go to the main app to pay.

## Tech Stack

- React Native with Expo
- TypeScript
- Expo Camera for QR scanning
- jsQR for web-based scanning
- AsyncStorage for local persistence

## Prerequisites

- Node.js (v16 or higher)
- npm
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
app/
├── index.tsx              # Main entry point
├── types/                 # TypeScript type definitions
├── constants/             # Colors and styles
├── utils/                 # Helper functions (UPI parser, MCC lookup, QR scanner)
├── hooks/                 # Custom React hooks (theme, camera)
└── components/            # Reusable UI components
    ├── WebCamera.tsx
    ├── PermissionView.tsx
    ├── ScannerOverlay.tsx
    ├── ResultsView.tsx
    ├── ErrorView.tsx
    └── SettingsModal/
```

## Contributing

Contributions are welcome. Please feel free to submit a Pull Request.

## Support

If you find this project useful, consider supporting the developer:
- [Buy Me a Coffee](https://buymeacoffee.com/gamerjagdish)