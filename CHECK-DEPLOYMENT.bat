@echo off
echo =========================================
echo  VERCEL DEPLOYMENT - RVRJC LIBRARY
echo =========================================
echo.
echo Checking deployment files...
echo.

REM Check if vercel.json exists
if not exist "vercel.json" (
    echo ❌ vercel.json missing
    pause
    exit /b 1
)
echo ✅ vercel.json exists

REM Check if package.json has correct name
findstr /C:"\"name\": \"rvrjc-library-system\"" package.json >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ package.json name incorrect
    pause
    exit /b 1
)
echo ✅ package.json name correct

REM Check if build script exists
findstr /C:"\"build\":" package.json >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ build script missing
    pause
    exit /b 1
)
echo ✅ build script exists

echo.
echo =========================================
echo  All files configured correctly!
echo =========================================
echo.
echo NEXT STEPS:
echo.
echo 1. Push to GitHub:
echo    git add .
echo    git commit -m "Vercel deployment ready"
echo    git push origin main
echo.
echo 2. Deploy on Vercel:
echo    - Go to https://vercel.com
echo    - Sign up with GitHub
echo    - Click "New Project"
echo    - Select your repository
echo    - Click "Deploy"
echo.
echo 3. Add environment variables:
echo    NODE_ENV=production
echo    SESSION_SECRET=your-secret-key
echo    ADMIN_REGISTRATION_CODE=ADMIN2024
echo.
echo Your app will be live at:
echo https://your-project-name.vercel.app
echo.
pause
