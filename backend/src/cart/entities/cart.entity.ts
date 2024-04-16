import { FoodOnCart } from 'src/food_on_cart/entities/food_on_cart.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  cartId: number;

  @OneToOne(() => User, (user) => user.cart, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => FoodOnCart, (foodOnCart) => foodOnCart.cart, {
    onDelete: 'CASCADE',
  })
  food: FoodOnCart[];

  @OneToMany(() => Invoice, (invoice) => invoice.cart, { onDelete: 'CASCADE' })
  invoice: Invoice[];
}
