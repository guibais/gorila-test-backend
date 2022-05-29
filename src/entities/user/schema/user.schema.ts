import { InvestmentSchema } from 'src/entities/investment/schema/investment.schema';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class UserSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => InvestmentSchema, (investment) => investment.id)
  @JoinColumn()
  investment: InvestmentSchema[];
}
