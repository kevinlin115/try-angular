import { animation, style, animate } from '@angular/animations';
import { environment } from 'src/environments/environment';

export const HideDropdownMenuAnimation = animation([
  style({
    opacity: '1',
    height: '*'
  }),
  animate(environment.animationDuration, style({ height: '0', opacity: '0' }))
]);

export const ShowDropdownMenuAnimation = animation([
  style({
    height: '0',
    opacity: '0'
  }),
  animate(environment.animationDuration, style({ height: '*', opacity: '1' }))
]);
