export class HttpResponseDto {
    status: number;
    message: string;
    success: boolean;
  
    constructor(status: number, message: string, success: boolean) {
      this.status = status;
      this.message = message;
      this.success = success;
    }
  }