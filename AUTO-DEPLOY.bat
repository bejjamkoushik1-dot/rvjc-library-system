@echo off
echo =========================================
echo  🚀 AUTO-DEPLOY TO VERCEL
echo =========================================
echo.
echo This script will deploy your app to Vercel
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found. Please install from https://nodejs.org
    pause
    exit /b 1
)

echo ✅ Node.js found

REM Install Vercel CLI globally
echo.
echo Installing Vercel CLI...
call npm install -g vercel

if %errorlevel% neq 0 (
    echo ⚠️  Vercel CLI install failed, trying npx...
    goto :usenpx
)

echo ✅ Vercel CLI installed

REM Deploy using Vercel CLI
echo.
echo =========================================
echo  🚀 DEPLOYING TO VERCEL...
echo =========================================
echo.
echo You will need to:
echo 1. Log in with your Vercel account (or create one)
echo 2. Follow the prompts
echo.
vercel --prod

goto :done

:usenpx
echo.
echo =========================================
echo  🚀 DEPLOYING WITH NPX...
echo =========================================
echo.
echo You will need to:
echo 1. Log in with your Vercel account (or create one)
echo 2. Follow the prompts
echo.
npx vercel --prod

:done
echo.
echo =========================================
echo  ✅ DEPLOYMENT COMPLETE!
echo =========================================
echo.
echo Your app should now be live on Vercel!
echo Check the URL shown above ^^
echo.
echo If you need to add environment variables:
echo 1. Go to https://vercel.com/dashboard
echo 2. Click your project
echo 3. Settings -^> Environment Variables
echo 4. Add: NODE_ENV=production
echo 5. Add: SESSION_SECRET=your-secret
echo 6. Add: ADMIN_REGISTRATION_CODE=ADMIN2024
echo.
pause
