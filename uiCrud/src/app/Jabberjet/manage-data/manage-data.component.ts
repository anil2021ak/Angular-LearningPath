import { Component, OnInit } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { ManageDataService } from "../manage-data.service";
import { CommonModule } from "@angular/common";
import { MatRadioModule } from "@angular/material/radio";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { NgbModal, NgbTimepickerModule } from "@ng-bootstrap/ng-bootstrap";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { v4 as uuidv4 } from "uuid";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { NgSelectModule } from '@ng-select/ng-select';




export interface DayObject {
  sno: string;
  day: string;
  fromtime: TimeObject;
  totime: TimeObject;
  totalhrs: string;
  isSelected: boolean;
}

export interface TimeObject {
  hour: number;
  minute: number;
  second: number;
  meridian:string
}

export interface Channel {
	name: string;
	img: string;
  value: string,
  hasAccess: boolean;
  fullControl:boolean,
  canCreate: boolean;
  canView: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}

export interface ProfilesList {
  id: string;
  profilePic: string;
  name: string;
}


@Component({
  selector: "app-manage-data",
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    MatRadioModule,
    MatCheckboxModule,
    NgbTimepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    NgSelectModule
  ],
  templateUrl: "./manage-data.component.html",
  styleUrl: "./manage-data.component.scss",
})
export class ManageDataComponent implements OnInit {



  channelData: Channel[] = [
    {
      name: 'WhatsApp',
      img: 'whatsapp 1.jpg',
      value: 'whatsappChannelManagement',
      hasAccess: false,
      fullControl:false,
      canCreate: false,
      canView: false,
      canUpdate: false,
      canDelete: false
      
    },
    {
      name: 'Facebook',
      img: '_39.Messenger.jpg',
      value: 'facebookChannelManagement',
      hasAccess: false,
      fullControl:false,
      canCreate: false,
      canView: false,
      canUpdate: false,
      canDelete: false
      
    },
    {
      name: 'Botjet',
      img: 'Botjet-round 1.jpg',
      value: 'botjetChannelManagement',
      hasAccess: false,
      fullControl:false,
      canCreate: false,
      canView: false,
      canUpdate: false,
      canDelete: false
      
    },
    {
      name: 'Covnia',
      img: 'Covnia-round 1.jpg',
      value: 'covniaChannelManagement',
      hasAccess: false,
      fullControl:false,
      canCreate: false,
      canView: false,
      canUpdate: false,
      canDelete: false
      
    },
    {
      name: 'Jira',
      img: 'Frame.jpg',
      value: 'jiraChannelManagement',
      hasAccess: false,
      fullControl:false,
      canCreate: false,
      canView: false,
      canUpdate: false,
      canDelete: false
      
    },
  ];

  selectAllChecked: boolean = false;

  selecteditems: ProfilesList[] = [];
  memberList:ProfilesList[] = [];
 

  businessHours: boolean = true;
  completeData: any = "";
  data: { [key: string]: any } = {};
  businesshrsData: DayObject[] = [];
  fromTime!: any;
  toTime!: any;
  fromTimeConversion: any = "";
  toTimeConversion: any = "";
  fromHrs: any;
  fromMins: any;
  toHrs: any;
  toMins: any;
  from: any;
  to: any;
  businessHrsSavedData: any;


  savedBusinessHrsData: any;


  isCheckall: boolean = false;
  workingHours: any = 0;

  fromTimeObj: any = {
    hour: 0,
    minute: 0,
    second: 0,
   
  };

  toTimeObj: any = {
    hour: 0,
    minute: 0,
    second: 0,
   
  };

  meridian: boolean = true;

  selectedCheckboxData: any = null;

  businessHoursForm!: FormGroup;

  chatWindowConfigurations: any = {
    isEnabledGroupChats: true,
    isEnabledPeerChats: true,
    isEnabledEnterpriseGroupChats: true,
    isEnabledAudioCalls: false,
    isEnabledVideoCalls: true,
    isEnabledAttachmentSharings: false,
    isEnabledImageSharings: false,
    isEnabledExternalChats: false,
    isEnabledReadReceipts: false,
    isEnabledAddressBook: true,
    isEnabledProfanity: false,
    isEnabledE2EEncryption: false,
    isEnabledDeleteForMe: false,
    isEnabledDeleteForEveryOne: false,
  };

