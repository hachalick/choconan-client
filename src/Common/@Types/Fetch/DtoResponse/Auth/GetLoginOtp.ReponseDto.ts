type TGetLoginOtpResponseDto =
  | {
      login: false;
    }
  | {
      login: true;
      access_token: string;
      refresh_token: string;
    };