import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuarioService } from '../service/usuario.service';
import { Plan } from '../plan';
import { PlanService } from '../service/plan.service';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-elegir-plan',
  templateUrl: './elegir-plan.component.html',
  styleUrls: ['./elegir-plan.component.css']
})
export class ElegirPlanComponent implements OnInit{

  //usuario:Usuario
  user:Usuario
  plan:Plan
  idUser:number

  constructor(private servicioUser: UsuarioService, private servicioPlan: PlanService, private router: Router,
    private sharedService: SharedService) { }

  ngOnInit() {
    console.log("on init elegir plan");
    
    this.servicioUser.currentUser.subscribe(user => {
      this.user = user
      console.log(this.user);
      
    });
  }

  elegirPlan(idPlan:number){
    console.log("idPlan Elegido "+idPlan);
    console.log(this.user);
    
    this.servicioPlan.getPlanByID({id:idPlan}).then(
      hayPlan => {
        console.log(hayPlan);
        
        if(hayPlan){
          console.log(this.user.id, this.servicioPlan.plan);
          
          this.servicioUser.updateUserPlan(this.user.id, this.servicioPlan.plan).then(
            ()=>{
              this.sharedService.changeComponentActive('Perfiles');
              this.router.navigate(['/perfiles']);
            }
          );
        }else{
          alert("Error al obtener plan por id")
        }
      }
    );
  }
}
