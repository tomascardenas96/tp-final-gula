import { Category } from 'src/category/entities/category.entity';
import { FoodOnCart } from 'src/food_on_cart/entities/food_on_cart.entity';
import { Shop } from 'src/shop/entities/shop.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  foodId: number;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @ManyToOne(() => Shop, (shop) => shop.food, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'shop' })
  shop: Shop;

  @ManyToOne(() => Category, (category) => category.food, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category' })
  category: Category;

  @OneToMany(() => FoodOnCart, (foodOnCart) => foodOnCart.food, {
    onDelete: 'CASCADE',
  })
  cart: FoodOnCart[];
}
