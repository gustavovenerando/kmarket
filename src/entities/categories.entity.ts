import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Products from "./Products.entity";
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

	@OneToMany(() => Products, (supplierProduct) => supplierProduct.category)
	products: Products[];
}

export default Category;
