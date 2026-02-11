# UPI MCC Checker

A cross-platform mobile application for scanning and analyzing UPI QR codes. The Idea came to me when I realised some QR codes do have MCC in them and if I just check it beforehand I will have an idea if I should pay with my credit card or my bank account to avoid those 1% surcharge on some mcc and to make sure I'm using the right card for that merchant.
<p align="center">
  <a href="https://github.com/GamerJagdish/UPI-MCC-Checker/releases/latest/"><img alt="Downloads" src="https://img.shields.io/github/downloads/GamerJagdish/UPI-MCC-Checker/total?style=flat-square"></a>
  <a href="https://github.com/GamerJagdish/UPI-MCC-Checker/releases/latest/"><img alt="Latest Release" src="https://img.shields.io/github/v/release/GamerJagdish/UPI-MCC-Checker?display_name=release&style=flat-square"></a>
  <a href="https://github.com/GamerJagdish/UPI-MCC-Checker/commits"><img alt="Last Commit" src="https://img.shields.io/github/last-commit/GamerJagdish/UPI-MCC-Checker?style=flat-square"></a>
  <a href="https://github.com/GamerJagdish/UPI-MCC-Checker/stargazers"><img alt="Stargazers" src="https://img.shields.io/github/stars/GamerJagdish/UPI-MCC-Checker?style=flat-square"></a>
  <a href="../LICENSE"><img alt="License: GPLv3" src="https://img.shields.io/github/license/GamerJagdish/UPI-MCC-Checker?style=flat-square"></a>
</p>

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

## Download

[Download Latest Release](https://github.com/GamerJagdish/UPI-MCC-Checker/releases/latest)

## Contributing

Contributions are welcome. Please check [CONTRIBUTING.md](CONTRIBUTING.md) for technical details and setup instructions.

## Support

If you find this project useful, consider supporting the developer: <br/><br/>
[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-orange?logo=buy-me-a-coffee)](https://www.buymeacoffee.com/gamerjagdish)
