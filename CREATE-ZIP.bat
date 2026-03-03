@echo off
echo =========================================
echo  ZIP PROJECT FOR VERCEL UPLOAD
echo =========================================
echo.
echo Creating zip file for easy upload...
echo.

REM Create zip file
cd /d "c:\Users\bejja\OneDrive\Desktop"
powershell -Command "Compress-Archive -Path 'NEW' -DestinationPath 'RVRJC-Library.zip' -Force"

echo.
echo ✅ ZIP FILE CREATED!
echo.
echo File location: c:\Users\bejja\OneDrive\Desktop\RVRJC-Library.zip
echo.
echo NEXT STEPS:
echo 1. Go to https://vercel.com/new
if exist "RVRJC-Library.zip" (
    echo 2. Click "Import Project" or "Upload"
    echo 3. Select: RVRJC-Library.zip
    echo 4. Click "Deploy"
    echo.
    echo The file is ready to upload!
    start "" "https://vercel.com/new"
) else (
    echo 2. Click "Import Git Repository"
    echo 3. Select your GitHub repo
)
echo.
pause