  chatWindowData: any = {
    title: "Chat Permissions",
    fullAccess: false,
    images: [
      {
        src: "chat (1) 1.jpg",
        title: "Peer Chat",
        enabled: false,
        value: 'isEnabledPeerChats'
      },
      {
        src: "attachment.jpg",
        title: "Attachment Sharing",
        enabled: false,
        value: 'isEnabledAttachmentSharings'
      },
      {
        src: "business-and-trade 1.jpg",
        title: "Enterprise Group Chat",
        enabled: false,
        value:  'isEnabledEnterpriseGroupChats'
      },
      {
        src: "Capa_1.jpg",
        title: "Profanity",
        enabled: false,
        value:'isEnabledProfanity'
      },
      {
        src: "chat-group 1.jpg",
        title: "Group Chat",
        enabled: false,
        value: 'isEnabledGroupChats'
      },
      {
        src: "Frame 427319060.jpg",
        title: "Read Receipt",
        enabled: false,
        value:'isEnabledReadReceipts'
      },
      {
        src: "group-delete 2.jpg",
        title: "Delete For Everyone",
        enabled: false,
        value: 'isEnabledDeleteForEveryOne'
      },
      {
        src: "Group.jpg",
        title: "Image Sharing",
        enabled: false,
        value:'isEnabledImageSharings'
      },
      {
        src: "Layer_1.jpg",
        title: "End 2 End Encryption",
        enabled: false,
        value:'isEnabledE2EEncryption'
      },
      {
        src: "monitor 1.jpg",
        title: "Video Calls",
        enabled: false,
        value:'isEnabledVideoCalls',
      },
      {
        src: "phone-book 1.jpg",
        title: "Address Book",
        enabled: false,
        value: 'isEnabledAddressBook'
      },
      {
        src: "reply-message 1.jpg",
        title: "External Chats",
        enabled: false,
        value: 'isEnabledExternalChats'
      },
      {
        src: "telecommunication 1.jpg",
        title: "Audio Calls",
        enabled: false,
        value:"isEnabledAudioCalls"
      },
      {
        src: "user-delete 1.jpg",
        title: "Delete For Me",
        enabled: false,
        value:"isEnabledDeleteForMe",
      },
    ],
  };


channelWindowData: any =   {
  "fullControl": false,
  "whatsappChannelManagement": {
    "hasAccess": true,
    "fullControl": true,
    "canCreate": true,
    "canView": true,
    "canUpdate": true,
    "canDelete": true
  },
  "facebookChannelManagement": {
    "hasAccess": true,
    "fullControl": true,
    "canCreate": true,
    "canView": true,
    "canUpdate": true,
    "canDelete": true
  },
  "botjetChannelManagement": {
    "hasAccess": true,
    "fullControl": true,
    "canCreate": true,
    "canView": true,
    "canUpdate": true,
    "canDelete": true
  },
  "covniaChannelManagement": {
    "hasAccess": true,
    "fullControl": true,
    "canCreate": true,
    "canView": true,
    "canUpdate": true,
    "canDelete": true
  },
  "jiraChannelManagement": {
    "hasAccess": true,
    "fullControl": true,
    "canCreate": true,
    "canView": true,
    "canUpdate": true,
    "canDelete": true
  }
}

  constructor(private service: ManageDataService, private fb: FormBuilder, private modalService:NgbModal) {}

  ngOnInit(): void {
    this.businessHoursForm = this.fb.group({
      businessHours: [null, Validators.required],
      timeZone: [null, Validators.required],
      feedback: [null, Validators.required],
    });

    this.service.getData().subscribe((res: any) => {
      this.completeData = res;
      this.businessHrsSavedData = res.organization.businessHours;
      console.log(this.businessHrsSavedData);
      this.data = res.organization.businessHours.days;
      console.log(this.data);
      this.getTimings();
    });
   

      this.service.getProfileData().subscribe(pres=>{
      this.memberList = pres.data;
      console.log(this.memberList)
    });

  }



