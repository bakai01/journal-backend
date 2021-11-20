import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  password?: string;
};
