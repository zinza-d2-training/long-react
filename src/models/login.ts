export interface ILogin {
  citizenId: string;
  password: string;
}

export interface IResponseLogin {
  data: {
    token: string;
  };
}

export interface IErrorLogin {
  error: {
    message: string;
  };
}
