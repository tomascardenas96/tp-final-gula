import { User } from 'src/user/entities/user.entity';
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

  @Column({ default: 0 })
  profilePicture: string;

  @Column({ default: 0 })
  coverPhoto: string;

  @Column()
  location: string;

  @Column()
  birthDate: Date;

  @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user' })
  user: User;
}
