export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  name:string;
  email: string;
  password: string;
}

export interface User {
  name:string;
  email: string;
  accessToken: string;
}
