import { Cart } from 'src/cart/entities/cart.entity';
import { Shop } from 'src/shop/entities/shop.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: false })
  username: string;

  @Column({ length: 16 })
  password: string;

  @Column({ unique: true })
  profilename: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Shop, (shop) => shop.user, { onDelete: 'CASCADE' })
  shop: Shop[];

  @OneToOne(() => Cart, (cart) => cart.user, { onDelete: 'CASCADE' })
  cart: Cart;
}
