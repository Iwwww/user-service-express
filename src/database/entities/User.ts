import { Column, Entity, Index, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: "users" })
@Unique(["email"])
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "full_name" })
  fullName!: string;

  @Column({ type: "date" })
  birthDate!: string;

  @Index()
  @Column({ unique: true })
  email!: string;

  @Column({ name: "password_hash" })
  passwordHash!: string;

  @Column({ type: "enum", enum: ["admin", "user"], default: "user" })
  role!: "admin" | "user";

  @Column({ default: true })
  isActive!: boolean;
}
