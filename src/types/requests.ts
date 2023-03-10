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
  startingTime: string;
  endingTime: string;
  hasVehicle: boolean;
  rentHours: number | null;
}

export interface RequestResponse {
  id: number;
  isActive: boolean;
  description: string;
  startingAddress: string;
  endingAddress: string | null;
  isTaken: boolean;
}

export interface UpdateRequest {
  id: number;
  guardId: number;
  isActive: boolean;
  isTaken: boolean;
}
