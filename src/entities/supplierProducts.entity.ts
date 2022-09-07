import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Category from "./categories.entity";
import Supplier from "./suppliers.entity";

@Entity("supplierProducts")
class SupplierProduct {
<<<<<<< Updated upstream
	@PrimaryGeneratedColumn("uuid")
	id: string;
=======
  @PrimaryGeneratedColumn("uuid")
  id: string;
>>>>>>> Stashed changes

	@Column()
	name: string;

	@Column({ type: "decimal", precision: 10, scale: 2 })
	costPrice: number;

	@ManyToOne(() => Supplier, (supplier) => supplier.supplierProducts, {
		eager: true,
		nullable: false,
	})
	supplier: Supplier;

	@ManyToOne(() => Category, (category) => category.supplierProducts, {
		eager: true,
		nullable: false,
	})
	category: Category;
}

export default SupplierProduct;
