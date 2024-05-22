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
    default:
      'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1716249600&semt=ais_user',
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
