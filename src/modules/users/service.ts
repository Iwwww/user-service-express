import { AppDataSource } from "@database/data-source";
import { UserEntity } from "@database/entities/User";
import { CreateUser } from "./schemas/createUser.schema";
import { ConflictError, NotFoundError } from "@shared/errors/AppError";

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

export async function findUsers(): Promise<UserEntity[]> {
  const repo = AppDataSource.getRepository(UserEntity);

  return await repo.find({
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

export async function createUser(dto: CreateUser): Promise<UserEntity> {
  const repo = AppDataSource.getRepository(UserEntity);

  const entity = repo.create({
    fullName: dto.fullName,
    birthDate: dto.birthDate.toString(),
    email: dto.email.toLowerCase(),
    passwordHash: dto.password, // TODO: add hash function
    role: dto.role,
  });

  try {
    await repo.save(entity);
    return entity;
  } catch (err: any) {
    if (err?.code === "23505") {
      throw new ConflictError("User with this email already exist");
    }
    throw err;
  }
}

export async function deactivateUser(id: string): Promise<void> {
  const repo = AppDataSource.getRepository(UserEntity);

  const entity = await repo.findOneBy({ id: id });

  if (!entity) {
    throw new NotFoundError("User not found");
  }

  entity.isActive = false;
  await repo.save(entity);
}

export async function activateUser(id: string): Promise<void> {
  const repo = AppDataSource.getRepository(UserEntity);

  const entity = await repo.findOneBy({ id: id });

  if (!entity) {
    throw new NotFoundError("User not found");
  }

  entity.isActive = true;
  await repo.save(entity);
}
