import {Promotion} from './promotion';

export class Employee {
  _id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  employeeNumber: string;
  role: string;
  email: string;
  promotions: Promotion[];
  startedWorking: string;
  vacations: any[];
  contacts: any[];
  addresses: any[];
}
