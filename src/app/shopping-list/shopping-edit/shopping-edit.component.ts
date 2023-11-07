import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm !: NgForm 
  subscription !: Subscription;
  editMode = false;
  editedItemIndex !: number;
  editedItem !: Ingredient;
  childDataRecieved !: boolean 
  showConfirmDeleteComponent: boolean = false;


  constructor(private slService: ShoppingListService, public notificationService: NotificationService) {}

  ngOnInit() {
    this.subscription = this.slService.startedEditing.subscribe(
      (index: number) => {

        console.log(this.slService.startedEditing.subscribe(), "i")

        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);

        console.log(this.editedItem, "editedItem")
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );

  }

  onSubmit(form: NgForm) {
    const value = form.value;
    console.log(value, "value")
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    }else{
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset()
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    // Perform the delete operation here
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  
    // Show the success notification
    this.notificationService.showSuccess('Item deleted successfully');
  }
  
  

  // RecieveData(event: boolean){
  //   console.log(event, "event got")
  //   this.childDataRecieved = event

  // }

  //this unsubscribe is for to avoid the memory leak.........
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
