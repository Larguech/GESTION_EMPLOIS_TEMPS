export class AuthResponse {
  constructor(
    public token: string,
    public admin: boolean,
    public nom: string,
    public id: number,
    public prenom: string,
    public enseignant: boolean,
    public authenticated: boolean
  ) {}
}
