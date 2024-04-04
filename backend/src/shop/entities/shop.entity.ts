import { Food } from 'src/food/entities/food.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  shopId: number;

  @Column({ unique: true })
  name: string;

  @Column()
  location: string;

  @Column()
  phone: string;

  @Column({ unique: true })
  profilename: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.shop, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user' })
  user: User;

  @OneToMany(() => Post, (post) => post.shop, { onDelete: 'CASCADE' })
  post: Post[];

  @OneToMany(() => Food, (food) => food.shop, { onDelete: 'CASCADE' })
  food: Food[];

  @OneToMany(() => Invoice, (invoice) => invoice.shop, { onDelete: 'CASCADE' })
  invoice: Invoice;
}
