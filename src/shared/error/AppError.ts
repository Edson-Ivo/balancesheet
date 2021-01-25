export class AppError {
  public readonly message: string;
  public readonly badFields?: string[];
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400, badFields?) {
    this.message = message;
    this.statusCode = statusCode;
    this.badFields = badFields ?? null;
  }
}
