# GaryGPT
## A simple Gemini-based general-purpose chatbot
GaryGPT is a simple chatbot that uses the Gemini Pro 1.0 model to generate responses to user input. It is designed to be easy to use and easy to modify. GaryGPT is written in Python and uses the non-public Google Gemini API. GaryGPT is a work in progress and is not yet ready for production use. It is intended for educational and experimental purposes only.
## Installation
### Requirements
- Node.js 20.0.0 or later
- Windows 11, macOS Big Sur, or Ubuntu 20.04 or later
- Python 3.10 or later
### Instructions
1. Clone the repository
```bash
git clone https://github.com/barxilly/GaryGPT.git
```
2. Install the required packages
```bash
npm i
```
3. Replace YOUR_API_KEY with your Gemini API key encrypted in Base64 in the thtml.js file
```javascript
const API_KEY = atob('YOUR_API_KEY');
```
4. Run the bot
```bash
npm start
```
## Usage
GaryGPT is designed to be easy to use. Simply type a message into the chat box and press Enter. GaryGPT will respond with a message generated by the Gemini Pro 1.0 model. You can also modify the bot to add new features or change the way it generates responses. GaryGPT is intended to be a starting point for building your own chatbot.
## Mobile Support
### PWA Support
GaryGPT is a Progressive Web App (PWA) and can be installed on any device that supports PWAs, assuming you are running the bot on a server. To install GaryGPT as a PWA, follow these steps:
1. Start GaryGPT as a server
```bash
npm run dev
```
2. Open the bot in a web browser
3. Install the bot as a PWA:
    - On Windows, click the three dots in the top right corner of the browser window and select "Install GaryGPT".
    - On macOS, click the three dots in the top right corner of the browser window and select "Install GaryGPT".
    - On Android, click the three dots in the top right corner of the Chrome app and select "Add to Home Screen".
    - On iOS, click the share button in the bottom center of the Safari app and select "Add to Home Screen".
### Exporting to Android
GaryGPT can be exported to Android using the [Capacitor](https://capacitorjs.com/) framework which is pre-installed. To export GaryGPT to Android, follow these steps:
1. Add the Android platform
```bash
npx cap add android
```
2. Copy the web assets to the Android project
```bash
npx cap copy
```
3. Open the Android project in Android Studio
```bash
npx cap open android
```
4. Build and run the Android app

### Exporting to iOS
##### Note: Exporting to iOS requires a Mac with Xcode installed as well as an Apple Developer account.
GaryGPT can be exported to iOS using the same [Capacitor](https://capacitorjs.com/) framework which is pre-installed. To export GaryGPT to iOS, follow these steps:
1. Add the iOS platform
```bash
npx cap add ios
```
2. Copy the web assets to the iOS project
```bash
npx cap copy
```
3. Open the iOS project in Xcode
```bash
npx cap open ios
```