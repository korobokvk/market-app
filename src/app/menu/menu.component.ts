import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder} from '@angular/forms';
import { DataService } from '../services/data.service';
import { FilterService } from '../services/filter.service';
import * as _ from 'lodash';

export interface Cities {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  public sliderConfigure: any = {
    connect: true,
    step: 1,
    range: null
  };
  public category: Array<object>;
  public choosenCategory;
  public innerWidth: number;
  private myForm: FormGroup;
  private cities: Cities[];
  constructor(private fb: FormBuilder, private dataService: DataService, private filterService: FilterService) {
    this.cities = [...this.dataService.getCityFilter()];
    this.category = [...this.dataService.getCategoryFilter()];
    this.sliderConfigure.range = {
      min: this.dataService.getPriceRange()[0],
      max: this.dataService.getPriceRange()[1]
    };
  }
  ngOnInit() {
    const filtersValue = localStorage.getItem('filtersValue');
    if (filtersValue) {
      this.initForms(JSON.parse(filtersValue));
    } else {
      this.initForms();
    }
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
  initForms(...filtersVal) {
    const controls = this.category.map(c => new FormControl(false));
    this.myForm = this.fb.group({
      city: new FormControl(null),
      category: new FormArray(controls),
      price: new FormControl([this.sliderConfigure.range.min, this.sliderConfigure.range.max])
    });
    this.myForm.controls['city'].setValue('Select City', {onlySelf: true});

    if (filtersVal.length > 0) {
      this.submit(filtersVal[0]);
      this.myForm.controls['city'].setValue(_.get(filtersVal[0], 'city' ) || 'Select City', {onlySelf: true});
      this.myForm.controls['price'].setValue(_.get(filtersVal[0], 'price'), {onlySelf: true});
      if (_.includes(_.get(filtersVal[0], 'category'), true)) {
        this.myForm.controls['category'].setValue(_.get(filtersVal[0], 'category'), {onlySelf: true});
      }
    }
  }

  submit(fromStorage?) {
    const val = this.myForm.value.category
      .map((v, i) => v ? this.category[i]['id'] : null)
      .filter(v => v !== null);

      if (fromStorage) {
      localStorage.setItem('filtersValue', JSON.stringify(this.myForm.value));
      this.sendFilters(val, fromStorage);
    } else {
      localStorage.setItem('filtersValue', JSON.stringify(this.myForm.value));
      this.sendFilters(val);
    }
  }
  sendFilters(val, fromStorage?) {
    const resultsFilters = fromStorage ? _.cloneDeep(fromStorage) : _.cloneDeep(this.myForm.value);
    _.set(resultsFilters, 'category', val);
    this.filterService.getFilteredItems(resultsFilters);

  }

}
