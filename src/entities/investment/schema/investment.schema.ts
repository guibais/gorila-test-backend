import { UserSchema } from 'src/entities/user/schema/user.schema';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

export enum InvestmentType {
  'RENDA_FIXA',
  'RENDA_VARIAVEL',
}

@Entity()
export class InvestmentSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: InvestmentType;

  @Column()
  value: string;

  @Column()
  date: Date;

  @ManyToOne(() => UserSchema, (user) => user.id)
  user: UserSchema;
}
