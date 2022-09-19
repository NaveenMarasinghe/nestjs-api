import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PwlessTokens {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user: string;

  @Column()
  token: string;
}
