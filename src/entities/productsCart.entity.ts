import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import Cart from './cart.entity'
import Products from './Products.entity'


@Entity('productsCart')
class ProductsCart {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false })
  quantity: number

  @ManyToOne(() => Cart, { nullable: false })
  cart: Cart

  @ManyToOne(() => Products, { eager: true })
  product: Products

}

export default ProductsCart 