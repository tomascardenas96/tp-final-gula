import { Cart } from '../../cart/entities/cart.entity';
import { Shop } from '../../shop/entities/shop.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  invoiceId: number;

  @Column()
  invoiceNumber: string;

  @Column()
  foodId: number;

  @Column()
  foodDescription: string;

  @Column()
  foodAmount: number;

  @Column()
  foodUnitaryPrice: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  emittedAt: Date;

  @ManyToOne(() => Shop, (shop) => shop.invoice, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'shop' })
  shop: Shop;

  @ManyToOne(() => Cart, (cart) => cart.invoice, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cart' })
  cart: Cart;
}
