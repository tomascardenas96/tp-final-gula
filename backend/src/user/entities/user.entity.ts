import { Profile } from 'src/profile/entities/profile.entity';
import { Cart } from '../../cart/entities/cart.entity';
import { Shop } from '../../shop/entities/shop.entity';
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

  @Column({ select: false })
  password: string;

  @Column({ unique: true })
  profilename: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Shop, (shop) => shop.user, { onDelete: 'CASCADE' })
  shop: Shop[];

  @OneToOne(() => Cart, (cart) => cart.user, { onDelete: 'CASCADE' })
  cart: Cart;

  @OneToOne(() => Profile, (profile) => profile.user, { onDelete: 'CASCADE' })
  profile: Profile;
}
