import { Component, OnInit, HostListener } from '@angular/core';
import {FormGroup, FormControl, FormArray, FormBuilder} from '@angular/forms';

export interface Cities {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public sliderConfigure: any = {
    connect: true,
    step: 1,
    range: {
      min: 10,
      max: 80
    }
  };
  public category: Array<object>;
  public innerWidth: number;

  private myForm: FormGroup;
  private cities: Cities[];

  constructor(private fb: FormBuilder) {
    this.cities = [
      {value: 'london', viewValue: 'London'},
      {value: 'odessa', viewValue: 'Odessa'}
    ];
    this.category = [{id: 100, name: 'Arch'}, {id: 200, name: 'Arch'}, {id: 300, name: 'Arch'}];
  }
  ngOnInit() {
    this.initForms();
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
  initForms() {
    const controls = this.category.map(c => new FormControl(false));
    this.myForm = this.fb.group({
      city: new FormControl(null),
      category: new FormArray(controls),
      range: new FormControl([5, 40])
    });
    this.myForm.controls['city'].setValue(this.cities[0].value, {onlySelf: true});
  }

  submit() {
    const selectedOrderIds = this.myForm.value.category
      .map((v, i) => v ? this.category[i]['id'] : null)
      .filter(v => v !== null);

    console.log(selectedOrderIds);
  }


}
