
#!/usr/bin/env pwsh

Write-Host "🔧 Setting up SouriPay Client for local Android development..." -ForegroundColor Green

# Step 1: Build the client dashboard
Write-Host "📱 Building client dashboard..." -ForegroundColor Yellow
npm run build:client

# Step 2: Configure for local development
Write-Host "⚙️ Configuring Capacitor for local development..." -ForegroundColor Yellow

# Backup current config
if (Test-Path "capacitor.config.ts") {
    Move-Item "capacitor.config.ts" "capacitor.config.ts.backup" -Force
}

# Create local config without server URL (for local development)
$localConfig = @"
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.souripay.client.dashboard',
  appName: 'SouriPay Client Dashboard',
  webDir: 'dist-client',
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: "#1a1a2e",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#1a1a2e'
    },
    Keyboard: {
      resize: 'body',
      resizeOnFullScreen: true
    }
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true
  }
};

export default config;
"@

Set-Content -Path "capacitor.config.ts" -Value $localConfig

# Step 3: Sync with Capacitor
Write-Host "🔄 Syncing with Capacitor..." -ForegroundColor Yellow
npx cap sync

Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps for APK generation:" -ForegroundColor Cyan
Write-Host "1. Open Android Studio: npx cap open android" -ForegroundColor White
Write-Host "2. In Android Studio, go to Build → Generate Signed Bundle/APK" -ForegroundColor White
Write-Host "3. Choose APK and follow the signing process" -ForegroundColor White
Write-Host "4. The APK will be generated in android/app/build/outputs/apk/" -ForegroundColor White
Write-Host ""
Write-Host "🔧 To restore original config later, run:" -ForegroundColor Yellow
Write-Host "Move-Item capacitor.config.ts.backup capacitor.config.ts -Force" -ForegroundColor White
