import { Subasta } from "./subasta";

export class Message {
    id?: number;
    senderEmail: string;
    time: Date;
    replymessage: string;
    subasta: Subasta;
    
    constructor(senderEmail: string, time: Date, replymessage: string, subasta:Subasta) {
      this.senderEmail = senderEmail;
      this.time = time;
      this.replymessage = replymessage;
      this.subasta = subasta;
    }
    
  }
