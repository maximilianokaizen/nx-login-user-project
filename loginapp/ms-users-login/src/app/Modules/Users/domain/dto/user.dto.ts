
import { Email } from '../values-objects/Email';
import { Password } from '../values-objects/Password';

export class User {
  email: string;
  password: string;
  name : string;
  lastName : string;
  id?: number;
  uuid?: string;
  createdAt?: Date | null;
  deletedAt?: Date | null;
  modifiedAt?: Date | null;

  constructor(
    email: string,
    name : string,
    lastName : string,
    password?: string,
    id?: number,
    uuid?: string,
    createdAt?: Date | null,
    deletedAt?: Date | null,
    modifiedAt?: Date | null
  ) {
    this.id = id || null;
    this.uuid = uuid || null;
    this.email = email;
    this.password = password;
    this.name = name;
    this.lastName = lastName;
    this.createdAt = createdAt || null;
    this.deletedAt = deletedAt || null;
    this.modifiedAt = modifiedAt || null;
  }
}
