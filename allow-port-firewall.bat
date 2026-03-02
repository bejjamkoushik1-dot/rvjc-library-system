@echo off
REM Allow port 3000 (and 3001) through Windows Firewall so other devices can connect.
REM Run this as Administrator: right-click allow-port-firewall.bat -> Run as administrator

echo Adding Windows Firewall rule for Library app (port 3000 and 3001)...
netsh advfirewall firewall add rule name="Library App 3000" dir=in action=allow protocol=TCP localport=3000
netsh advfirewall firewall add rule name="Library App 3001" dir=in action=allow protocol=TCP localport=3001
echo Done. Try opening http://YOUR-IP:3000 from another device.
pause
