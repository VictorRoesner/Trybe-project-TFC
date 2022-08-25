export default class CustomError extends Error {
  public name: string;

  constructor(name: string, message: string) {
    super(message);
    this.name = name;
  }
}
