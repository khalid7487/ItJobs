import { Component, OnInit } from '@angular/core';
import { CompanniesService } from 'src/app/services/compannies.service';
import Swal from 'sweetalert2'


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



  private startPage=1;
  private pagelimit= 10;

  
  notEmptyPost= true;
  notscorlly= true;

  constructor(private companyService: CompanniesService) { }

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
  }
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
        console.log(JSON.stringify(data));
      }
    )
  }

  //search by keyword select

  doSearch(){
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
      console.log("check by length ="+ stack1 + "2nd=" +stack2+ "3rd="+stack3 );
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
