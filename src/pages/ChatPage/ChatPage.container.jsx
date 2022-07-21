import "./ChatPage.styles.scss";

import { Message as MessageModel } from "../../models/Message";
import { useUser } from "../../contexts/UserContext";
import { useState } from "react";
import { useEffect } from "react";
import { ChatPage as Component } from "./ChatPage.component";

export function ChatPage() {
  const { user, clearUser } = useUser();
  const [state, setState] = useState([]);
  const [drone, setDrone] = useState(null);
  const [error, setError] = useState(null);
  const [joinedRoom, setJoinedRoom] = useState(false);
  const [countMember, setCountMember] = useState([]);
  
  const sendMessage = (formState) => {
    const message = new MessageModel({
      messageText: formState.message,
      user,
    });

    if (drone !== null) {
      drone.publish({
        room: 'observable-chat',
        message: message,
      });
    }
  }

  useEffect(() => {
    if (drone !== null) return;
    setDrone(new window.Scaledrone('aC1vqpO2aEavkoXU'));
  }, [drone, setDrone]);

  useEffect(() => {
    if (drone === null) return;

    const room = drone.subscribe('observable-chat');

    room.on('open', error => {
      if (error) {
        return setError(error);
      }
      setJoinedRoom(true);
    });
  
    room.on('message', message => {
      console.log('Message received', message);

      setState((state) => [
        ...state,
        MessageModel.fromObject({ ...message.data, id: message.id })
      ]);
    });

    room.on('members', members => {
      setCountMember([...members]); 
    });

    room.on('member_join', member => {
      setCountMember((current)=>{
        return [...current,member]
      })
    });

    room.on('member_leave', member => {
      setCountMember((current) => {
        return current.filter((leaveMember) => 
          leaveMember.id !== member.id);
      })
    });

  }, [drone]);


  const numOfMembers = countMember.length;

  return (
    <Component
      messages={state}
      onSendMessage={sendMessage}
      error={error}
      joinedRoom={joinedRoom}
      clearUser={clearUser}
      numOfMembers={numOfMembers}
    />
  );
}


  