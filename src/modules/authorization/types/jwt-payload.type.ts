export type JwtPayload = {
  token: string;
  payload: Payload;
};

export type Payload = {
  id: string;
  name: string;
  email: string;
};
