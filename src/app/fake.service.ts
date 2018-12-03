import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FakeService {

  constructor() { }

  get name(): string {
    console.log("get name")
    return 'fakeService'
  }
}
