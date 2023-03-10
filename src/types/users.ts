import { Guard, User } from "@prisma/client";

export interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}

export interface CreateGuardParams {
  name: string;
  email: string;
  phone: string;
  isDriver: boolean;
  isGuard: boolean;
  hasGun: boolean;
}

export interface GetGuardSkillsParams {
  isGuard: boolean;
  isDriver: boolean;
  hasGun: boolean;
}

export type UserResponse = Pick<User, "email" | "name">;

export type GuardResponse = Pick<Guard, "email" | "name" | "phoneNumber">;
