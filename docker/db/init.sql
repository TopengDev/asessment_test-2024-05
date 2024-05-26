ALTER ROLE app WITH PASSWORD 'themostsecuredpasswordever';
DROP DATABASE IF EXISTS "asessment_test_2024_05" ;
CREATE DATABASE "asessment_test_2024_05";
ALTER DATABASE "asessment_test_2024_05" OWNER TO app;
GRANT ALL PRIVILEGES ON DATABASE "asessment_test_2024_05" TO app;
GRANT ALL PRIVILEGES ON SCHEMA public TO app;