  getTimings() {
    if (!this.data) {
      console.log("Data is null or undefined");
      return;
    }
    Object.keys(this.data).forEach((day) => {
      let timings = this.data[day];
      let [from, to] = timings.split("-");
      this.from = from;
      this.to = to;

      this.fromTime = from.slice(0, -2);
      this.toTime = to.slice(0, -2);

      this.fromTimeConversion = this.fromTime.split(":");
      this.toTimeConversion = this.toTime.split(":");

      this.fromHrs = parseInt(this.fromTimeConversion[0]);
      this.fromMins = parseInt(this.fromTimeConversion[1]);

      this.toHrs = parseInt(this.toTimeConversion[0]);
      this.toMins = parseInt(this.toTimeConversion[1]);

      this.fromTimeObj = {
        hour: this.fromHrs,
        minute: this.fromMins,
        second: 0,
      };
      this.toTimeObj = { hour: this.toHrs, minute: this.toMins, second: 0 };

      this.businesshrsData.push({
        sno: uuidv4(),
        day: day,
        fromtime: this.fromTimeObj,
        totime: this.toTimeObj,
        totalhrs: this.calculateWorkingHours(from, to),
        isSelected: false,
      });
    });
  }

  calculateWorkingHours(fromTime: string, toTime: string) {
    // Split the time strings to get hours and minutes
    const [fromHourStr, fromMinStr] = fromTime.split(":");
    const [toHourStr, toMinStr] = toTime.split(":");

    // Convert hours and minutes to numbers
    const fromHour = parseInt(fromHourStr);
    const fromMin = parseInt(fromMinStr);
    const toHour = parseInt(toHourStr);
    const toMin = parseInt(toMinStr);

    // Calculate total minutes for each time
    const fromTotalMinutes = fromHour * 60 + fromMin;
    const toTotalMinutes = toHour * 60 + toMin;

    // Calculate the total working hours and minutes
    let totalMinutes = toTotalMinutes - fromTotalMinutes;

    // Adjust for negative result (end time is on the next day)
    if (totalMinutes < 0) {
        totalMinutes += 24 * 60; // Add 24 hours in minutes
    }

    // Convert total minutes back to hours and minutes
    const workingHours = Math.floor(totalMinutes / 60);
    const workingMinutes = totalMinutes % 60;

    // Format the result as HH:MM string
    return `${workingHours}:${workingMinutes < 10 ? '0' : ''}${workingMinutes}`;
}



  handleCheckboxChange(event: boolean) {
    this.businesshrsData.forEach((t) => (t.isSelected = event));
  }

  handleSingleCheckboxChange(event: boolean, item: DayObject) {
    item.isSelected = event;
    const allChecked = this.businesshrsData.every((item) => item.isSelected);
    this.isCheckall = allChecked;
    // console.log("IsCheckAll:>>",this.isCheckall)
  }

  unsorted(a: any, b: any) {
    return 0;
  }

  getFromTime(data: string) {
    const parts = data.split("-");
    return parts[0];
  }

  getToTime(data: string) {
    const parts = data.split("-");
    return parts[1];
  }

  saveData() {
    if (this.businessHoursForm.valid) {
      let selectedData = this.businesshrsData.filter((item) => item.isSelected);

      let daysObject: any = {};
      selectedData.forEach((item) => {
        const meridiem = item.fromtime.hour < 12 ? 'AM' : 'PM';
        const meridiemEnd = item.totime.hour < 12 ? 'AM' : 'PM';
        const startTime = `${item.fromtime.hour}:${item.fromtime.minute}${meridiem}`;
        const endTime = `${item.totime.hour}:${item.totime.minute}${meridiemEnd}`;      
        daysObject[item.day] = `${startTime}-${endTime}`;
      });

      this.businessHrsSavedData = {
        businessHoursType: this.businessHoursForm.value.businessHours,
        timeZone: this.businessHoursForm.value.timeZone,
        fallBackMessage: this.businessHoursForm.value.feedback,
        days: daysObject,
      };
      this.data = this.businessHrsSavedData.days


      this.businessHoursForm.reset();
      this.businesshrsData.forEach((t) => (t.isSelected = false));
      this.isCheckall = false;

      console.log("Selected Data:", this.businessHrsSavedData);
    } else {
      return;
    }

    this.businessHours = true
  }

