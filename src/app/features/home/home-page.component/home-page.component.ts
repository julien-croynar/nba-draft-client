import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {ProtectionService} from '@core/services';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePage {
  private readonly router = inject(Router);
  private readonly protectionService = inject(ProtectionService);

  startProtecting(){
    this.protectionService.initProtection();
    this.router.navigate(['protection']);
  }

}
