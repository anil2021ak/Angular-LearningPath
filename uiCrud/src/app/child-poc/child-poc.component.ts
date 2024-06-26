import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PocService } from '../poc.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-child-poc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child-poc.component.html',
  styleUrl: './child-poc.component.scss'
})
export class ChildPOCComponent implements OnInit{

  // @Input() userData:any;

  // @Input() nameData:any;
  // @Input() scoreData:any;

  // @Input() ObjInput:any


  // @Output() buttonClicked: EventEmitter<any> = new EventEmitter<any>();

  // @Output() messageEvent = new EventEmitter<any>();

  // @Output() objectEmitted:EventEmitter<any> = new EventEmitter<any>();

  // @Output() msgEvent = new EventEmitter<any>(); 

  // listarray:any[] = [{"name":"Anil","score":"100"}];

  // id:any;

  // child:any = "Child Component"
  // messageFromChild = 'ViewChild -> Hello Data Coming from child to parent';
  // messageFromParent = 'Message from parent';

  // subData$ = this.service.observableDataSubject$;

  // constructor(private service:PocService ){}

   ngOnInit(): void {
    
   }
     
  // updateList(obj:any){
  //   this.listarray.push(obj)
  //   console.log(this.listarray);
  //   return obj.name + " is Added.!!!"
  // }

  // emitEvent(){
  //   this.buttonClicked.emit();
  // }

  // sendMsg(){
  //   this.messageEvent.emit("Passing Data with Event Emitter -> Data from child");
  // }

  // emitObjEvent(){
  //   let obj = {
  //     name : 'Kiran Kumar',
  //     age : 23,
  //     designation : 'Student'
  //   }
  //   this.objectEmitted.emit(obj);
  // }

  // sendServiceMsg(){
  //   this.service.changeMessage("New Data in Child Component viewing in Parent component.!!!");
  // }

  




}
