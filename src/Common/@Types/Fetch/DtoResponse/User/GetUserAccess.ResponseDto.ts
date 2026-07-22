type TGetUserAccessResponseDto = {
  user_id: string;
  name: string;
  family: string;
  phone: string;
  national_code: string;
  profile: string;
  role: Array<string>;
  access: Array<string>;
};
