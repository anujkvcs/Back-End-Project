@echo off
echo Starting both servers...

start "Event Management" cmd /k "cd event-management-system && set NODE_TLS_REJECT_UNAUTHORIZED=0 && npm run dev"
start "Job Portal" cmd /k "cd job-portal-system && set NODE_TLS_REJECT_UNAUTHORIZED=0 && npm run dev"

echo Both servers starting in separate windows...
pause