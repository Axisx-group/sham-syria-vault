
#!/usr/bin/env pwsh

Write-Host "🚀 Building and running SouriPay Client on Android..." -ForegroundColor Green

# Step 1: Build the client dashboard
Write-Host "📱 Building client dashboard..." -ForegroundColor Yellow
npm run build:client

# Step 2: Backup original config and use client config
Write-Host "⚙️ Setting up Capacitor configuration..." -ForegroundColor Yellow
if (Test-Path "capacitor.config.ts") {
    Move-Item "capacitor.config.ts" "capacitor.config.ts.backup" -Force
}
Copy-Item "capacitor-client.config.ts" "capacitor.config.ts"

# Step 3: Sync with Capacitor
Write-Host "🔄 Syncing with Capacitor..." -ForegroundColor Yellow
npx cap sync

# Step 4: Run on Android
Write-Host "▶️ Running on Android device/emulator..." -ForegroundColor Yellow
npx cap run android

# Step 5: Restore original config
Write-Host "🔧 Restoring configuration..." -ForegroundColor Yellow
Remove-Item "capacitor.config.ts" -Force
if (Test-Path "capacitor.config.ts.backup") {
    Move-Item "capacitor.config.ts.backup" "capacitor.config.ts" -Force
}

Write-Host "✅ Complete!" -ForegroundColor Green
