import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1788912705850 implements MigrationInterface {
  name = 'Migrations1788912705850';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password_hash" character varying(255) NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'ATTENDANT', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "uq_user_email" UNIQUE ("email"), CONSTRAINT "pk_user" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
