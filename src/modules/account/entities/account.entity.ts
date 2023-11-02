import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AccountBank {
    @PrimaryGeneratedColumn({type: 'int4'})
    id: number;

    @Column({type: 'numeric', nullable: false, default: 0})
    accountNumber: number;

    @Column({type: 'numeric', nullable: false, default: 0})
    balance: number;

    @Column({type: 'varchar', nullable: false})
    user: string;

    @Column({type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP'})
    dateCreated: Date;

    @Column({type: 'varchar', nullable: false})
    typeAccount: string;

    @Column({type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP'})
    expirationDate: Date;

    @Column({type: 'varchar', nullable: false, })
    cards: string;

    @Column({type: 'boolean', nullable: false, default: true})
    active: boolean;
    
    @Column({type: 'varchar', nullable: false})
    beneficiary: string;
}