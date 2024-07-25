import { RedirectCommand, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { AttendeeDashboardComponent } from './components/attendee-dashboard/attendee-dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminActiveComponent } from './components/admin-active/admin-active.component';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OrganizerComponent } from './components/organizer/organizer.component';
import { OrganizerActiveComponent } from './components/organizer-active/organizer-active.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { HistoryComponent } from './components/history/history.component';
import { UserActiveComponent } from './components/user-active/user-active.component';

export const routes: Routes = [
{path:'', component: HomepageComponent},
{path:'homepage',pathMatch:'full',component:HomepageComponent},
{path: 'register', component: RegisterComponent},
{path:'login',component: LoginComponent},
{path:'resetpassword',component:ResetpasswordComponent},
{path:'attendee-dashboard',component:AttendeeDashboardComponent},
{
    path:'admin',
    component:AdminComponent,
    children:
    [
        {path:'dashboard',component:AdminActiveComponent},
        {path:'users',component:UsersComponent},
        {path:'profile',component:ProfileComponent},
        {path: '',redirectTo: 'dashboard',pathMatch: 'full'}
    ]
},
{
    path: 'organizer',
    component:OrganizerComponent,
    children:
    [
        {path:'dashboard',component:OrganizerActiveComponent},
        {path:'create-event',component:CreateEventComponent},
        {path:'profile',component:ProfileComponent},
        {path: '',redirectTo: 'dashboard',pathMatch:'full'}
    ]
},
{
    path:'user',component:UserDashboardComponent,
    children:
    [
        {path:'history',component:HistoryComponent},
        {path:'dashboard',component:UserActiveComponent},
        {path:'profile',component:ProfileComponent},
        {path: '',redirectTo: 'dashboard',pathMatch: 'full'}
    ]
}
];
