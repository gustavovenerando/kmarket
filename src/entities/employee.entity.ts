import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,OneToMany, Unique} from 'typeorm'
import { Exclude } from 'class-transformer'

/* //entities: cart
import Cart from '../entities/cart.entity.ts' */

@Entity()
@Unique(['email'])
class Employee {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    email: string 

    @Column()
    @Exclude()
    password: string

    @Column()
    isAdm: boolean
    
    @Column({default: true})
    isActive: boolean
    
    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    /* @OneToMany((type) => Cart, cart => cart.employee, {
        eager: true
    })
    cart: Cart[] */
}

export default Employee

