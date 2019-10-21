let accessToken = '';

const Auth = {
  setAccessToken: (_accessToken: string) => {
    accessToken = _accessToken;
  },
  getAccessToken: () => accessToken
};

export default Auth;
