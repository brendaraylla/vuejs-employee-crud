export default class EmployeeInterface {
  id!: number;

  name!: string;

  age?: number;

  phone?: string;

  email?: string;

  role?: string;

  constructor(data: EmployeeInterface = { id: 0, name: '' }) {
    Object.assign(this, data);
  }
}
