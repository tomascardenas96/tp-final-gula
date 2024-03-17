import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FoodOnCart {
  @PrimaryGeneratedColumn()
  foodOnCartId: number;

  @Column({ default: 1 })
  amount: number;
}
