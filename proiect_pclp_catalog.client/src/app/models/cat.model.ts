import { AppointmentModel } from "./appointment.model";

export interface CatModel {
  id?: number;
  name: string;
  breed: string;
  age: number;
  sex: string;
  size: number;
  picture: string;
  vaccinationStatus: string;
  personalityTraits: string;
  adopted: boolean;
  foster?: string;
  creationDate?: string;
  updatedDate?: string;
  appointment?: AppointmentModel[];
}
