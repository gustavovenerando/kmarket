import { MigrationInterface, QueryRunner } from "typeorm";

export class updateSupplier1662572793874 implements MigrationInterface {
    name = 'updateSupplier1662572793874'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "suppliers" DROP CONSTRAINT "UQ_fce20fe3509933fa1931ae7cdad"`);
        await queryRunner.query(`ALTER TABLE "suppliers" DROP COLUMN "cnpj"`);
        await queryRunner.query(`ALTER TABLE "suppliers" ADD "cnpj" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "suppliers" ADD CONSTRAINT "UQ_fce20fe3509933fa1931ae7cdad" UNIQUE ("cnpj")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "suppliers" DROP CONSTRAINT "UQ_fce20fe3509933fa1931ae7cdad"`);
        await queryRunner.query(`ALTER TABLE "suppliers" DROP COLUMN "cnpj"`);
        await queryRunner.query(`ALTER TABLE "suppliers" ADD "cnpj" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "suppliers" ADD CONSTRAINT "UQ_fce20fe3509933fa1931ae7cdad" UNIQUE ("cnpj")`);
    }

}
