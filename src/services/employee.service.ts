/* eslint class-methods-use-this: 0 */
import http from './http';
import EmployeeInterface from '../views/employees/employee.interface';

export default class EmployeesService {
  getEmployees() {
    return http.get('/employees').then((resp) => resp.data);
  }

  putEmployee(employee: EmployeeInterface) {
    return http.put(`/employees/${employee.id}`, employee).then((resp) => resp.data);
  }

  postEmployee(employee: EmployeeInterface) {
    return http.post('/employees', employee).then((resp) => resp.data);
  }

  deleteEmployee(id: string) {
    return http.delete(`/employees/${id}`).then((resp) => resp.data);
  }
}
