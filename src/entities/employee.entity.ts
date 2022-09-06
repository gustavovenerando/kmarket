import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
} from "typeorm";
import { Exclude } from "class-transformer";
import Cart from "./cart.entity";

@Entity("employee")
class Employee {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	name: string;

	@Column({ unique: true })
	email: string;

	@Column()
	@Exclude()
	password: string;

	@Column()
	isAdm: boolean;

	@Column({ default: true })
	isActive: boolean;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@OneToMany((type) => Cart, (cart) => cart.employee, {
		eager: true,
	})
	cart: Cart[];
}

export default Employee;
