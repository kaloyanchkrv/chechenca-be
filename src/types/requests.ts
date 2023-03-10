export interface CreateRequestArgs {
  userId: number;
  isActive: boolean;
  description: string;
  startingAddress: string;
  endingAddress: string | null;
  isGuard: boolean;
  isDriver: boolean;
  hasGun: boolean;
  isTaken: boolean;
}

export interface RequestResponse {
  id: number;
  isActive: boolean;
  description: string;
  startingAddress: string;
  endingAddress: string | null;
  isGuard: boolean;
  isDriver: boolean;
  hasGun: boolean;
  isTaken: boolean;
}
