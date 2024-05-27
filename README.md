### setup postgresql di local

```
CREATE ROLE app;
ALTER ROLE app WITH ENCRYPTED PASSWORD 'themostsecuredpasswordever'; LOGIN CREATEDB;
DROP DATABASE IF EXISTS "asessment_test_2024_05";
CREATE DATABASE "asessment_test_2024_05";
ALTER DATABASE "asessment_test_2024_05" OWNER TO app;
GRANT ALL PRIVILEGES ON DATABASE "asessment_test_2024_05" TO app;
GRANT ALL ON SCHEMA public TO app;
```

### Env utk docker compose

```
DB_HOST=db
DB_PORT=5432
DB_USER=app
DB_PASSWORD=themostsecuredpasswordever
DB_DATABASE=asessment_test_2024_05
DB_URL=postgresql://app:themostsecuredpasswordever@db:5432/asessment_test_2024_05
```

### Env utk dev local

```
DB_HOST=db
DB_PORT=5432
DB_USER=app
DB_PASSWORD=themostsecuredpasswordever
DB_DATABASE=asessment_test_2024_05
DB_URL=postgresql://app:themostsecuredpasswordever@localhost:5432/asessment_test_2024_05
```

### steps utk run dev di local

> 1. `yarn install`

> 2. `npx prisma generate`

> 3. `npx prisma migrate dev`

> 4. `yarn dev`

### steps utk run dev docker di local

> 1. `docker compose up`
