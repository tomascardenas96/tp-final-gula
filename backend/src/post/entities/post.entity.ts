import { Shop } from 'src/shop/entities/shop.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  postId: number;

  @Column()
  description: string;

  @Column({ default: 0 })
  stars: number;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  postedAt: Date;

  @ManyToOne(() => Shop, (shop) => shop.post, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'shop' })
  shop: Shop;
}
