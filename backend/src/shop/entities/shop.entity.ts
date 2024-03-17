import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
