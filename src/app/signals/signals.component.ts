import { Component, computed, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.css'],
  imports: [FormsModule],
  standalone: true
})
export class SignalsComponent implements OnInit {
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
    this.price.update(q => q + 120);
    this.qty.update(q => q + 1);
  }
}
