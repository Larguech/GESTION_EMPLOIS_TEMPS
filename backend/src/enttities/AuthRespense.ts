export class AuthRespense {
    token: string;
    isAdmin: boolean;
    nom: string;
    id: number;
    prenom: string;
    isEnseignant: boolean;
    isAuthenticated: boolean;
  
    constructor() {
      this.token = '';
      this.isAdmin = false;
      this.id = 0;
      this.nom = '';
      this.prenom = '';
      this.isEnseignant = false;
      this.isAuthenticated = false;
    }
  }
  