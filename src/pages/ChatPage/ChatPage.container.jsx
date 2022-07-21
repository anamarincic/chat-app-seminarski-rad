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
  const [countMembers, setCountMembers] = useState([]);

  const sendMessage = (formState) => {
    const message = new MessageModel({
      messageText: formState.message,
      user,
    });

    if (drone !== null) {
      drone.publish({
        room: 'chat',
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

    const room = drone.subscribe('chat');

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
  }, [drone]);

  useEffect(() => {
    if(drone === null) return;

    const observableRoom = drone.subscribe('observable-room');

    observableRoom.on('open', function(error) {
      if (error) {
        return setError(error);
      }
      setJoinedRoom(true);
    });

    observableRoom.on('members', members => {
      setCountMembers((countMembers) => [
        ...countMembers, members
      ]);
      
    });
  }, [drone]);

  console.log(countMembers);

  return (
    <Component
      messages={state}
      onSendMessage={sendMessage}
      error={error}
      joinedRoom={joinedRoom}
      clearUser={clearUser}
      member={countMembers.length}
    />
  );
}