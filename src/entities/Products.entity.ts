import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,OneToMany, Unique, ManyToOne} from 'typeorm'
/* import ProductsCart from '../entities/productCart.entity.ts'
import OrderSuppliersProducts from '../entites/OrderSuppliersProducts.entity.ts'
import Category from '../entities/category.entity.ts' */

@Entity('products')
class Products {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({unique: true})
    name: string

    @Column({type: 'decimal', precision: 10, scale: 2})
    marketPrice: string

    @Column({type: 'integer'})
    stock: number

    @Column({length: '100'})
    description: string
    
    @Column({type: 'decimal', precision: 3, scale: 2, default: '0'})
    discount: string
    
    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    /* @OneToMany((type) => ProductsCart, productsCart => productsCart.products, {
        eager: true
    })
    productsCart: ProductsCart[] */

    /* @OneToMany((type) => OrderSuppliersProducts, orderSuppliersProducts => orderSuppliersProducts.products, {
        eager: true
    })
    orderSuppliersProducts: OrderSuppliersProducts[] */

   /*  @ManyToOne((type) => Category)
    category: Category */
   
}

export default Products