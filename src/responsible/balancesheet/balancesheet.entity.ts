import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import {Responsible} from "../responsible.entity";

@Entity({name: "balancesheet"})
export class Balancesheet {
  @PrimaryGeneratedColumn("increment")
  i: number;

  @Column()
  classification: string;

  @Column()
  description: string;

  @Column()
  description_nd: string;

  @Column()
  initialCash: number;

  @Column()
  debit: number;

  @Column()
  credit: number;

  @Column()
  finalCash: number;

  @ManyToOne(
    () => Responsible,
    responsible => responsible.balancesheet,
  )
  @JoinColumn({name: "responsible"})
  responsible: Responsible;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
