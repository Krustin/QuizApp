export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  createdAt: Date;
  totalScore: number;
  gamesPlayed: number;
}
