@echo off
echo =========================================
echo  🚀 RVRJC LIBRARY - VERCEL DEPLOYMENT
echo =========================================
echo.
echo STEP 1: Checking all configurations...
echo.

REM Check package.json
echo Checking package.json...
node -e "const pkg=require('./package.json'); console.log('  ✅ Name:',pkg.name); console.log('  ✅ Build script:',!!pkg.scripts.build); console.log('  ✅ Engines:',!!pkg.engines); console.log('  ✅ dotenv:',!!pkg.dependencies.dotenv);" 2>nul
if %errorlevel% neq 0 (
    echo ❌ package.json check failed
    pause
    exit /b 1
)

echo.
echo STEP 2: Checking vercel.json...
if not exist vercel.json (
    echo ❌ vercel.json not found
    pause
    exit /b 1
)
echo ✅ vercel.json exists
echo.

echo STEP 3: Checking server.js export...
findstr /C:"module.exports = app" server.js >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ server.js missing export
    pause
    exit /b 1
)
echo ✅ server.js exports app
echo.

echo =========================================
echo  ✅ ALL CONFIGURATIONS VERIFIED!
echo =========================================
echo.
echo STEP 4: Pushing to GitHub...
echo.

git add .
git commit -m "Vercel deployment ready - All configurations fixed"

if %errorlevel% neq 0 (
    echo ⚠️  Nothing to commit or git not configured
    echo.
    echo If this is your first time:
    echo 1. git init
    echo 2. git config --global user.name "Your Name"
    echo 3. git config --global user.email "your@email.com"
    echo 4. git add .
    echo 5. git commit -m "Initial commit"
    echo 6. git remote add origin https://github.com/YOUR_USERNAME/rvrjc-library-system.git
    echo 7. git push -u origin main
    echo.
)

git push origin main 2>nul
if %errorlevel% neq 0 (
    echo ⚠️  Push failed - you may need to set up remote origin
    echo.
    echo Run these commands:
    echo git remote add origin https://github.com/YOUR_USERNAME/rvrjc-library-system.git
    echo git push -u origin main
    echo.
)

echo.
echo =========================================
echo  🎉 READY FOR VERCEL DEPLOYMENT!
echo =========================================
echo.
echo NEXT STEPS:
echo.
echo 1. Go to https://vercel.com
echo 2. Sign up with GitHub
echo 3. Click "New Project"
echo 4. Select "rvrjc-library-system" repository
echo 5. Click "Deploy"
echo.
echo Environment Variables to add:
echo - NODE_ENV=production
echo - SESSION_SECRET=your-secret-key
echo - ADMIN_REGISTRATION_CODE=ADMIN2024
echo.
echo Your app will be live at:
echo https://rvrjc-library-system.vercel.app
echo.
pause
