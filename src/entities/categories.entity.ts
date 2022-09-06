import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import SupplierProduct from "./supplierProducts.entity";

@Entity("categories")
class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(
    () => SupplierProduct,
    (supplierProduct) => supplierProduct.category
  )
  supplierProducts: SupplierProduct[];
}

export default Category;
