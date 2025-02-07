// export class AuthResponse {
//   // constructor(
//   //   public token: string,
//   //   public admin: boolean,
//   //   public nom: string,
//   //   public id: number,
//   //   public prenom: string,
//   //   public enseignant: boolean,
//   //   public authenticated: boolean
//   // ) {}
  
// }
export class AuthResponse {
  token: string;
  admin: boolean;
  nom: string;
  id: number;
  prenom: string;
  enseignant: boolean;
  authenticated: boolean;

  constructor(
    token: string = '',
    admin: boolean = false,
    nom: string = '',
    id: number = 0,
    prenom: string = '',
    enseignant: boolean = false,
    authenticated: boolean = false
  ) {
    this.token = token;
    this.admin = admin;
    this.nom = nom;
    this.id = id;
    this.prenom = prenom;
    this.enseignant = enseignant;
    this.authenticated = authenticated;
  }
}
