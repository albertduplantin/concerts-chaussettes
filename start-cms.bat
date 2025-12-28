@echo off
echo ========================================
echo    DEMARRAGE NETLIFY CMS - MODE LOCAL
echo ========================================
echo.
echo Etape 1/2 : Demarrage du serveur CMS...
echo.
start cmd /k "npx netlify-cms-proxy-server"
timeout /t 3 /nobreak > nul
echo.
echo Etape 2/2 : Demarrage du serveur web...
echo.
start cmd /k "npx http-server -p 8080"
timeout /t 3 /nobreak > nul
echo.
echo ========================================
echo    SERVEURS DEMARRES !
echo ========================================
echo.
echo Page principale : http://localhost:8080
echo Interface admin : http://localhost:8080/admin/
echo.
echo Appuyez sur une touche pour ouvrir l'admin dans le navigateur...
pause > nul
start http://localhost:8080/admin/
echo.
echo Pour arreter les serveurs, fermez les fenetres de commande.
echo.
pause
