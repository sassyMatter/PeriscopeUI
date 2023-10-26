// auth.guard.ts
import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
   providedIn: "root",
})
export class AuthGuardPermission {
   constructor(private authService: AuthService, private router: Router) {}

   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      // Check if the user is authenticated
      if (this.authService.isLoggedIn()) {
         return true; // User is authenticated, allow access
      } else {
         // User is not authenticated, redirect to the login page or another route
         this.router.navigate(["/login"]); // Adjust the route as needed
         return false;
      }
   }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(AuthGuardPermission).canActivate(next, state);
}
