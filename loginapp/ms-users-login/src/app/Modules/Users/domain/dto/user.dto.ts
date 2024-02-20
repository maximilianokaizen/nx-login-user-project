export class User {
    email: Email;
    password: Password;
    deleted: boolean;

    constructor(email: string, password: string, deleted: boolean) {
        this.email = new Email(email);
        this.password = new Password(password);
        this.deleted = deleted;
    }
}
