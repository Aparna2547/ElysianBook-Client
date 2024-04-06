import React,{useEffect,useState} from 'react'
import {useSelector} from "react-redux"
import {findUserById} from '../../Api/parlour'

interface RootState{
    auth:{
        parlourId:string
    }
}
interface Props{
    conversation:object;
    handleClick(conversationId:string):void
    setReceiver(id:string):void
}
 const ChatUserList = ({conversation,handleClick,setReceiver}:Props) => {
    const [users,setUsers] = useState([])

    const {parlourId} = useSelector((state:RootState)=>state.auth)

    useEffect(()=>{
        const fetchData = async () =>{
            const filteredMembers = conversation.members.filter(mem => mem !==parlourId)
            // console.log('this is',filteredMembers)
            const res = await findUserById(filteredMembers)
            console.log('jdfks',res.data.data);
            setUsers(res.data.data)
        }
        fetchData()
    },[])


    const Conversation=  (conversationId:string,userId:string) =>{
        setReceiver(userId)
        handleClick(conversationId)
    }


  return (
    <>
        <div onClick={()=>Conversation(conversation._id,users._id)} className="flex flex-row py-4 px-2 gap-2 items-center border-b-2 overflow-y-auto max-h-[300px] cursor-pointer">
          <div className="">
            <img
              src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
              className="object-cover h-12 w-12 rounded-full"
              alt=""
            />
          </div>
          <div className="">
            <div className="text-md">{users.name}</div>
          </div>
        </div>
        
    </>
  )
}

export  default ChatUserList