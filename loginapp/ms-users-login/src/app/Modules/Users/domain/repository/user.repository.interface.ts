import { User } from '../dto/user.dto';

export interface UserRepository {
  auth(email: string, password: string): Promise<User | null>;
}
