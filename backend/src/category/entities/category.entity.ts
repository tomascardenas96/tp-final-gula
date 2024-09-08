import { IsString } from 'class-validator';
import { Food } from '../../food/entities/food.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  categoryId: number;

  @Column()
  description: string;

  @Column({ default: 'https://iili.io/d5tLpMx.png'})
  @IsString()
  icon: string;

  @OneToMany(() => Food, (food) => food.category, { onDelete: 'CASCADE' })
  food: Food[];
}

