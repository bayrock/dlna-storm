@ECHO OFF

:start

set /p url="Enter direct link to video: "
ECHO.

ECHO Storming DLNA devices on local network..
call node ../index -u %url%
ECHO.

goto start
