export class ResourceAlreadyExistsError extends Error {
  constructor(message: string = "Recurso já cadastrado") {
    super(message);
  }
}
