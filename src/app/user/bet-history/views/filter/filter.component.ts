import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  TransactionForm: FormGroup = new FormGroup({
    starDate: new FormControl(null, [Validators.required]),
    endDate: new FormControl(null, [Validators.required]),
  });
  @Output() FirstDate = new EventEmitter<any[]>();
  @Output() endDate = new EventEmitter<any[]>();
  constructor() { }

  ngOnInit(): void {
  }
  shearchByDate(){
    let stdate: any;
    let eDate: any;
    stdate = this.TransactionForm.value.starDate;
    eDate = this.TransactionForm.value.endDate ;
    this.FirstDate.emit(stdate);
    this.endDate.emit(eDate );
    
  }
}
