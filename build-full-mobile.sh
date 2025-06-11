
#!/bin/bash

echo "🚀 Building Complete SouriPay Banking Mobile App..."

# Build the complete mobile version with all features
echo "📱 Building complete mobile web app..."
npm run build:mobile

# Sync with Capacitor
echo "🔄 Syncing with Capacitor..."
npx cap sync --config capacitor-mobile.config.ts

# Add Android platform if not exists
if [ ! -d "android" ]; then
  echo "📱 Adding Android platform..."
  npx cap add android --config capacitor-mobile.config.ts
fi

echo "✅ Complete mobile build ready!"
echo ""
echo "📋 Next steps to generate APK:"
echo "1. Run: npx cap open android --config capacitor-mobile.config.ts"
echo "2. In Android Studio: Build → Generate Signed Bundle/APK"
echo "3. Choose APK and follow the wizard"
echo "4. APK will be in: android/app/build/outputs/apk/release/"
echo ""
echo "📁 Android project configured in: ./android"
echo "🏦 App includes: Dashboard, Cards, Banking Services, Admin Panel, All Features"

