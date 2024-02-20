export class Password {
    constructor(private value: string) {
        if (!this.isValid(value)) {
            throw new Error('Invalid password');
        }
    }

    getValue() {
        return this.value;
    }

    private isValid(password: string) {
        return password.length >= 5; 
    }
}