import React,{useState,useEffect,useRef} from "react";
// import socket from "../../../Services/socket"
import { IoIosSend } from "react-icons/io";
import {io,Socket} from "socket.io-client"
import { getMessages,newMessage} from  "../../../Api/user"
import { useSelector } from 'react-redux'
import {format} from 'timeago.js'

interface RootState{
  auth:{
    userId:string
  }
}

interface Message{
  senderId:string,
  text:string,
  createdAt:string,
  // sender:string,
  conversationId:string
}
 
interface props{
  setChatBox(value:boolean):void
  conversationId:string
  parlourId:string | undefined
} 

interface MessageType{
  senderId:string,
sender:string,
text:string,
// createdAt:Date,
createdAt:string,

conversationId:string
}


const Chat = ({setChatBox,conversationId,parlourId}:props) => {
  const [messages,setMessages] = useState<MessageType[]>([])
  const [message,setMessage] = useState('')
  // const [user,setUser] = useState('')
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [arrivalMessage,setArrivalMessage] = useState<MessageType |null>(null)
  // const [parlour,setParlour] = useState<MessageType | null>(null)
  const [images,setImages] = useState<string[]>([])
  const socket = useRef<Socket | undefined>()

  useEffect(()=>{
  socket.current = io(import.meta.env.VITE_APP_CHATURL)
    socket.current.on('getMessage',data =>{
      setArrivalMessage({
        sender : data.senderId,
        text: data.text,
        // createdAt :Date.now(),
        createdAt: new Date().toISOString(), 
        conversationId: conversationId
      } as MessageType);
    });
    socket.current.on("image", (imageData) => {
      
      if (!images.some((img) => img === imageData)) {
        setImages((prevImages: string[]) => [...prevImages, imageData]);
      }
    });
    
  },[])

  useEffect(()=>{
    arrivalMessage && 
    setMessages(prev => [...prev,arrivalMessage] )
  },[arrivalMessage])

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('userId')as string)
    socket.current?.emit('addUser',user)
  },[])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userId') as string);
        console.log( userInfo);
  
        // Getting parlour details for showing the name
        // console.log(conversationId)
        // const response = await getConversations(conversationId);
        // const data = response
        // console.log('conversationData', data);
        // const parlourId = data.members.find((mem: string) => mem !== userInfo);
        // const parlourResponse = await singleParlourDetails(parlourId);
        // const parlour = parlourResponse?.data.data;
        // console.log('parlourData', parlour);
        // setParlour(parlour);
  
        // Getting chats
        const messageResponse = await getMessages(conversationId);
        const messages = messageResponse?.data
        console.log('messages', messages);
        setMessages(messages);
  
        // Set user state
        // setUser(userInfo);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, [conversationId]);

  //taking userid 
  const {userId} = useSelector((state:RootState) =>state.auth)
  
  const sendMessage =async(e:React.FormEvent<HTMLFormElement>) =>{
  try{
    e.preventDefault();

    if(message.trim().length !==0 && message[0]!==' '){
      const res = await newMessage(message,conversationId,userId)
      socket.current?.emit("sendMessage",{
        senderId:userId,
        receiverId:parlourId,
        text:message
      })

      if(res?.data){
        setMessages([...messages,res.data])
        setMessage('')
      }
    }
  }catch(error){
    console.log(error)
  }
  }

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior:'smooth'})
  },[messages])
  return (
    <>
    
        <div
          className="bg-gray-200 fixed bottom-0 right-0 m-10 border  flex-grow flex flex-col border-gray-500 rounded"
          style={{ width: "25%", height: "75%" }}
        >
            <div className="bg-gray-600 p-3 text-white  font-bold flex justify-between">
              <p>Messages</p>
              <button onClick={()=>setChatBox(false)}>X</button>
              </div> 

           

  {/* Component Start */}
  <div  className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
    <div className="flex flex-col flex-grow h-0 p-4 overflow-auto no-scrollbar">

    { messages && messages.map ((message:Message,index:number) =>(
<>
{message.senderId === userId ?
<div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end" key={index} ref={index ===messages.length-1  ? scrollRef : null}>
<div>
  <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
    <p className="text-sm">{message.text}.</p>
  </div>
  <span className="text-xs text-gray-500 leading-none">{format(message.createdAt)}</span>
</div>
</div>

:
      <div className="flex w-full mt-2 space-x-3 max-w-xs" key={index} ref={index ===messages.length-1  ? scrollRef : null}>
        <div>
          <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
            <p className="text-sm">
             {message.text}
            </p>
          </div>
          <span className="text-xs text-gray-500 leading-none">{format(message.createdAt)}</span>
        </div>
      </div>
}


      </>
    ))} 

    {images.map((imageData, index) => (
      arrivalMessage?.sender !== userId && (
        <div className="flex justify-start" key={index} style={{height:'100px',width:'150px'}}>
          <img
            src={imageData}
            className="object-contain w-full h-full"
            alt="Received Image"
          />
        </div>
      )
    ))}


     
      
      {/*<div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
        <div>
          <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
            </p>
          </div>
          <span className="text-xs text-gray-500 leading-none">2 min ago</span>
        </div>
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300" />
      </div>
      <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
        <div>
          <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </p>
          </div>
          <span className="text-xs text-gray-500 leading-none">2 min ago</span>
        </div>
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300" />
      </div>
      <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
        <div>
          <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
            <p className="text-sm">Lorem ipsum dolor sit amet.</p>
          </div>
          <span className="text-xs text-gray-500 leading-none">2 min ago</span>
        </div>
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300" />
      </div>
      <div className="flex w-full mt-2 space-x-3 max-w-xs">
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300" />
        <div>
          <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
            </p>
          </div>
          <span className="text-xs text-gray-500 leading-none">2 min ago</span>
        </div>
      </div>
      <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
        <div>
          <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
            <p className="text-sm">Lorem ipsum dolor sit.</p>
          </div>
          <span className="text-xs text-gray-500 leading-none">2 min ago</span>
        </div>
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300" />
      </div> */}
    </div>
    <form onSubmit={sendMessage} className="bg-gray-300 p-4 flex justify-between">
      <input
        className="flex items-center h-10 w-full rounded px-3 text-sm "
        type="text"
        placeholder="Type your message…"
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
      />
      <button type="submit"><IoIosSend  className="text-2xl"/></button>
    </form>
  </div>
        </div>
      </>
  );
};

export default Chat;
