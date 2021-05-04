import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthUserComponent } from './auth-user/auth-user.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const appRoutes: Routes = [
 // { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: AuthUserComponent },
 { path: 'products', component: ProductDetailsComponent },
 { path: 'contact', component: ContactComponent },
 { path: "profile", component: MyAccountComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
