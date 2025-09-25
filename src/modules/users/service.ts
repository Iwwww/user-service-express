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

  return repo.find({
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
  const result = await repo.update({ id }, { isActive: false });
  if (!result.affected) throw new NotFoundError("User not found");
}

export async function activateUser(id: string): Promise<void> {
  const repo = AppDataSource.getRepository(UserEntity);
  const result = await repo.update({ id }, { isActive: true });
  if (!result.affected) throw new NotFoundError("User not found");
}
