import { Injectable } from '@angular/core';
import { Plan } from '../plan';
import { environment } from 'src/enviroments/enviroment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  plan: Plan;

  private baseURL = environment.url + "/api/plan/planes";

  constructor(private http: HttpClient) { }

  getPlanByID(input: any): Promise<boolean> {
    const url = `${this.baseURL}/${input.id}`; // Construye la URL completa

    return this.http.get<Plan>(url)
      .toPromise()
      .then((response: any) => {
        this.plan = response;
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  // constructor(private httpClient:HttpClient) { }

  // obtenerPlanPorId(id:number):Observable<Plan>{
  //   const headers = new HttpHeaders({
  //     'Authorization': 'Bearer ' + localStorage.getItem('access_token')
  //   });
  //   return this.httpClient.get<Plan>(`${this.baseURL}/${id}`);
  // }
}
