import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import Cart from "./cart.entity";
import Products from "./products.entity";

@Entity("productsCart")
class ProductsCart {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ nullable: false })
	quantity: number;

	@ManyToOne(() => Cart, { nullable: false })
	cart: Cart;

	@ManyToOne(() => Products, { eager: true, nullable: false })
	product: Products;
}

export default ProductsCart;