  editBusinessHrsForm() {
    this.businessHours = false;

    this.businessHoursForm.patchValue({
        businessHours: this.businessHrsSavedData.businessHoursType,
        timeZone: this.businessHrsSavedData.timeZone,
        feedback: this.businessHrsSavedData.fallBackMessage
    });
    this.businesshrsData.forEach((item) => {    
       const dayData = this.businessHrsSavedData.days[item.day];
        
        if (dayData) {
            item.isSelected = true;
            const [startTime, endTime] = dayData.split("-");
            const [fromHour, fromMin, fromMeridiem] = startTime.split(/:|(?=[ap]m)/i);
            const [toHour, toMin, toMeridiem] = endTime.split(/:|(?=[ap]m)/i);
           // console.log(toHour,toMin,toMeridiem)
            item.fromtime = { hour: parseInt(fromHour), minute: parseInt(fromMin), second: 0, meridian: fromMeridiem };
            item.totime = { hour: parseInt(toHour), minute: parseInt(toMin), second: 0, meridian: toMeridiem };
            
        } else {
            item.isSelected = false;
            item.fromtime = { hour: 0, minute: 0, second: 0, meridian: 'AM' };
            item.totime = { hour: 0, minute: 0, second: 0, meridian: 'AM' };
        }
    });

        const allChecked = this.businesshrsData.every((item) => item.isSelected);
        this.isCheckall = allChecked;
}


  cancel(event: any) {
    event.preventDefault();
    this.businessHoursForm.reset();
    this.businesshrsData.forEach((t) => (t.isSelected = false));
    this.isCheckall = false;
    this.businessHours = true;
  }

  toggleChange(event:boolean) {
    const isCheckedAll = this.chatWindowData.images.filter((t:any) => t.enabled === true);
    if(isCheckedAll.length == this.chatWindowData.images.length){
      this.chatWindowData.fullAccess = true;
    } else {
      this.chatWindowData.fullAccess = false;
    }
  }

  toggleFullAccess(event: boolean) {
    this.chatWindowData.images.forEach((image: any) => {
      image.enabled = event;
    });
  }

  saveConfigurations() {   
    this.chatWindowData.images.forEach((image: any) => {
      this.chatWindowConfigurations[image.value] = image.enabled; 
    });
    this.chatWindowData.images.forEach((image: any) => {
      image.enabled = false;
    });

    this.chatWindowData.fullAccess = false;

    console.log(this.chatWindowConfigurations);
    
  }

  toggleCancel(){
    this.chatWindowData.images.forEach((image: any) => {
      image.enabled = false;
      this.chatWindowData.fullAccess = false;
    });
  }

  disabletoggleBtn():boolean{
    return this.chatWindowData.images.some((j: any) => j.enabled);
  }

  toggleAllCheckboxes(event: any) {
    const isChecked = event;
    this.channelData.forEach(channel => {
        channel.hasAccess = isChecked;
        channel.canCreate = isChecked;
        channel.canView = isChecked;
        channel.canUpdate = isChecked;
        channel.canDelete = isChecked;
  });
}

toggleCheckbox(index: number) { 
  const isChecked = this.channelData[index].hasAccess;
  this.channelData[index].canCreate = isChecked;
  this.channelData[index].canView = isChecked;
  this.channelData[index].canUpdate = isChecked;
  this.channelData[index].canDelete = isChecked;

  this.selectAllChecked = this.channelData.every(channel => channel.hasAccess);
 
}


submitChanges() {
  this.channelData.forEach(channel => {
    const channelKey = channel.value;
    if(this.channelWindowData[channelKey]) {
      this.channelWindowData.fullControl = this.selectAllChecked
      this.channelWindowData[channelKey].hasAccess = channel.hasAccess
      this.channelWindowData[channelKey].canCreate = channel.canCreate;
      this.channelWindowData[channelKey].canView = channel.canView;
      this.channelWindowData[channelKey].canUpdate = channel.canUpdate;
      this.channelWindowData[channelKey].canDelete = channel.canDelete;

      if(this.channelWindowData[channelKey].hasAccess){
        this.channelWindowData[channelKey].fullControl = true;
      }
      else{
        this.channelWindowData[channelKey].fullControl = false;
      }
      
    }
    else{
      return
    } 
  });

  console.log(this.channelWindowData);
}

cancelCheckBoxes(){
  this.channelData.forEach(channel => {
    channel.hasAccess = false;
    channel.canCreate = false;
    channel.canView = false;
    channel.canUpdate = false;
    channel.canDelete = false;
});
this.selectAllChecked = false;
};


disableCheckBoxBtn(): boolean {
  return this.channelData.some(channel => channel.hasAccess);
}


  open(content:any) {
		this.modalService.open(content);
	}

onSelect(){
  console.log(this.selecteditems);
   this.selecteditems = [];
}



}
