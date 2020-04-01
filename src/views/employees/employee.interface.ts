export default class EmployeeInterface {
  id!: number;

  name!: string;

  age?: number | string;

  phone?: string;

  email?: string;

  role?: string;

  constructor(data: EmployeeInterface = { id: 0, name: '' }) {
    Object.assign(this, data);
  }
}
