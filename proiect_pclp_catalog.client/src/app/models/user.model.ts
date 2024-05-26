import { AppointmentModel } from "./appointment.model";

export interface UserModel {
  id?: number;
  login: string;
  password?: string;
  shelterName: string;
  role: string;
  appointment?: AppointmentModel[];
}
