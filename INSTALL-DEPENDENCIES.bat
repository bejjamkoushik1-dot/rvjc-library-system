@echo off
echo ========================================
echo LIBRARY MANAGEMENT SYSTEM
echo ========================================
echo.

echo Checking if Node.js is installed...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed or not in PATH
    echo Please install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js is installed
echo.

echo Installing dependencies...
echo This may take a few minutes...
echo.

REM Try different npm commands
echo Attempt 1: Standard npm install...
call npm install
if %errorlevel% equ 0 (
    echo ✅ Dependencies installed successfully!
    goto :success
)

echo.
echo Attempt 2: Using npx...
call npx npm install
if %errorlevel% equ 0 (
    echo ✅ Dependencies installed successfully!
    goto :success
)

echo.
echo Attempt 3: Manual installation...
echo If the above methods don't work, please:
echo 1. Open PowerShell as Administrator
echo 2. Run: Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
echo 3. Run: npm install
echo.

goto :error

:error
echo ❌ Failed to install dependencies
echo Please try the following:
echo.
echo 1. Open Command Prompt as Administrator
echo 2. Navigate to: cd "c:\Users\bejja\OneDrive\Desktop\NEW"
echo 3. Run: npm install
echo.
echo 4. Or install Node.js from: https://nodejs.org/
echo.
pause
exit /b 1

:success
echo.
echo ✅ Installation completed!
echo.
echo Next steps:
echo 1. Initialize database: node setup-database.js
echo 2. Start server: node server.js
echo 3. Open browser: http://localhost:3000
echo.
pause
