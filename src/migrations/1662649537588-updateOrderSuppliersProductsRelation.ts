import { MigrationInterface, QueryRunner } from "typeorm";

export class updateOrderSuppliersProductsRelation1662649537588 implements MigrationInterface {
    name = 'updateOrderSuppliersProductsRelation1662649537588'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderSuppliersProducts" DROP CONSTRAINT "FK_ab1f886fab5216f9cfbb5916bc7"`);
        await queryRunner.query(`ALTER TABLE "orderSuppliersProducts" RENAME COLUMN "suplierProductId" TO "supplierProductId"`);
        await queryRunner.query(`ALTER TABLE "orderSuppliersProducts" ADD CONSTRAINT "FK_22125a29ccdcb2180ad1190d89f" FOREIGN KEY ("supplierProductId") REFERENCES "supplierProducts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderSuppliersProducts" DROP CONSTRAINT "FK_22125a29ccdcb2180ad1190d89f"`);
        await queryRunner.query(`ALTER TABLE "orderSuppliersProducts" RENAME COLUMN "supplierProductId" TO "suplierProductId"`);
        await queryRunner.query(`ALTER TABLE "orderSuppliersProducts" ADD CONSTRAINT "FK_ab1f886fab5216f9cfbb5916bc7" FOREIGN KEY ("suplierProductId") REFERENCES "supplierProducts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
