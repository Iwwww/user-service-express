import { AppDataSource } from "@database/data-source";
import { UserEntity } from "@database/entities/User";
import { NotFoundError } from "@shared/errors/AppError";

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
