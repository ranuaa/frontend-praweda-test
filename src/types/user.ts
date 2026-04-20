export interface User {
  name: string;
  location: string;
  email: string;
  age: number;
  phone: string;
  cell: string;
  picture: string[];
}

export interface UserResponse {
  data: User[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}