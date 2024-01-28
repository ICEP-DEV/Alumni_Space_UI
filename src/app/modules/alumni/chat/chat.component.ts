import { Component } from '@angular/core';
import { Router } from '@angular/router';

//models
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';

//service
import { ChatServiceService } from 'src/app/services/chats/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  newMessage: Message={date: new Date().toLocaleString(),room:"",sender:"ChatBot",text:""};

  messageList: Message[] = [];
  date: string= new Date().toLocaleString();
  currentDate:string='';
  selectedUser='';
  room:string='dafault';
  user: User= { account_id: 0, name: '', email: '', password: '', role: '' };
  filtedUsers:User[]=[]
  _filterText:string='';
  groupName:string="";
  sender=localStorage.getItem('account_id');
  username=localStorage.getItem('name');
  gID:number=100;
  count:number=0;
  container: HTMLElement| null = null;
  
  get filterText(){
    return this._filterText;
  }

  set filterText(value:string){
    this._filterText=value;
    this.filtedUsers=this.filterContacts(value);
  }
  //must be fetched from the database
  contacts: User[] =[
 
];    


  constructor(private chatService: ChatServiceService, private router: Router){
    chatService.getContact();
 


  }
  onDestroy(){
    this.chatService.leaveRoom(this.room);
    this.chatService.message$.next({ date: '', room: '', sender: '', text: '' });
  }

  ngOnInit(){
 


    //Output message to DOM
   

    //this.sender=localStorage.getItem('userid');
    //this.username=localStorage.getItem('username');
    this.chatService.getNewMessage().subscribe((message: Message) =>  {
      if(message.room==this.room){
     
        message.date=this.getCurentDate();
        if(message.sender ===this.sender){//must be changed to student number
          message.sender="messageYou"
        }else{
          message.sender="messageThem"
        }
     
        this.messageList.push(message);
    
      }

    })
  
    this.chatService.getContacts();
    var tempList=JSON.parse(localStorage.getItem('contacts')  ?? '[]');

    tempList.forEach((element: User) => {
      this.contacts.push({
        account_id: element.account_id,
        email: element.email,
        password: element.password,
        name: element.name,
        role: element.role,
      });
    });
    
    this.filtedUsers=this.contacts;

  }
 

  getCurentDate():string{
    this.currentDate= new Date().toLocaleString().substring(12);
    return this.currentDate;

  }
  sendMessage() {

    if(this.newMessage.text != ""){
      this.newMessage.room=this.room;
      this.newMessage.sender=this.sender ?? '';//must be chang to student number
      this.chatService.sendMessage(this.newMessage);
      this.newMessage.text='';

    }

 
  }
  selectContact(name:string,id:string,role:string){

    const temp=document.getElementById("selected");
    if(temp){
      temp.textContent=name;

    this.chatService.leaveRoom(this.room);
    
      if(this.sender && id > this.sender){
        this.room=id+this.sender;
    }else{
      this.room=this.sender+id;
    }

    

      
   this.chatService.joinRoom(this.room);
   this.messageList=[];


    }

  
  }
  filterContacts(filterTerm:string){
    if(this.contacts.length === 0 || this._filterText === '' ){
      return this.contacts;
    }else{
      return this.contacts.filter((user:User) =>
      {
        return user.name.toLowerCase().includes(filterTerm.toLowerCase())
      }
      )
    }

  }
  newGroup(){
    const modal = document.getElementById("group-modal");
    if(modal)
    modal.style.display="block";

  }
  cancelAdd(){
    const modal = document.getElementById("group-modal");
    if(modal)
    modal.style.display="none";
  }
  addGroup(){
    //this.chatService.saveGroup({name:this.groupName,description:"2222",participants:"22",role:"group"})
    this.contacts.push({account_id:this.gID,name:this.groupName,email:"",password:"",role:"alumni"});
    this.groupName='';
    this.gID+=1;
  }
  
  returnHome(){
    this.router.navigate(['/alumni/home']);
  }
}

