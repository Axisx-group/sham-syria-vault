
# SouriPay Client Mobile App

This is the mobile client app for SouriPay banking services, built with Capacitor for native mobile deployment.

## Features (Client-Only)
- ✅ Customer Dashboard
- ✅ Account Management
- ✅ Transaction History
- ✅ Card Management
- ✅ Money Transfer
- ✅ SWIFT Transfers
- ✅ Bill Payments
- ✅ Mobile Top-up
- ✅ KYC Verification
- ✅ Support & FAQ
- ❌ Admin Features (Excluded)

## Build Instructions

### Prerequisites
- Node.js 18+
- Android Studio (for Android APK)
- Xcode (for iOS, Mac only)

### Quick Start
```bash
# Make build script executable
chmod +x build-mobile.sh

# Build mobile app
./build-mobile.sh

# Run on Android emulator
npm run cap:run:android

# Open in Android Studio to build APK
npx cap open android
```

### Manual Build Steps
```bash
# 1. Build mobile web app
npm run build:mobile

# 2. Sync with Capacitor
npx cap sync --config capacitor-mobile.config.ts

# 3. Add platforms
npx cap add android --config capacitor-mobile.config.ts
npx cap add ios --config capacitor-mobile.config.ts

# 4. Run on device/emulator
npm run cap:run:android
npm run cap:run:ios
```

### Generate APK
1. Run `npm run cap:build:android`
2. Open Android Studio: `npx cap open android`
3. In Android Studio: Build → Generate Signed Bundle/APK
4. Choose APK and follow the signing process

### Configuration
- App ID: `com.souripay.client`
- App Name: `SouriPay Client`
- Build output: `dist-mobile/`
- Capacitor config: `capacitor-mobile.config.ts`

## File Structure
```
src/
├── AppMobile.tsx          # Mobile-specific app (no admin routes)
├── main-mobile.tsx        # Mobile entry point
└── components/            # Shared components
    ├── dashboard/         # Client dashboard
    ├── banking/          # Banking services
    ├── cards/            # Card management
    └── kyc/              # KYC verification

index-mobile.html          # Mobile HTML template
vite.mobile.config.ts     # Mobile Vite config
capacitor-mobile.config.ts # Mobile Capacitor config
```

## Security Notes
- Admin routes completely excluded
- No access to admin dashboard
- Secure client authentication only
- Session management for clients
