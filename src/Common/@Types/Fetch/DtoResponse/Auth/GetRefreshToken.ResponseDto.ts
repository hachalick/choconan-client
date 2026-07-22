type TGetRefreshTokenResponseDto =
  | {
      refresh: false;
    }
  | {
      refresh: true;
      access_token: string;
      refresh_token: string;
    };