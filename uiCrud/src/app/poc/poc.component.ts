import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ChildPOCComponent } from "../child-poc/child-poc.component";
import { PocService } from "../poc.service";
import { HttpClientModule } from "@angular/common/http";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { Subscription } from "rxjs";



export interface MyData {
  id?: any; // Make id property optional for flexibility
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};


@Component({
  selector: "app-poc",
  standalone: true,
  templateUrl: "./poc.component.html",
  styleUrl: "./poc.component.scss",
  imports: [
    FormsModule,
    CommonModule,
    ChildPOCComponent,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})


export class PocComponent implements OnInit, OnDestroy {
    @ViewChild(ChildPOCComponent) childComponent!: ChildPOCComponent;
    viewChildData: any;

    getData!:Subscription;
  parent:any = "Parent Component"
  inputName:any='';
  inputScore:any='';
  inputObj= {"name":"","score":""};  
  updateListMsg:any;

  data$ = this.service.currentMessage$;

  title: any = `<h1>Binding Data</h1>`;
  user = {
    name: "Anil Kumar",
    age: 25,
    work: "Software Engineer",
  };

  items = ["Apple", "Banana", "Orange"];
  titleTwo: string = "Two way Data Binding";

  textColor = "red";

  BindDataProperty: boolean = false;
  comments: any = [];

  message!: string;
  msgOutputData!: string;
  msgObj!: any;

  apiData: any = [];
  modalform: any;
  postDatainput: any = [];
  apiErrorMsg: any;
  isEditData: any = null;
  saveAndUpdateTxt!:boolean;
  savedObj:any

  constructor(
    private service: PocService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}




  ngOnInit(): void {
     this.getData = this.service.getData().subscribe({
      next: (res) => {
        this.apiData = res;
        console.log(this.apiData);
      },
      error: (error) => {
        this.apiErrorMsg = error;
        console.error(error);
      },
      complete: () =>
        console.log("Api Data Sucessfully fetched and Completed.!!!"),
    });

    this.modalform = this.fb.group({
      employeeName: [null, Validators.required],
    });
    
  }

  deleteData(item: any): void {
    this.service.deleteData(item.id).subscribe({
      next: () => {
        console.log("Item deleted successfully");
        this.apiData = this.apiData.filter(
          (dataItem: any) => dataItem.id !== item.id
        );
        console.log(this.apiData);
      },
      error: (error) => {
        console.error("Error deleting item:", error);
      },
    });
  }

    savePostData() {
      let savedObj;
      if (!this.isEditData) { 
        savedObj =  {
          "id": uuidv4(),
          "created_time": "2024-02-04T18:17:05.397Z",
          "updated_time": "2024-04-04T09:25:01.833Z",
          "employee_name": this.modalform.value.employeeName,
          "employee_age": "23",
          "employee_salary": "99999999",
          "surname": "kadali",
          "S_No": 1
        };
          
        this.service.postData(savedObj).subscribe({
          next: (res) => {
            console.log("savedResponse>>>",res)
            this.service.getData().subscribe({
              next:(res)=>{
                let reverseData = res.reverse();
                this.apiData = reverseData;
              }
            })
               
            this.modalform.reset();
            this.modalService.dismissAll();
          },
          error: (error) => {
            console.error("Error Saving Data:", error);
          },
          
        } );
      } else {
        let updatedObj = {
          "id": this.isEditData.id,
          "created_time": "2024-02-04T18:17:05.397Z",
          "updated_time": "2024-04-04T09:25:01.833Z",
          "employee_name": this.modalform.value.employeeName,
          "employee_age": "23",
          "employee_salary": "99999999",
          "surname": "kadali",
          "S_No": 1
        };
           this.service.UpdateData(this.isEditData.id, updatedObj).subscribe({
            next: (res) =>{
              let index = this.apiData.findIndex((t:any)=> t.id === res.id)
              if(index!==-1){
                this.apiData[index]=res;
              }
            },
            error:(error)=>{
              console.log("Error Editing Data.", error)
            }
           })
        this.modalform.reset();
        this.modalService.dismissAll();
        this.isEditData = null;
      }
    }

    

    editData(content: any, item: any) {  
      this.isEditData = item;
      this.modalform.patchValue({
       employeeName: item.employee_name,
      });
      
      this.saveAndUpdateTxt = true
      this.modalService.open(content);
    }

  open(content: any) {
    this.modalService.open(content);
    this.saveAndUpdateTxt = false
  }

  submit(comment: any) {
    this.comments.push(comment);
  }

  onClick() {
    alert("Button Clicked.!!!");
  }

  handleButtonClick() {
    this.msgOutputData =
      "Simple Click Event Emitter -> Button clicked in child component";
  }

  receiveMsg(event: any) {
    this.message = event;
 
  }

  handleObject(event: any) {
    this.msgObj = event;

  }

  logChildMessage() {
    // this.viewChildData = this.childComponent.messageFromChild;
  }

  inputEvent(name:any,score:any){
    this.inputName = name;
    this.inputScore = score;
    this.inputObj = {'name':name, 'score':score};
    // this.updateListMsg = this.childComponent.updateList(this.inputObj);

  }

  updateSubData() {
    this.service.updateData(
      "New Data in Parent Component Viewing in Child Component.!!!"
    );
  }

  ngOnDestroy(): void {
    this.getData.unsubscribe();
  }


}
