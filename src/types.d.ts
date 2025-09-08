export interface UserDTO {
  fullName: string;
  birthDate: string;
  email: string;
  passwordHash: string;
  role: "admin" | "user";
}
