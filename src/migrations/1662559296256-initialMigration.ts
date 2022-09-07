import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1662559296256 implements MigrationInterface {
    name = 'initialMigration1662559296256'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employee" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdm" boolean NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_817d1d427138772d47eca048855" UNIQUE ("email"), CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "loyaltyCustomer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying(128) NOT NULL, "fidelityPoints" integer NOT NULL DEFAULT '0', "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_ce3f78b5fa0fd65107766b2c477" UNIQUE ("email"), CONSTRAINT "PK_501caf2abb43c602822522853df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "suppliers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "cnpj" integer NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fce20fe3509933fa1931ae7cdad" UNIQUE ("cnpj"), CONSTRAINT "UQ_66181e465a65c2ddcfa9c00c9c7" UNIQUE ("email"), CONSTRAINT "PK_b70ac51766a9e3144f778cfe81e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "supplierProducts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "costPrice" numeric(10,2) NOT NULL, "supplierId" uuid NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_fa4e603accb0cb6a8986578487f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orderSuppliersProducts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "costPrice" numeric(10,2) NOT NULL, "totalPrice" numeric(10,2) NOT NULL, "deliverySchedule" TIMESTAMP NOT NULL, "isDelivered" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "suplierProductId" uuid NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "PK_a4eff23081a4a95b9f396386b87" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "marketPrice" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "description" character varying(100) NOT NULL, "discount" numeric(3,2) NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" uuid NOT NULL, CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"), CONSTRAINT "CHK_aa65cde2d0dc841ad26ac8ab59" CHECK ("discount" < 1 AND "discount" >= 0), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "productsCart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "cartId" uuid NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "PK_0d908498fe15ce9b815aeccd49b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "totalPrice" numeric(10,2) NOT NULL, "sold" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "employeeId" uuid NOT NULL, "loyaltyCustomerId" uuid, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "supplierProducts" ADD CONSTRAINT "FK_fbc5d25c7aa413e5a1b3567ab38" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "supplierProducts" ADD CONSTRAINT "FK_fffb767ffbfec4ac3646835ab74" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orderSuppliersProducts" ADD CONSTRAINT "FK_ab1f886fab5216f9cfbb5916bc7" FOREIGN KEY ("suplierProductId") REFERENCES "supplierProducts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orderSuppliersProducts" ADD CONSTRAINT "FK_de70962a492a2bfa39a1d354681" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "productsCart" ADD CONSTRAINT "FK_65bf8cd8cb2237ac59f057276cb" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "productsCart" ADD CONSTRAINT "FK_a247a81f504832fa59b50f75ac1" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_61de5ba867cea0961398c0bb332" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_79ff812aa165b9951e442b9fbe3" FOREIGN KEY ("loyaltyCustomerId") REFERENCES "loyaltyCustomer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_79ff812aa165b9951e442b9fbe3"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_61de5ba867cea0961398c0bb332"`);
        await queryRunner.query(`ALTER TABLE "productsCart" DROP CONSTRAINT "FK_a247a81f504832fa59b50f75ac1"`);
        await queryRunner.query(`ALTER TABLE "productsCart" DROP CONSTRAINT "FK_65bf8cd8cb2237ac59f057276cb"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
        await queryRunner.query(`ALTER TABLE "orderSuppliersProducts" DROP CONSTRAINT "FK_de70962a492a2bfa39a1d354681"`);
        await queryRunner.query(`ALTER TABLE "orderSuppliersProducts" DROP CONSTRAINT "FK_ab1f886fab5216f9cfbb5916bc7"`);
        await queryRunner.query(`ALTER TABLE "supplierProducts" DROP CONSTRAINT "FK_fffb767ffbfec4ac3646835ab74"`);
        await queryRunner.query(`ALTER TABLE "supplierProducts" DROP CONSTRAINT "FK_fbc5d25c7aa413e5a1b3567ab38"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "productsCart"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "orderSuppliersProducts"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "supplierProducts"`);
        await queryRunner.query(`DROP TABLE "suppliers"`);
        await queryRunner.query(`DROP TABLE "loyaltyCustomer"`);
        await queryRunner.query(`DROP TABLE "employee"`);
    }

}
