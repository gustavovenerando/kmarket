import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("supplierProducts")
export class SupplierProduct {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  costPrice: number;

  //@ManyToOne(()=> Supplier) arrumo assim que subir tudo;

  //@ManyToOne(()=> Category) arrumo assim que subir tudo;
}
