import { Email } from '../values-objects/Email';
import { Password } from '../values-objects/Password';

export class User {
  email: Email;
  password: Password;
  id?: number;
  uuid?: string;
  createdAt?: Date | null;
  deletedAt?: Date | null;
  modifiedAt?: Date | null;

  constructor(
    email?: string,
    password?: string,
    id?: number,
    uuid?: string,
    createdAt?: Date | null,
    deletedAt?: Date | null,
    modifiedAt?: Date | null
  ) {
    this.id = id || null;
    this.uuid = uuid || null;
    this.email = email ? new Email(email) : null;
    this.password = password ? new Password(password) : null;
    this.createdAt = createdAt || null;
    this.deletedAt = deletedAt || null;
    this.modifiedAt = modifiedAt || null;
  }
}
