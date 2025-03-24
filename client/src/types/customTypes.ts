// type UserImage = {
//   image: string;
// };

export type User = {
  userName: string;
  email: string;
  image: string;
  id: string;
};
export type UserRegisterForm = {
  userName: string;
  email: string;
  image: string;
  password: string;
};

// With interfaces

// interface UserImage  {
//   image: string;
// };

// export interface UserRegisterForm extends UserImage {
//   userName: string;
//   email: string;
//   password: string;
// };

export type ImageUploadOkResponse = {
  message: string;
  imageUrl: string;
};
export type RegisterOkResponse = {
  message: string;
  user: User;
};
export type LoginOkResponse = {
  message: string;
  user: User;
  token: string;
};

export type GetProfileOkResponse = {
  message: string;
  user: User;
};

//using Pick and Omit

export type UserFullObject = {
  userName: string;
  email: string;
  image: string;
  id: string;
  password: string;
};

export type LoginCredentials = Pick<UserFullObject, "email" | "password">;

export type RegisterCredentials = Omit<UserFullObject, "id">;
