export type ICheckIn = {
  id: string;
  validated_at: Date | null;
  created_at: Date;
  user_id: string;
  gym_id: string;
};

export type IDataCreateRequest = {
  gymId: string;
  userId: string;
  userLatitude: number;
  userLongitude: number;
};

export interface IRepositoryCheckIn {
  create(data: IDataCreateRequest): Promise<ICheckIn>;
  findByUserIdOnDate(userId: string, date: Date): Promise<ICheckIn | null>;
  findManyByUserId(userId: string): Promise<ICheckIn[]>;
}
