import { Profile } from '../../profile/entities/profile.entity';
import { Cart } from '../../cart/entities/cart.entity';
import { Shop } from '../../shop/entities/shop.entity';
import {
  Column,
  Entity,
  JoinColumn,
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
  name: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Shop, (shop) => shop.user, { onDelete: 'CASCADE' })
  shop: Shop[];

  @OneToOne(() => Cart, (cart) => cart.user, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'cart' })
  cart: Cart;

  @OneToOne(() => Profile, (profile) => profile.user, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'profile' })
  profile: Profile;
}
