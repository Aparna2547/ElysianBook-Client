import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../../Components/Parlour/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { getParlourConversations } from "../../../Api/parlour";
import ChatUserList from "../../../Components/Parlour/ChatUserList";
import { getMessages, newMessage } from "../../../Api/user";
import { format } from "timeago.js";
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
  senderId: string;
}

const ParlourChat = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [conversations, setConversation] = useState([]);
  const [message, setMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState<MessageType | null>(
    null
  );
  const [conversationId, setConversationId] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [receiver, setReceiver] = useState("");

  const [clicked, setClicked] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { parlourId } = useSelector((state: RootState) => state.auth);
  console.log("parlour", parlourId);
  const [images, setImages] = useState<string[]>([]);
  const socket = useRef<Socket | undefined>();

  useEffect(() => {
    socket.current = io("ws://localhost:3000");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: new Date(),
        conversationId: data.conversationId,
      } as MessageType);
    });
    socket.current.on("image", (imageData) => {
      setImages((prevImages) => [...prevImages, imageData]);
    });
  }, []);

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    const parlour = JSON.parse(localStorage.getItem("vendorId") as string);
    console.log("parlourgfg", parlour);
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

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleClick = async (conversationId: string) => {
    setConversationId(conversationId);
    setSelectedConversation(conversationId);
    const res = await getMessages(conversationId);
    console.log("sdkjsjk", res);
    setMessages(res.data);
    setClicked(!clicked);
  };

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (message.trim().length !== 0 && message[0] !== " ") {
        console.log("parlourchat send message");
        const res = await newMessage(message, conversationId, parlourId);
        console.log("res new", res);

        socket.current?.emit("sendMessage", {
          sendorId: parlourId,
          receiverId: receiver,
          text: message,
        });

        if (res.data) {
          setMessages([...messages, res.data as MessageType]);
          setMessage("");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      console.log("adljdladjfl");
      const file = e.target.files && e.target.files[0];
      console.log("adljdladjfl", file);

      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result as string;
        socket.current?.emit("image", imageData);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex bg-gray-100">
      <>
        <Sidebar />
        {/* This is an example component */}
        <div className="px-3 m-3 w-full">
          <div className="w-full mx-auto shadow-lg h-screen scroll ">
            {/* headaer */}
            <div className="px-5 py-5 flex justify-between items-center bg-white ">
              <div className="font-semibold text-2xl border border-gray-3 w-full p-2">
                Messages
              </div>
            </div>
            {/* end header */}
            {/* Chatting */}
            <div className="flex flex-row justify-between bg-white p-2">
              {/* chat list */}
              <div className="flex flex-col w-1/5 border  border-gray-400  overflow-y-auto max-h-[500px] ">
                <div className="bg-gray-900 mb-5 p-3 text-white font-bold">
                  Chats
                </div>
                <div>
                  {conversations &&
                    conversations.map((conversation) => (
                      <ChatUserList
                        conversation={conversation}
                        handleClick={handleClick}
                        setClicked={setClicked}
                        setReceiver={setReceiver}
                        setUser={setUser}
                      />
                    ))}
                </div>
                {/* end user list */}
              </div>
              {/* end chat list */}
              {/* message */}
              <div className=" overflowY-hidden flex flex-col justify-between w-4/5 border ms-2 border-gray-300 rounded ">
                {selectedConversation && (
                  <div className="bg-gray-600 text-white font-bold p-3 w-full flex">
                    <img
                      src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                      className="object-cover h-10 w-10 rounded-full"
                      alt=""
                    />
                    <h1 className="ms-3 mt-2">{user}</h1>
                  </div>
                )}
                <div className="w-full px-5 overflow-y-auto  no-scrollbar h-96 max-h-96">
                  <div className="flex flex-col mt-5  h-96 max-h-96">
                    {messages &&
                      messages.map((message, index) => (
                        <>
                          {message.senderId === parlourId ? (
                            <div
                              className="flex justify-end mb-4"
                              key={index}
                              ref={
                                index === messages.length - 1 ? scrollRef : null
                              }
                            >
                              <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white text-sm">
                                {message.text}
                              </div>
                              <img
                                src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                className="object-cover h-8 w-8 rounded-full"
                                alt=""
                              />
                            </div>
                          ) : (
                            <>
                              <div
                                className="flex justify-start mb-1 "
                                key={index}
                                ref={
                                  index === messages.length - 1
                                    ? scrollRef
                                    : null
                                }
                              >
                                <img
                                  src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                  className="object-cover h-8 w-8 rounded-full"
                                  alt=""
                                />
                                <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-sm text-white">
                                  {message.text}
                                </div>
                              </div>
                              <span className="text-xs text-gray-500 leading-none">
                                {format(message.createdAt)}{" "}
                              </span>
                            </>
                          )}
                        </>
                      ))}

                    {images.map((imageData, index) => (
                      <div className="flex">
                        <div className="w-3/6">

                        </div>
                         
                        <div className="flex w-3/6 justify-end" key={index} >
                          <div style={{height:'100px',width:'150px'}} className="bg-blue-300">
                        <img
                          src={imageData}
                          className="object-cover w-full h-full"
                          alt="Received Image"
                        />
                        </div>
                      </div>
                      </div>
                    
                     
                    ))}
                  </div>
                </div>

                {selectedConversation && (
                  <form
                    onSubmit={sendMessage}
                    className="flex justify-between px-2 py-1"
                  >
                    <input
                      className="w-full  py-2 px-3 rounded-xl "
                      type="text"
                      placeholder="type your message here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <label
                      htmlFor="file-upload"
                      className="button text-3xl cursor-pointer"
                    >
                      +
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleFileUpload}
                    />
                    <button type="submit">
                      <IoSend className="ms-3 text-3xl" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default ParlourChat;
