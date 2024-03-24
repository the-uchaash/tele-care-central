import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";

@Entity("pharmacist")
export class PharmacistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => PrescriptionEntity, (prescription) => prescription.pharmacist)
  prescriptions: PrescriptionEntity[];

  @OneToMany(() => MedicationInventoryEntity, (inventory) => inventory.pharmacist)
  inventories: MedicationInventoryEntity[];

  @OneToMany(() => MedicationAlertEntity, (alert) => alert.pharmacist)
  alerts: MedicationAlertEntity[];



}


@Entity("prescription")
export class PrescriptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  medicationName: string;

  @Column()
  dosage: number;

  @Column()
  prescriptionDate: string;

  @ManyToOne(() => PharmacistEntity, (pharmacist) => pharmacist.prescriptions)
  @JoinColumn({ name: "pharmacist_id" })
  pharmacist: PharmacistEntity;
}

@Entity("medication_inventory")
export class MedicationInventoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  medicationName: string;

  @Column()
  quantity: number;

  @ManyToOne(() => PharmacistEntity, (pharmacist) => pharmacist.inventories)
  @JoinColumn({ name: "pharmacist_id" })
  pharmacist: PharmacistEntity;
}

@Entity("medication_alert")
export class MedicationAlertEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  medicationName: string;

  @Column()
  expirationDate: string;

  @ManyToOne(() => PharmacistEntity, (pharmacist) => pharmacist.alerts)
  @JoinColumn({ name: "pharmacist_id" })
  pharmacist: PharmacistEntity;
}


