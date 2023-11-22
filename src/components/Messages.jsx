
// import { AuthContext } from "../context/AuthContext";
// import React, { useContext, useEffect, useState } from "react";
// import Message from "./Message";
// import { ChatContext } from "../context/ChatContext";
// import { db } from "../firebase";
// import { onSnapshot, doc } from "firebase/firestore";

// const Messages = () => {
//     const { data } = useContext(ChatContext);
//     const [messages, setMessages] = useState([]);
//     const { chatId } = data;
//     console.log(data)
//     const {currentUser} = useContext(AuthContext)
//     const {dispatch} = useContext(ChatContext)

//     useEffect(() => {
//         const q = doc(db, "chats", data.chatId);
//         const unsubscribe = onSnapshot(q, (doc) => {
//             if (doc.exists()) {
//                 const messages = doc.data().messages;
//                 setMessages(messages);
//             }
//         });
//         return unsubscribe;
//     }, []);




//   return (
//     <div className="messages">
//      {
//         messages.map((m) => (
//           <Message message={m} key={m.id} />
//         ))
//       }
//     </div>
//   );
// };

// export default Messages;








import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { ChatContext } from "../context/ChatContext";
import {db} from "../firebase";
import { onSnapshot,doc } from "firebase/firestore";
const Messages = () =>{
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);
    // console.log("chatdata",data)
    useEffect(()=>{
        const unSub = onSnapshot(doc(db,"chats",data.chatId), (doc)=>{
            doc.exists() && setMessages(doc.data().messages)
        });
        return ()=>{
            unSub();
        };
    },[data.chatId]);
     console.log("msg",messages)
    return(
        <div className="messages">
           {messages.map(m=>(
            <Message message={m} key={m.id}/>
           ))}
        </div>
    )
}

export default Messages;