import { ChangeDetectionStrategy, Component, computed, effect, OnInit, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  price = signal(100);
  qty = signal(2);
 // total= signal(0);

  // Computed
  total = computed(() => {
    return this.price() * this.qty();
  });
  totalValue = this.price() * this.qty();

  constructor() {
    // effect(() => {
    //   console.log("Total changed:", this.total());
    // });
  }
  ngOnInit(): void {
  
    // this.total.set(this.price());
  }

  updateQty() {
    this.price.update(q=> q+120);
    this.qty.update(q => q + 1);
  }
}
