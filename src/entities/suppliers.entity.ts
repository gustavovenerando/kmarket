import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import SupplierProduct from "./supplierProducts.entity";

@Entity("suppliers")
class Supplier {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ type: "integer", unique: true })
  cnpj: number;

  @Column()
  phone: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => SupplierProduct,
    (supplierProduct) => supplierProduct.supplier
  )
  supplierProducts: Supplier;
}

export default Supplier;
