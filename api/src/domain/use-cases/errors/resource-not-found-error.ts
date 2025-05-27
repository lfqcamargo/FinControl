export class ResourceNotFoundError extends Error {
  constructor(message: string = "Recurso não encontrado") {
    super(message);
  }
}
