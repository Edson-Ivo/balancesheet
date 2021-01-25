import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import {Balancesheet} from "./balancesheet/balancesheet.entity";

@Entity({name: "responsible"})
export class Responsible {
  @PrimaryGeneratedColumn("uuid")
  _id: string;

  @Column()
  companyId: string;

  @Column()
  date: Date;

  @OneToMany(
    () => Balancesheet,
    balancesheets => balancesheets.responsible,
  )
  balancesheet: Balancesheet[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
