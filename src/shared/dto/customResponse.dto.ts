export class CustomSuccessResponse {
  private message: string;
  private body?: any;

  constructor(message: string, body?: any) {
    this.message = message;
    this.body = body ?? undefined;
  }

  getMessage(): string {
    return this.message;
  }

  setMessage(message: string) {
    this.message = message;
  }

  getBody(): any | undefined {
    return this.body;
  }

  setBody(body: any) {
    this.body = body;
  }
}
