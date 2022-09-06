import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	Unique,
	ManyToOne,
} from "typeorm";
import Category from "./categories.entity";
import OrderSuppliersProducts from "./orderSuppliersProducts.entity";
import ProductsCart from "./productsCart.entity";

@Entity("products")
class Products {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ unique: true })
	name: string;

	@Column({ type: "decimal", precision: 10, scale: 2 })
	marketPrice: string;

	@Column({ type: "integer" })
	stock: number;

	@Column({ length: "100" })
	description: string;

	@Column({ type: "decimal", precision: 3, scale: 2, default: "0" })
	discount: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@OneToMany((type) => ProductsCart, (productsCart) => productsCart.product, {
		eager: true,
	})
	productsCart: ProductsCart[];

	@OneToMany(
		(type) => OrderSuppliersProducts,
		(orderSuppliersProducts) => orderSuppliersProducts.product
	)
	orderSuppliersProducts: OrderSuppliersProducts[];

	@ManyToOne((type) => Category)
	category: Category;
}

export default Products;
