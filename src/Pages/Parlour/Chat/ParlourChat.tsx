import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../../Components/Parlour/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { getParlourConversations } from "../../../Api/parlour";
import ChatUserList from "../../../Components/Parlour/ChatUserList";
import { getMessages ,newMessage} from "../../../Api/user";
import {format} from 'timeago.js'
import { IoSend } from "react-icons/io5";



interface RootState {
  auth: {
    parlourId: string;
  };
}

interface MessageType {
  sender: string;
  text: string;
  createdAt: Date;
  conversationId: string;
}

const ParlourChat = () => {
  const [messages, setMessages] = useState([]);
  const [conversations, setConversation] = useState([]);
  const [message, setMessage] = useState("");
  const [parlour, setParlour] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState<MessageType | null>(
    null
  );
  const [conversationId,setConversationId] = useState('')
  const [receiver,setReceiver] = useState('')
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const { parlourId } = useSelector((state: RootState) => state.auth);
  console.log("parlour", parlourId);

  const socket = useRef<Socket | undefined>();

  useEffect(() => {
    socket.current = io("ws://localhost:3000");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      } as MessageType);
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      setMessages((prev) => [...prev, arrivalMessage] as Message[]);
  }, [arrivalMessage]);

  useEffect(() => {
    const parlour = JSON.parse(localStorage.getItem("vendorId") as string);
    console.log('parlourgfg',parlour)
    socket.current?.emit("addUser", parlour);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getParlourConversations(parlourId);
      console.log("dsdsd", res.data);
      setConversation(res.data);
    };
    fetchData();
  }, []);

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior:'smooth'})
  },[messages])

  const handleClick = async (conversationId:string) =>{
    setConversationId(conversationId)
    const res = await getMessages(conversationId)
    console.log('sdkjsjk',res)
    setMessages(res.data)
  }

  const sendMessage = async (e:React.FormEvent<HTMLFormElement>) =>{
    try{
      e.preventDefault(); 

      if(message.trim().length !==0 && message[0] !==' '){
        console.log('parlourchat send message')
        const res = await newMessage(message,conversationId,parlourId)
        console.log('res new',res)

        socket.current?.emit("sendMessage",{
          sendorId:parlourId,
          receiverId:receiver,
          text:message
        })

        if(res.data){
          setMessages([...messages,res.data])
          setMessage('')
        }
      }
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className="flex">
      <>
        <Sidebar />
        {/* This is an example component */}
        <div className="px-3 m-3 w-full">
          <div className="w-full mx-auto shadow-lg h-screen scroll border border-gray-500 px-5">
            {/* headaer */}
            <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
              <div className="font-semibold text-2xl">Messages</div>

              <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
                RA
              </div>
            </div>
            {/* end header */}
            {/* Chatting */}
            <div className="flex flex-row justify-between bg-white">
              {/* chat list */}
              <div className="flex flex-col w-1/5 border-r-2 overflow-y-auto max-h-[300px]">
                {/* search compt */}
                {/* <div className="border-b-2 py-4 px-2">
          <input
            type="text"
            placeholder="search chatting"
            className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
          />
        </div> */}
                {/* end search compt */}

                {/* user list */}

                {conversations &&
                  conversations.map((conversation) => (
                    <ChatUserList
                      conversation={conversation}
                      handleClick={handleClick}
                      setReceiver = {setReceiver}
                    />
                  ))}

                {/* end user list */}
              </div>
              {/* end chat list */}
              {/* message */}
              <div className=" overflowY-hidden flex flex-col justify-between w-4/5">
                <div className="w-full px-5 overflow-y-auto  no-scrollbar h-96 max-h-96">
                  <div className="flex flex-col mt-5  h-96 max-h-96">

                    {messages && messages.map((message,index) =>(
                        <>
                        {message.senderId === parlourId ?
                         <div className="flex justify-end mb-4" key={index} ref={index ===messages.length-1  ? scrollRef : null}>
                         <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white text-sm">
                           {message.text}
                         </div>
                         <img
                           src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                           className="object-cover h-8 w-8 rounded-full"
                           alt=""
                         />
                       </div>
                       :
                      <>
                       <div className="flex justify-start mb-1 " key={index} ref={index ===messages.length-1  ? scrollRef : null}>
                       <img
                         src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                         className="object-cover h-8 w-8 rounded-full"
                         alt=""
                       />
                       <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-sm text-white">
                        {message.text}
                       </div>

                     </div>
                       <span className="text-xs text-gray-500 leading-none">{format(message.createdAt)} </span>
                      </>
                     }
                    </>
                    ))}


                  </div>
                </div>
  
                  <form onSubmit={sendMessage} className="flex justify-between">
                  <input
                    className="w-full bg-gray-300 py-2 px-3 rounded-xl"
                    type="text"
                    placeholder="type your message here..."
                    value={message}
                    onChange={(e) =>setMessage(e.target.value)}
                  />
                  <button type='submit'><IoSend className="ms-3 text-3xl"/></button>
                </form>
                </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default ParlourChat;
