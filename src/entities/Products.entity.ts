import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	Unique,
	ManyToOne,
	Check,
} from "typeorm";
import Category from "./categories.entity";
import OrderSuppliersProducts from "./orderSuppliersProducts.entity";
import ProductsCart from "./productsCart.entity";

@Entity("products")
@Check(`"discount" < 1 AND "discount" >= 0`)
class Products {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ unique: true })
	name: string;

	@Column({ type: "decimal", precision: 10, scale: 2 })
	marketPrice: number;

	@Column({ type: "integer" })
	stock: number;

	@Column({ length: "100" })
	description: string;

	@Column({ type: "decimal", precision: 3, scale: 2, default: 0 })
	discount: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@OneToMany((type) => ProductsCart, (productsCart) => productsCart.product)
	productsCart: ProductsCart[];

	@OneToMany(
		(type) => OrderSuppliersProducts,
		(orderSuppliersProducts) => orderSuppliersProducts.product
	)
	orderSuppliersProducts: OrderSuppliersProducts[];

	@ManyToOne((type) => Category, { nullable: false })
	category: Category;
}

export default Products;
