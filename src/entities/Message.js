import { v4 as uuid } from "uuid"
import { User } from "./User.js";

const messages = []

export class Message {
    id = uuid();
    to = ""
    from = ""
    message = ""
    dateSent = new Date();

    constructor({ to, from , message }){
        this.to = to;
        this.from = from;
        this.message = message;
    }

    /**
     * Saves the message
     * @example 
     * const newMessage = new Message({}, {}, "Hello World");
     * newMessage.save()
     */
    save(){
        messages.push(this);
        return this;
    }
}

/**
 * Returns all the messages
 */
Message.all = function(){
    return messages;
}

Message.getMessagesForUser = function(id){
    const user = User.findById(id);


    if(user){
        return messages.filter(message => message.to === user.id || message.from === user.id)
    }

    return []
}