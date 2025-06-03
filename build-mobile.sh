
#!/bin/bash

echo "🚀 Building SouriPay Client Mobile App..."

# Build the mobile version
echo "📱 Building mobile web app..."
npm run build:mobile

# Sync with Capacitor
echo "🔄 Syncing with Capacitor..."
npx cap sync --config capacitor-mobile.config.ts

# Add Android platform if not exists
if [ ! -d "android" ]; then
  echo "📱 Adding Android platform..."
  npx cap add android --config capacitor-mobile.config.ts
fi

echo "✅ Mobile build complete!"
echo ""
echo "📋 Next steps:"
echo "1. To run on emulator: npm run cap:run:android"
echo "2. To build APK in Android Studio: npx cap open android"
echo "3. Make sure Android Studio is installed and configured"
echo ""
echo "📁 Android project is in: ./android"
