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
  skills: string[];
}

export type UserResponse = Pick<User, "email" | "name">;

export type GuardResponse = Pick<Guard, "email" | "name" | "skills">;
