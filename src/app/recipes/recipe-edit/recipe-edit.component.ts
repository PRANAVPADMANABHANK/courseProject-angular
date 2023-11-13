// import { Component, OnInit } from '@angular/core';
// import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Params, Router } from '@angular/router';
// import { RecipeService } from '../recipe.service';
// import { Recipe } from '../recipe.model';

// @Component({
//   selector: 'app-recipe-edit',
//   templateUrl: './recipe-edit.component.html',
//   styleUrls: ['./recipe-edit.component.css'],
// })
// export class RecipeEditComponent implements OnInit {
//   id!: number;
//   editMode = false;
//   recipeForm!: FormGroup; //type of recipeForm should be FormGroup

//   constructor(
//     private route: ActivatedRoute,
//     private recipeService: RecipeService,
//     private router: Router
//   ) {}

//   ngOnInit() {
//     this.route.params.subscribe((params: Params) => {
//       this.id = +params['id'];
//       this.editMode = params['id'] != null;
//       this.initForm();
//       console.log(this.editMode);
//     });

//   }

//   get controls() {
//     return (<FormArray>this.recipeForm.get('ingredients')).controls;
//   }

//   onSubmit() {
//     console.log(this.recipeForm, 'recipeForm');
    
//     if (this.editMode) {
//       this.recipeService.updateRecipe(this.id, this.recipeForm.value);
//     } else {
//       this.recipeService.addRecipe(this.recipeForm.value);
//     }
//     this.router.navigate(['../'], { relativeTo: this.route });
//   }

//   onAddIngredient() {
//     (<FormArray>this.recipeForm.get('ingredients')).push(
//       new FormGroup({
//         name: new FormControl(null, Validators.required),
//         amount: new FormControl(null, [
//           Validators.required,
//           Validators.pattern(/^[1-9]+[0-9]*$/),
//         ]),
//       })
//     );
//   }

//   onDeleteIngredient(index: number) {
//     (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
//   }
//   onCancel() {
//     this.router.navigate(['../'], { relativeTo: this.route }); //'relativeTo' is used to inform angular is that, what is the current route.
//   }

//   private initForm() {
//     let recipeName: String = '';
//     let recipeImagePath: any = '';
//     let recipeDescription: any = '';
//     let recipeIngredients: any[] = [];

//     if (this.editMode) {
//       const recipe = this.recipeService.getRecipe(this.id);
//       recipeName = recipe.name;
//       recipeImagePath = recipe.imagePath;
//       recipeDescription = recipe.description;

//       if (recipe.ingredients) {
//         for (let ingredient of recipe.ingredients) {
//           const ingredientFormGroup = new FormGroup({
//             name: new FormControl(ingredient.name),
//             amount: new FormControl(ingredient.amount, [
//               Validators.required,
//               Validators.pattern(/^[1-9]+[0-9]*$/),
//             ]),
//           });
//           recipeIngredients.push(ingredientFormGroup);
//         }
//       }
//     }
//     this.recipeForm = new FormGroup({
//       name: new FormControl(recipeName, Validators.required),
//       imagePath: new FormControl(recipeImagePath, Validators.required),
//       description: new FormControl(recipeDescription, Validators.required),   
//       ingredients: new FormArray(recipeIngredients),
//     });
//   }
// }








import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id!: number;
  editMode = false;
  recipeForm!: FormGroup; // type of recipeForm should be FormGroup

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
      console.log(this.editMode);
    });
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit() {
    console.log(this.recipeForm, 'recipeForm');

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSomeEvent() {
    const updatedRecipe: Recipe = {
      name: 'Updated Recipe Name',
      imagePath: 'path/to/updated/image.jpg',
      description: 'Updated Recipe Description',
      ingredients: [
        { name: 'Updated Ingredient 1', amount: 3 },
        { name: 'Updated Ingredient 2', amount: 5 },
        // Add other updated ingredients as needed
      ],
    };

    this.recipeForm.setValue({
      name: updatedRecipe.name,
      imagePath: updatedRecipe.imagePath,
      description: updatedRecipe.description,
      ingredients: this.mapIngredients(updatedRecipe.ingredients),
    });
  }

  private initForm() {
    let recipe: Recipe | undefined;
    if (this.editMode) {
      recipe = this.recipeService.getRecipe(this.id);
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipe?.name || '', Validators.required),
      imagePath: new FormControl(recipe?.imagePath || '', Validators.required),
      description: new FormControl(recipe?.description || '', Validators.required),
      ingredients: new FormArray(this.mapIngredients(recipe?.ingredients || [])),
    });
  }

  private mapIngredients(ingredients: any[]): FormGroup[] {
    return ingredients.map((ingredient) => {
      return new FormGroup({
        name: new FormControl(ingredient.name),
        amount: new FormControl(ingredient.amount, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      });
    });
  }
}
