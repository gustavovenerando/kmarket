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

  @Column({ unique: true })
  cnpj: string;

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
    (supplierProduct) => supplierProduct.supplier,
    { onDelete: "CASCADE" }
  )
  supplierProducts: SupplierProduct[];
}

export default Supplier;
