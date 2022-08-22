import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'float' })
  price: number;

  @Column()
  tenantId: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column()
  image: string;
}
