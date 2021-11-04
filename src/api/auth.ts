import { ILogin, IResponseLogin, IUserInfo } from 'models';
import { fakeAccountData, fakeUserInfoData } from 'utils';

export const authApi = {
  login(body: ILogin): Promise<IResponseLogin> {
    return new Promise((res, rej) => {
      setTimeout(() => {
        if (
          body.citizenId === fakeAccountData.citizenId &&
          body.password === fakeAccountData.password
        ) {
          res({
            data: {
              token: 'fake_token'
            }
          });
        } else {
          rej({
            error: {
              message: 'Sai tên tài khoản hoặc mật khẩu!'
            }
          });
        }
      }, 2000);
    });
  },
  getUserInfo(): Promise<IUserInfo> {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(fakeUserInfoData);
      }, 1000);
    });
  }
};
