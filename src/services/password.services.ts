import bcrypt from "bcrypt";

class PasswordServices {
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
  async compare(pass: string, hashPass: string): Promise<string> {
    return await bcrypt.compare(pass, hashPass);
  }
}
export const passwordServices = new PasswordServices();
