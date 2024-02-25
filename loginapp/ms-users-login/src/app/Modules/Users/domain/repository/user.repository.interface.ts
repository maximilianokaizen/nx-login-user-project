import { User } from '../dto/user.dto';
import { HttpResponseDto } from '../dto/http.response.dto';
import { AuthUserDto} from '../dto/auth.users.dto';

export interface UserRepositoryInterface {
  auth(email: string, password: string): Promise<AuthUserDto | null>;
  create(email: string, password: string, name: string, lastName: string): Promise<User | HttpResponseDto>;
}
