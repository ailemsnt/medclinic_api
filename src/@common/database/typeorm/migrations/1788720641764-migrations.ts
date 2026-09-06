import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1788720641764 implements MigrationInterface {
  name = 'Migrations1788720641764';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('ADMIN', 'ATTENDANT', 'USER')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password_hash" character varying(255) NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'USER', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "pk_user" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
  }
}
