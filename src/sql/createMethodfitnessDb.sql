-- Database: "MethodFitness"

-- DROP DATABASE "MethodFitness";

CREATE DATABASE "MethodFitness"
  WITH OWNER = postgres
       ENCODING = 'UTF8'
       TABLESPACE = pg_default
       LC_COLLATE = 'en_US.utf8'
       LC_CTYPE = 'en_US.utf8'
       CONNECTION LIMIT = -1;

-- Schema: public

-- DROP SCHEMA public;

CREATE SCHEMA public
  AUTHORIZATION postgres;

GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;
COMMENT ON SCHEMA public
  IS 'standard public schema';

-- Table: "lastProcessedPosition"

-- DROP TABLE "lastProcessedPosition";

CREATE TABLE "lastProcessedPosition"
(
  id uuid NOT NULL,
  "commitPosition" bigint,
  "preparePosition" bigint,
  "handlerType" text
)
WITH (
  OIDS=FALSE
);
ALTER TABLE "lastProcessedPosition"
  OWNER TO postgres;

-- Table: states

-- DROP TABLE states;

CREATE TABLE states
(
  id uuid NOT NULL,
  document jsonb
)
WITH (
  OIDS=FALSE
);
ALTER TABLE states
  OWNER TO postgres;

-- Table: trainer

-- DROP TABLE trainer;

CREATE TABLE trainer
(
  id uuid NOT NULL,
  document jsonb
)
WITH (
  OIDS=FALSE
);
ALTER TABLE trainer
  OWNER TO postgres;

-- Table: "trainerLoggedIn"

-- DROP TABLE "trainerLoggedIn";

CREATE TABLE "trainerLoggedIn"
(
  id uuid NOT NULL,
  document jsonb
)
WITH (
  OIDS=FALSE
);
ALTER TABLE "trainerLoggedIn"
  OWNER TO postgres;

-- Table: "trainerSummary"

-- DROP TABLE "trainerSummary";

CREATE TABLE "trainerSummary"
(
  id uuid NOT NULL,
  document jsonb
)
WITH (
  OIDS=FALSE
);
ALTER TABLE "trainerSummary"
  OWNER TO postgres;
