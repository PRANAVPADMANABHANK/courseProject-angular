import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { ExamplesComponent } from './examples/examples.component';
import { AccesoriesComponent } from './accesories/accesories/accesories.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', component: RecipesComponent, children: [
    {path: '', component: RecipeStartComponent},
    {path: 'new', component: RecipeEditComponent},
    {path: ':id', component: RecipeDetailComponent},
    {path: ':id/edit', component: RecipeEditComponent},
  ]},
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'accesories', component: AccesoriesComponent},
  {path: 'examples', component: ExamplesComponent},
  {path: 'auth', component: AuthComponent},
  { path: 'payments', loadChildren: () => import('./payments/payments.module').then(m => m.PaymentsModule) }
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
