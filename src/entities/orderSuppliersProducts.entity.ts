import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm'
import Products from './Products.entity'
import { SupplierProduct } from './supplierProducts.entity'

@Entity('orderSuppliersProducts')
class OrderSuppliersProducts {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  quantity: number

  @Column({ type: 'decimal', precision: 10, scale: 2}) 
  costPrice: number

  @Column({  type: 'decimal', precision: 10, scale: 2 }) 
  totalPrice: number

  @Column() 
  deliverySchedule: Date

  @Column({default: false})
  isDelivered: boolean

  @CreateDateColumn({ nullable: false })
  createdAt: Date

  @ManyToOne(() => SupplierProduct)
  suplierProduct: SupplierProduct

  @ManyToOne(() => Products)
  product: Products
}

export default OrderSuppliersProducts