import { Component, OnInit, IterableDiffers, KeyValueDiffers } from '@angular/core';

@Component({
  selector: 'fake',
  templateUrl: './fake.component.html',
  styleUrls: ['./fake.component.scss']
})
export class FakeComponent implements OnInit {

  constructor(
    public iterables: IterableDiffers,
    public keyValues: KeyValueDiffers
  ) { }

  ngOnInit() {
  }

}
