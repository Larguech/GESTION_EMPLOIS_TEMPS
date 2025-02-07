export class AuthResponse {
    token: string;
    admin: boolean;
    nom: string;
    id: number;
    prenom: string;
    enseignant: boolean;
    authenticated: boolean;
  
    constructor() {
      this.token = '';
      this.admin = false;
      this.nom = '';
      this.id = 0;
      this.prenom = '';
      this.enseignant = false;
      this.authenticated = false;
    }
  }