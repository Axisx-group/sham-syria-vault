
# SouriPay Client Android Setup Guide

This guide will help you set up the SouriPay Client app for local Android development and APK generation.

## Prerequisites

1. **Node.js** (version 18 or higher)
2. **Android Studio** with Android SDK
3. **Java Development Kit (JDK)** 8 or higher
4. **PowerShell** (for Windows) or **Terminal** (for Mac/Linux)

## Quick Setup

### Option 1: Automated Setup (Recommended)
```powershell
# Run the automated setup script
.\setup-android-local.ps1

# Open in Android Studio
npx cap open android
```

### Option 2: Manual Setup
```powershell
# 1. Build the client app
npm run build:client

# 2. Configure for local development (removes server URL)
Copy-Item capacitor-client.config.ts capacitor.config.ts

# 3. Sync with Capacitor
npx cap sync

# 4. Open in Android Studio
npx cap open android
```

## Generating APK

### In Android Studio:

1. **Open the project**: `npx cap open android`
2. **Wait for Gradle sync** to complete
3. **Build the project**: Build → Make Project (Ctrl+F9)
4. **Generate APK**: Build → Generate Signed Bundle/APK
5. **Choose APK** and click Next
6. **Create or select a keystore** for signing
7. **Choose build variant** (usually "release")
8. **Click Finish**

### APK Location
The generated APK will be in:
```
android/app/build/outputs/apk/release/app-release.apk
```

## Configuration Details

### App Configuration
- **App ID**: `com.souripay.client.dashboard`
- **App Name**: `SouriPay Client Dashboard`
- **Build Output**: `dist-client/`
- **Entry Point**: `index-client.html`

### Build Variants
- **Debug**: For development and testing
- **Release**: For production APK generation

## Troubleshooting

### Common Issues

1. **Gradle Build Failed**
   ```powershell
   # Clean and rebuild
   cd android
   .\gradlew clean
   .\gradlew build
   ```

2. **SDK Not Found**
   - Open Android Studio
   - Go to File → Project Structure
   - Set correct SDK path

3. **Permission Denied**
   ```powershell
   # Make gradlew executable (Mac/Linux)
   chmod +x android/gradlew
   ```

### Build Configuration
The project is configured with:
- **Min SDK**: 22 (Android 5.1)
- **Target SDK**: 34 (Android 14)
- **Compile SDK**: 34

## Development vs Production

### Development Build
- Uses local files from `dist-client/`
- Debugging enabled
- Fast build times

### Production Build
- Optimized and minified
- Code obfuscation
- Signed APK ready for distribution

## File Structure
```
android/
├── app/
│   ├── src/main/
│   │   ├── java/com/souripay/client/dashboard/
│   │   │   └── MainActivity.java
│   │   ├── res/
│   │   │   ├── values/strings.xml
│   │   │   ├── xml/network_security_config.xml
│   │   │   └── ...
│   │   └── AndroidManifest.xml
│   └── build.gradle
├── build.gradle
└── variables.gradle
```

## Scripts Available

- `setup-android-local.ps1` - Complete setup for local development
- `run-client-android.ps1` - Build and run on emulator/device
- `build-client-apk.sh` - Prepare for APK generation

## Next Steps

After generating your APK:
1. Test on physical devices
2. Upload to Google Play Console (for distribution)
3. Consider setting up CI/CD for automated builds

## Support

If you encounter issues:
1. Check the Android Studio build logs
2. Verify Android SDK installation
3. Ensure all dependencies are installed
4. Try cleaning and rebuilding the project
