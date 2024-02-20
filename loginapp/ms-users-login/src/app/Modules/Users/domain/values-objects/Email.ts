class Email {
    constructor(private value: string) {
        if (!this.isValid(value)) {
            throw new Error('Invalid email address');
        }
    }

    getValue() {
        return this.value;
    }

    private isValid(email: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}
