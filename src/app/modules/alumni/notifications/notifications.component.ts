import { Component } from '@angular/core';

import { Router, RouterLink } from '@angular/router';
import { NotificationsService } from 'src/app/services/notification/notifications.service';
import { filesUrl } from 'config';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
  // notificationId: number = 0;
  // isReadnotification: boolean = false;
  // isHideNotifications: boolean = true;
  // timeReplied: string = "";
  queries: any[] = [];

  //new
  //notificationId: number = 0;
  isReadnotification: boolean = false;
  isHideNotifications: boolean = true;
  timeReplied: string = "";

  adminFletter ="A";
  systemFletter = "S";
  isRead?: boolean; // Add the isRead property
  unreadNotificationCount?: number;
  message: string='';
  fullMessage?: string;
  currentDate: Date = new Date();
  dateReceived?: Date;
  sender?: string;

  myNotifications: any[] = [];
  
  constructor( private router: Router, private notificationService: NotificationsService){}
   
  ngOnInit(){
    //get queries
    const storedEvents = localStorage.getItem('queries');
    if (storedEvents) {
      this.queries = JSON.parse(storedEvents);
      console.log(this.queries);
      this.dateReceived = this.currentDate;
      this.sender = "Admin";
    }

    //get notifications
    this.notificationService.getMyNotifications().subscribe((response:any) => {
      //console.log(response.myNotifications);
      this.myNotifications = response.myNotifications;
    });


    /*this.notificationId = this.notificationService.getNotificationId();
  
    this.notificationService.getNewNotificationReceived().subscribe(() => {
      this.notificationId = this.notificationService.getNotificationId();
      // You can add logic here to trigger the notification bell or update UI
      
      // this.getCurrentTimeWithAMPM();
      this.unreadNotificationCount = this.notifications.length;
      // this.setTruncatedMessages();
    });*/



    this.updateTime(),
    setInterval(() => {
      this.updateTime();
    }, 1000)
  }
  


  

  updateTime() {
    let now = new Date();
    this.timeReplied = this.getCurrentTimeWithAMPM(now);
    // .toTimeString().split(' ')[0];
  } 

  getCurrentTimeWithAMPM(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const isPM = hours >= 12;
    const AMPM = isPM ? 'PM' : 'AM';

    // Convert to 12-hour format
    const displayHours = hours % 12 || 12;

    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${AMPM}`;
  }

  notifications = [
    {
      id:1,
      sender: "Admin",
      subject: "Career guide",
      message: "you are invited to the annu....",
      //message: this.queries[0].query,
      date: this.currentDate,//replace with real
      time: this.timeReplied,//replace with real
      isRead: false,
      truncatedMessage: '',
    },
    {
      id:2,
      sender: "Kfefe",
      subject: "Enquiry response",
      message: "We have received your enquiry, we will get back to you shortly!",
      date: "10/11/2023",//replace with real
      time: this.timeReplied,//replace with real
      isRead: false,
      truncatedMessage: '',
    },
    {
      id:3,
      sender: "XAe",
      subject: "Enquiry response",
      message: "We have received your enquiry, we will get back to you shortly!",
      date: "10/11/2023",//replace with real
      time: this.timeReplied,//replace with real
      isRead: false,
      truncatedMessage: '',
    },
  ];

    //new Functions to truncate a message to a specific length starts here
    truncateMessage(message: string, maxLength: number): string {
      return message.length > maxLength
        ? message.substring(0, maxLength) + '...'
        : message;
    }
    // setTruncatedMessages(): void {
    //   for (const notification of this.queries) {
    //     notification.message = this.truncateMessage(
    //       notification.response,
    //        20
    //     );
    //   }
    // }
    
    onNotificationClick(index: number): void {
      this.selectedNotificationIndex = index;
      this.myNotifications[index].isRead = true;
      // this.UnreadNotificationCount();
      this.unreadNotificationCount = this.calculateUnreadNotificationCount()
  
    }
    
  
    selectedNotificationIndex: number | null = null;
    isReadNotification(index: number): boolean {
      return this.myNotifications[index].isRead;
      
  }
  isSelectedNotification(index: number): boolean {
    return this.selectedNotificationIndex === index;
  }
  
  
  readNotification(index: number): void {
    if (!this.myNotifications[index].isRead) {
      this.myNotifications[index].isRead = true;
      this.selectedNotificationIndex = index;
    }
  }
  
  private calculateUnreadNotificationCount(): number {
    // Logic to calculate unread notification count
    return this.myNotifications.filter(notification => !notification.isRead).length;
  }
 
  markAllAsRead() {
    this.myNotifications.forEach(notification => {
      if (!notification.isRead) {
        notification.isRead = true;
      }
    });
  
    // Update the service with the new count
    this.unreadNotificationCount = this.myNotifications.filter(notification => !notification.isRead).length;
    this.notificationService.updateUnreadNotificationCount(this.unreadNotificationCount);
  }
  

  returnHome(){
    this.router.navigate(['/alumni/home']);
  }
  backtoNot(): void {
    this.selectedNotificationIndex = null;
}

  /*getSenderImage(sender: string): string {
    // Example logic, replace with your actual logic
    switch (sender) {
      case 'Sihle':
        return 'assets/Sihle.jpg';
      case 'Sneh':
        return 'assets/Sneh.jpg';
      // Add more cases as needed
      default:
        return 'assets/aboutPic.jpg';
    };
  }*/

  imageUrl = `${filesUrl}/uploads/pics/profiles`

  getSenderImage(picFile: string): string {

    const defaultPicture = 'default-avatar.jpg';

    //return `${this.imageUrl}/${picFile}`;

    if (picFile && picFile.trim() !== '') {
      return `${this.imageUrl}/${picFile}`;
    } else {
      return `${this.imageUrl}/${defaultPicture}`;
    }
  }
}
