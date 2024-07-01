import { Cart } from 'src/cart/entities/cart.entity';
import { Food } from 'src/food/entities/food.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class FoodOnCart {
  @PrimaryGeneratedColumn()
  foodOnCartId: number;

  @Column({ default: 1 })
  amount: number;

  @ManyToOne(() => Cart, (cart) => cart.food, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cart' })
  cart: Cart;

  @ManyToOne(() => Food, (food) => food.cart, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'food' })
  food: Food;
}
