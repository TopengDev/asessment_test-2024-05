ALTER ROLE app WITH ENCRYPTED PASSWORD 'themostsecuredpasswordever'; LOGIN CREATEDB;
DROP DATABASE IF EXISTS "asessment_test_2024_05";
CREATE DATABASE "asessment_test_2024_05";
ALTER DATABASE "asessment_test_2024_05" OWNER TO app;
INSERT INTO public."User"
(email, "hashedPassword", "fullName")
VALUES('guest', '', 'Guest');
GRANT ALL PRIVILEGES ON DATABASE "asessment_test_2024_05" TO app;
GRANT ALL ON SCHEMA public TO app;