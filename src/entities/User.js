import { v4 as uuid } from "uuid";
import { Message } from "./Message.js";

const users = [];

export class User {
    id = uuid()
    username = ""
    email = ""
    password = ""
    dateJoined = new Date();

    constructor({ username, email, password}){
        this.username = username;
        this.email = email;
        this.password = password;
    }

    /**
     * Saves the user
     * @example 
     * const newUser = new User("JohnDoe", "johndoe@mail.com", "johndoe1234");
     * newUser.save()
     */
    save(){
        users.push(this)
        return this;
    }

    /**
     * Returns the messages for this user
     */
    messages(){
        return Message.getMessagesForUser(this.id)
    }

    sendMessage({ to, message}){
        const newMessage = new Message({ to, from : this.id , message})
        newMessage.save();
        return newMessage;
    }
}

/**
 * Returns all the users
 */
User.all = function(){
    const filteredUsers = users.map((user) => {
        delete user.password;
        return user;
    })

    return filteredUsers;
}



User.findById = function(id){
    return users.find((user) => user.id === id)
}