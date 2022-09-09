import { MigrationInterface, QueryRunner } from "typeorm";

export class updateProductsCartDelete1662728407667 implements MigrationInterface {
    name = 'updateProductsCartDelete1662728407667'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "productsCart" DROP CONSTRAINT "FK_65bf8cd8cb2237ac59f057276cb"`);
        await queryRunner.query(`ALTER TABLE "productsCart" ADD CONSTRAINT "FK_65bf8cd8cb2237ac59f057276cb" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "productsCart" DROP CONSTRAINT "FK_65bf8cd8cb2237ac59f057276cb"`);
        await queryRunner.query(`ALTER TABLE "productsCart" ADD CONSTRAINT "FK_65bf8cd8cb2237ac59f057276cb" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
