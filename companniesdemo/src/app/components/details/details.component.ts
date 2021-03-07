import { Component, OnInit , ElementRef, ViewChild } from '@angular/core';
import { CompanniesService } from 'src/app/services/compannies.service';
import Swal from 'sweetalert2'

//For select option
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  variable = true;
  stacks: any[];
  selectedValue =[];
  dropdownSettings = {};
  companies: any[];

  //for select option
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];
  allFruits: string[] = [];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;


  private startPage=1;
  private pagelimit= 10;

  
  notEmptyPost= true;
  notscorlly= true;

  constructor(private companyService: CompanniesService) {
//for select option
    
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));

   }

  ngOnInit(): void {
    this.companyLists();
    this.getAllStack();

    console.log("update page: " +this.startPage, this.pagelimit);

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit:4,
      allowSearchFilter: true,
    };

    console.log("All satacks"+ this.stacks);

    console.log(this.selectedValue);
  }
//start for new search
add(event: MatChipInputEvent): void {
  const input = event.input;
  const value = event.value;

  // Add our fruit
  if ((value || '').trim()) {
    this.fruits.push(value.trim());
  }

  // Reset the input value
  if (input) {
    input.value = '';
  }

  this.fruitCtrl.setValue(null);
}

remove(fruit: string): void {
  const index = this.fruits.indexOf(fruit);

  if (index >= 0) {
    this.fruits.splice(index, 1);
  }
}

selected(event: MatAutocompleteSelectedEvent): void {
  this.fruits.push(event.option.viewValue);
  this.fruitInput.nativeElement.value = '';
  this.fruitCtrl.setValue(null);
}

private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
}


//end for new search 
  companyLists() {
    this.companyService.getCompannies(this.startPage, this.pagelimit).subscribe(
      data => {
        this.companies =data;
        console.log("checking"+JSON.stringify(data));
      }
    
    )
  }
  onScroll(){
    if(this.notscorlly && this.notEmptyPost){
      console.log("isscrolled")
      this.notscorlly= false;
      this.loadNextCom();
    }
  }
  loadNextCom(){
      
    const nextstart= this.startPage+10;
    const newPagelimit= this.pagelimit +10;
    this.startPage=nextstart;
    this.pagelimit=newPagelimit;

    console.log(nextstart,newPagelimit);
    //call http request 
    this.companyService.postCompany(nextstart, newPagelimit)
    .subscribe( (data: any) =>{
      const newPost = data;
      if(newPost.length === 0){
        this.notEmptyPost = false;
      }
      //add newly fetched posts to the exixting post
      this.companies = this.companies.concat(newPost);
      this.notscorlly = true;
    })
  }
  
//search items
  getAllStack() {
    this.companyService.getValidStack().subscribe(
      data=> {
        this.stacks = data;
        this.allFruits= this.stacks;
        console.log(JSON.stringify("gdhsuu"+this.stacks));
      }
    )
  }
 //new search by keyword
 search1(){
   console.log(this.fruits);
 }


  //search by keyword select

  doSearch(){
    this.selectedValue =this.fruits;
    console.log("Do search "+ this.selectedValue);

    if(this.selectedValue.length == 1){
      this.companyService.getCompaniesByStacks(this.selectedValue).subscribe(
        data =>{
          this.companies= data;
        }
      )
    }
    else if(this.selectedValue.length == 2){
      console.log("Length check" + this.selectedValue.length);
      const stack1 =this.selectedValue[0];
      const stack2 =this.selectedValue[1];
      this.companyService.getcompanyBytwoStacks(stack1, stack2).subscribe(
        data =>{
          this.companies= data;
        }
      )
    }
    else if(this.selectedValue.length == 3){
      console.log("Length check" + this.selectedValue.length);
      const stack1 =this.selectedValue[0];
      const stack2 =this.selectedValue[1];
      const stack3=this.selectedValue[2]
      console.log("check by length ="+ stack1 + "2nd=" +stack2+ "3rd="+stack3 );
      this.companyService.getcompanyBythreeStacks(stack1,stack2,stack3).subscribe(
        data =>{
          this.companies = data;
        }
      )
    }
    else if(this.selectedValue.length == 4){
      console.log("Length check" + this.selectedValue.length);
      const stack1 =this.selectedValue[0];
      const stack2 =this.selectedValue[1];
      const stack3=this.selectedValue[2];
      const stack4=this.selectedValue[3];
      console.log("check by length ="+ stack1 + "2nd=" +stack2+ "3rd="+stack3+ "4th="+stack4 );
      this.companyService.getcompanyByFourStacks(stack1,stack2,stack3,stack4).subscribe(
        data =>{
          this.companies = data;
          console.log("Search component"+ JSON.stringify(data));
        }
      )
    }
    else{
      console.log("You have to search with the range of 1-4 items.");
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You have to search with the range of 1-4 items.'
      })
    }
    
  }


  selectChangeHandle(event: any){
  //  this.selectedValue = event.target.value;
    console.log(this.selectedValue);
  }
  onSelectAll(items: any) {
    console.log("cheking multiple items" +items);
  }


}
