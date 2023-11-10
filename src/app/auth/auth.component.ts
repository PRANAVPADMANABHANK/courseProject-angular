import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent{
    isLoginMode : boolean = false;


    onClick(){
        this.isLoginMode = !this.isLoginMode
    }

    onSubmit(form: NgForm){[
        console.log(form.value, "auth form value"),
        form.reset()
    ]}
}