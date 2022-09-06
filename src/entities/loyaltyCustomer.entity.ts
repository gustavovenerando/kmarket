import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, UpdateDateColumn } from 'typeorm'

@Entity('loyaltyCustomer')
class LoyaltyCustomer {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false, length: 128, unique: true }) 
  email: string

  @Column({ default: 0 }) 
  fidelityPoints: number

  @Column({ nullable: false, default: true }) 
  isActive: boolean

  @CreateDateColumn({ nullable: false })
  createdAt: Date

  @UpdateDateColumn({ nullable: false })
  updatedAt: Date

  // @OneToMany(() => Cart, cart => cart.loyaltyCustomer)
  // cart: Cart[]

}

export { LoyaltyCustomer }