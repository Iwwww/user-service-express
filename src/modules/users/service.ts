import { AppDataSource } from "@database/data-source";
import { UserEntity } from "@database/entities/User";
import { CreateUser } from "./schemas/createUser.schema";

export async function findUserById(id: string): Promise<UserEntity | null> {
  const repo = AppDataSource.getRepository(UserEntity);
  return repo.findOne({
    where: {
      id: id,
    },
    select: {
      id: true,
      fullName: true,
      birthDate: true,
      email: true,
      role: true,
      isActive: true,
    },
  });
}

export async function createUser(dto: CreateUser): Promise<void> {
  const repo = AppDataSource.getRepository(UserEntity);

  // const existed = repo.findOneBy({ email: dto.email.toLowerCase() });

  const entity = repo.create({
    fullName: dto.fullName,
    birthDate: dto.birthDate,
    email: dto.email.toLowerCase(),
    passwordHash: dto.password, // TODO: add hash function
    role: dto.role,
  });

  try {
    repo.save(entity);
  } catch (err) {
    throw err;
  }
}
