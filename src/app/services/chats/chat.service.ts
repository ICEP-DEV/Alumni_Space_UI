import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";

import { chatUrl } from 'config';

//models
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  public message$: BehaviorSubject<Message> = new BehaviorSubject({ date: '', room: '', sender: '', text: 'Welcome to Alumni Space Chat. Search your contacts on Networks. create new groups by clicking on New Group. And click on a contact or group to chat.' });
  public temp: User = { account_id: 2, name: "Sboniso Ngcobo", email: "rr", password: "rr", role: "alumni" };

  constructor() { }

  socket = io(`${chatUrl}`);

  public sendMessage(message: Message) {
    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (message: Message) => {
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };
  public getContact() {

    this.socket.on('currentUser', (user) => {
      localStorage.setItem('userid', user.id.toString());
      localStorage.setItem('username', user.name);

    });

  };
  public getContacts() {

    this.socket.on('userList', (list) => {
      localStorage.setItem('contacts', JSON.stringify(list));
    });

  };
  public saveGroup(group: any) {

    this.socket.emit('saveGroup', group);

  };
  public joinRoom(room: string) {
    this.socket.emit('joinRoom', room);
  }

  public leaveRoom(room: string) {
    this.socket.emit('leaveRoom', room);
  }

  public setUser(): any {
    this.socket.on('userDetails', (dbuser) => {


      return { id: dbuser.id, email: dbuser.email, name: dbuser.name, password: dbuser.password }
    });

  }
}
