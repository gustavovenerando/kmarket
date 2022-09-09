import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import Employee from "./employee.entity";
import LoyaltyCustomer from "./loyaltyCustomer.entity";
import ProductsCart from "./productsCart.entity";

@Entity("cart")
class Cart {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  totalPrice: number;

  @Column({ default: false })
  sold: boolean;

  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @ManyToOne(() => Employee, { eager: true, nullable: false })
  employee: Employee;

  @ManyToOne(() => LoyaltyCustomer, { eager: true })
  loyaltyCustomer: LoyaltyCustomer;

  @OneToMany(() => ProductsCart, (productsCart) => productsCart.cart, {
    eager: true,
  })
  productsCart: ProductsCart[];
}

export default Cart;
