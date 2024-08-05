import { User } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  profileId: number;

  @Column({
    default: 'https://iili.io/d5DJhYJ.webp',
  })
  profilePicture: string;

  @Column()
  profileName: string;

  @Column({ default: 0 })
  coverPhoto: string;

  @Column()
  location: string;

  @Column()
  birthDate: string;

  @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
  user: User;
}
