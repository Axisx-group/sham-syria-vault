
#!/bin/bash

echo "🚀 Building SouriPay Client Dashboard APK..."

# Build the client dashboard
echo "📱 Building client dashboard web app..."
npm run build:client

# Create temporary capacitor config
echo "⚙️ Setting up Capacitor configuration..."
mv capacitor.config.ts capacitor.config.ts.backup 2>/dev/null || true
mv capacitor-client.config.ts capacitor.config.ts

# Sync with Capacitor
echo "🔄 Syncing with Capacitor..."
npx cap sync

# Add Android platform if not exists
if [ ! -d "android" ]; then
  echo "📱 Adding Android platform..."
  npx cap add android
fi

# Restore original config
mv capacitor.config.ts capacitor-client.config.ts
mv capacitor.config.ts.backup capacitor.config.ts 2>/dev/null || true

echo "✅ Client APK build setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Run: npx cap open android"
echo "2. In Android Studio: Build → Generate Signed Bundle/APK"
echo "3. Choose APK and follow the signing process"
echo ""
echo "📁 Android project is ready for APK generation"
