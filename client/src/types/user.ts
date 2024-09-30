export type User = {
  id: number;
  username: string;
  email: string;
  profilePictureUrl?: string;
  cognitoId: string;
  teamId?: number;
};
