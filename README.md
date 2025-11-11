# Movie Explorer

 Movie Explorer is an Expo / React Native app for discovering movies, switching between dark and light themes, and saving favorites. It uses a MockAPI backend (`https://691119057686c0e9c20c7c45.mockapi.io/api/v1`) and keeps data locally with AsyncStorage.

---

## Main Features

- Home screen with featured carousel, category tabs, and 3-column grid
- Quick search with friendly empty states
- Movie details page with rating, genres, runtime, and favorite button
- Favorites list with pull-to-refresh and long-press remove dialog
- Dark ↔ Light mode toggle (sun/moon icon on the Home header)

---

## Tech Stack

- React Native (Expo SDK 54) & React 19  
- React Navigation v6 (stack + bottom tabs)  
- Axios for HTTP requests  
- Context API + AsyncStorage for state and persistence  
- Hermes engine enabled

---

## Quick Start

```bash
npm install
npx expo run:ios     # or: npx expo run:android
```

Prefer Expo Go? Run `npm start` and scan the QR code with your device.

---

## API Overview

Base URL: `https://691119057686c0e9c20c7c45.mockapi.io/api/v1`

Defined in `src/constants/api.js`:

- `GET /Movies`
- `GET /Movies/:id`
- `GET /Movies?search=keyword`
- `GET /Favorites`
- `POST /Favorites`
- `DELETE /Favorites/:id`

Change the base URL if you clone a different backend.

---

## Useful Commands

| Command | Description |
| ------- | ----------- |
| `npm start` | Start Expo bundler |
| `npm run ios` / `npm run android` | Run with Expo Go |
| `npx expo run:ios` / `npx expo run:android` | Build & run dev client |

---

## Quick Checks

- Splash → Home loads movies  
- Theme toggle works (sun/moon button)  
- Search shows results and empty state  
- Details screen toggles favorites  
- Favorites list refreshes and removes items  
- Relaunch app: favorites + theme persist

---

## Troubleshooting Tips

- Hook order warning: keep hooks above conditional returns.  
- iOS build issues: run `npx pod-install`.  
- Port conflict: set `RCT_METRO_PORT` or `EXPO_DEV_SERVER_PORT`.  
- MockAPI search returning 404 is handled in `movieApi`.

---

Enjoy exploring movies! 🎬 Feel free to customize or extend the app however you like.***

