"use strict";(self.webpackChunkTut_Alumni_SpaceUI_app=self.webpackChunkTut_Alumni_SpaceUI_app||[]).push([[592],{9171:(d,c,i)=>{i.d(c,{P:()=>r});var l=i(8986),s=i(5879),_=i(9862);let r=(()=>{var n;class a{constructor(t){this.http=t,this.isResultLoaded=!1,this.events=[],this.apiUrl=`${l.FH}/events`,this.id="",this.event_title=" ",this.event_description="",this.event_date=" "}addEvent(t){this.events.push(t),this.saveEventsToLocalStorage();const e=new FormData;e.append("file",t.image),e.append("event_title",t.title),e.append("event_description",t.description),e.append("event_date",t.eventDate),this.http.post(`${this.apiUrl}/add`,e).subscribe(h=>{console.log(h),alert("Event Added Successfully"),this.getAllEvents()})}getAllEvents(){this.http.get(`${this.apiUrl}`).subscribe(t=>{this.events=t.events,localStorage.setItem("events",JSON.stringify(t.events))})}getEvents(){return this.loadEventsFromLocalStorage(),this.events}getEventsAll(){return this.http.get(`${this.apiUrl}`)}updateEvent(){}deleteEvent(t){this.http.delete(`${this.apiUrl}/delete/`+t).subscribe(e=>{console.log(e),alert("Event Deleted")})}saveEventsToLocalStorage(){localStorage.setItem("events",JSON.stringify(this.events))}loadEventsFromLocalStorage(){const t=localStorage.getItem("events");t&&(this.events=JSON.parse(t))}getEventCount(){return this.http.get(`${this.apiUrl}/count_event`)}}return(n=a).\u0275fac=function(t){return new(t||n)(s.LFG(_.eN))},n.\u0275prov=s.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),a})()},2010:(d,c,i)=>{i.d(c,{T:()=>a});var l=i(8645),s=i(5619),_=i(8986),r=i(5879),n=i(9862);let a=(()=>{var o;class t{constructor(e){this.http=e,this.apiUrl=`${_.FH}/notifications`,this.notificationId=0,this.newNotificationReceived=new l.x,this.unreadNotificationCountSource=new s.X(0),this.unreadNotificationCount$=this.unreadNotificationCountSource.asObservable()}updateNotificationId(){this.notificationId+=1,this.newNotificationReceived.next(!0)}decreaseNotificationId(e){this.notificationId>=e?this.notificationId-=e:this.notificationId=0}getNotificationId(){return this.notificationId}getNewNotificationReceived(){return this.newNotificationReceived}updateUnreadNotificationCount(e){this.unreadNotificationCountSource.next(e)}sendNotification(e){return console.log("Services "+e),this.http.post(`${this.apiUrl}/send`,e)}getMyNotifications(){const e=localStorage.getItem("account_id");return this.http.get(`${this.apiUrl}/get_my_notifications/${e}`)}}return(o=t).\u0275fac=function(e){return new(e||o)(r.LFG(n.eN))},o.\u0275prov=r.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),t})()},141:(d,c,i)=>{i.d(c,{E:()=>r});var l=i(8986),s=i(5879),_=i(9862);let r=(()=>{var n;class a{constructor(t){this.http=t,this.apiURL=`${l.FH}/queries`,this.Query=[]}getQueries(){return this.http.get(`${this.apiURL}/get_queries`)}}return(n=a).\u0275fac=function(t){return new(t||n)(s.LFG(_.eN))},n.\u0275prov=s.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),a})()}}]);