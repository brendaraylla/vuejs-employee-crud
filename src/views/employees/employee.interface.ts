export default class EmployeeInterface {
  id!: string;

  name!: string;

  age?: number | string;

  phone?: string;

  email?: string;

  constructor(data: EmployeeInterface = { id: '', name: '' }) {
    Object.assign(this, data);
  }
}
