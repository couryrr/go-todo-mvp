rem Start
cd api

docker build -t couryrr/todo-api:latest .

docker compose up -d

rem Update
rem cd .\api\
rem docker build -t couryrr/todo-api:latest .

rem cd ..
rem docker compose up -d --no-deps todo-api-application

rem TODO: Create cli?
rem  - apply flyway
rem  - init
rem  - recreate
rem  - test
rem    -- unit
rem    -- func
rem    -- ui
