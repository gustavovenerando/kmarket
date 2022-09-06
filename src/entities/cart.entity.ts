import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm'
import { LoyaltyCustomer } from './loyaltyCustomer.entity'


@Entity('cart')
class Cart {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable:false })
  totalPrice: number

  @Column({ default:false }) 
  sold: boolean

  @CreateDateColumn({ nullable: false })
  createdAt: Date

  // @ManyToOne(() => Employee, {eager: true, nullable: false})
  // category: Employee

  @ManyToOne(() => LoyaltyCustomer, {eager: true})
  loyaltyCustomer: LoyaltyCustomer
}

export { Cart }