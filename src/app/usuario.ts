import { Plan } from "./plan"

export class Usuario {
    id:number
    username:string
    email:string
    birthday:Date
    password:String
    plan:Plan
    edad:Number
    //rol:String

    constructor(id: number, username: string, correoElectronico: string, fechaNacimiento: Date, contraseña: string,
      plan : Plan, edad:Number) {
        this.id = id;
        this.username = username;
        this.email = correoElectronico;
        this.birthday = fechaNacimiento;
        this.password = contraseña;
        this.plan = plan;
        this.edad = edad
      }
}
