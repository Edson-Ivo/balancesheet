import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from "typeorm";
  
  @Entity({name: "responsible"})
  export class Responsible {
    @PrimaryGeneratedColumn("uuid")
    _id: string;
  
    @Column()
    companyId: string;
  
    @Column()
    date: Date;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  