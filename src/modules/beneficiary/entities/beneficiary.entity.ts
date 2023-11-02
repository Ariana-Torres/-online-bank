import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Beneficiary {
    @PrimaryGeneratedColumn({type: "int4"})
    id: number;

    @Column({type: "varchar", length: 50})
    name: string;

    @Column({type: "varchar", length: 50})
    accountNumber: string;

    @Column({type: "varchar", length: 50})
    TypeAccount: string;

    @Column({type: "varchar", length: 50})
    accountId: number;
}