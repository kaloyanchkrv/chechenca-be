export interface CreateRequestArgs {
  userId: number;
  skills: string[];
  status: string;
  description: string;
  startingAddress: string;
}

export interface RequestResponse {
  id: number;
  userId: number;
  skills: string[];
  status: string;
  description: string;
  startingAddress: string;
}
