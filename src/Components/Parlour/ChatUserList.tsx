import {useEffect,useState} from 'react'
import {useSelector} from "react-redux"
import {findUserById} from '../../Api/parlour'

interface RootState{
  auth:{
      parlourId:string
  }
}

interface Conversation{
  _id:string
  members:string[]
}

interface User{
  _id:string,
  id:string,
  name:string
}

interface Props{
    conversation:Conversation;
    handleClick(conversationId:string):void
    setReceiver(id:string):void
    setClicked(value:boolean):void
    setUser(name:string):void
}




 const ChatUserList = ({conversation,handleClick,setReceiver,setClicked,setUser}:Props) => {
    const [users,setUsers] = useState<User[]>([])

    const {parlourId} = useSelector((state:RootState)=>state.auth)

  
    useEffect(() => {
      const fetchData = async () => {
          const usersData = await Promise.all(filteredMembers.map(async mem => {
              const res = await findUserById(mem);
              return res.data.data;
          }));
          setUsers(usersData as User[]);
      };
  
      const filteredMembers = conversation.members.filter(mem => mem !== parlourId);
      fetchData();
  }, [conversation, parlourId]);
  


    const Conversation=  (conversationId:string,userId:string) =>{
        setReceiver(userId)
        handleClick(conversationId)
    }


  return (
    <>
      <div className='border-gray-500'>

    {users.map((user,index) =>(
    <div
    key={index}
    onClick={() => {
       Conversation(conversation._id, user._id);
       setClicked(true);
       setUser(user.name)
    }}
    className="flex flex-row py-1 px-2 gap-2 items-center hover:bg-gray-200 overflow-y-auto max-h-[300px] cursor-pointer"
   >
          <div className="">
            <img
              src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
              className="object-cover h-10 w-10 rounded-full"
              alt=""
            />
          </div>
          <div className="">

            <div className="text-md">{user.name}</div>
          </div>
        </div>

    ))}
      </div>

        
        
    </>
  )
}

export  default ChatUserList