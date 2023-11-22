import React, { useContext, useState } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  // const handleSend = async () => {
  //   console.log("handlesend")
  //   if (img) {
  //     const storageRef = ref(storage, uuid());

  //     const uploadTask = uploadBytesResumable(storageRef, img);

  //     uploadTask.on(
  //       (error) => {
        
  //       },
  //       () => {
  //         console.log("hello")
  //         getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
  //           await updateDoc(doc(db, "chats", data.chatId), {
  //             messages: arrayUnion({
  //               id: uuid(),
  //               text,
  //               senderId: currentUser.uid,
  //               date: Timestamp.now(),
  //               img: downloadURL,
  //             }),
  //           });
  //         });
  //       }
  //     );
  //   } else {
  //     await updateDoc(doc(db, "chats", data.chatId), {
  //       messages: arrayUnion({
  //         id: uuid(),
  //         text,
  //         senderId: currentUser.uid,
  //         date: Timestamp.now(),
  //       }),
  //     });
  //   }

  //   await updateDoc(doc(db, "userChats", currentUser.uid), {
  //     [data.chatId + ".lastMessage"]: {
  //       text,
  //     },
  //     [data.chatId + ".date"]: serverTimestamp(),
  //   });

  //   await updateDoc(doc(db, "userChats", data.user.uid), {
  //     [data.chatId + ".lastMessage"]: {
  //       text,
  //     },
  //     [data.chatId + ".date"]: serverTimestamp(),
  //   });

  //   setText("");
  //   setImg(null);
  // };

  const handleSend = async () => {
    try {
      if (img) {
        const storageRef = ref(storage, uuid());
  
        const uploadTask = uploadBytesResumable(storageRef, img);
  
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Handle progress or other state changes if needed
          },
          (error) => {
            // Handle error
            console.error(error);
          },
          () => {
            // Handle successful upload
            getDownloadURL(uploadTask.snapshot.ref)
              .then(async (downloadURL) => {
                await updateDoc(doc(db, "chats", data.chatId), {
                  messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                    img: downloadURL,
                  }),
                });
              })
              .catch((error) => {
                // Handle any error during URL retrieval
                console.error(error);
              })
              .finally(() => {
                // Reset image state after successful upload
                setImg(null);
              });
          }
        );
      } else {
        // No image, send text message
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }
  
      // Update last message for current user
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
  
      // Update last message for the other user
      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
  
      // Reset text input
      setText("");
    } catch (error) {
      console.error(error);
      // Handle any other errors
    }
  };
    

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;

















// import React, { useState, useContext } from "react";
// import Img from "../img/img.png";
// import Attach from "../img/attach.png";
// import { ChatContext } from "../context/ChatContext";
// import { AuthContext } from "../context/AuthContext";
// import {db,storage} from "../firebase";
// import { 
//     Timestamp, 
//     arrayUnion, 
//     doc,
//     serverTimestamp, 
//     updateDoc 
// } from "firebase/firestore";
// import { getDownloadURL,ref,uploadBytesResumable } from "firebase/storage";
// import {v4 as uuid} from "uuid";

// const Input = () =>{
//     const [text, setText] = useState("");
//     const [img, setImg] = useState(null);

//     const {currentUser} = useContext(AuthContext);
//     const {data} = useContext(ChatContext)

//     const handleSend = async() => {
//         if(img){
//             const storageRef = ref(storage, uuid());

//             const uploadTask = uploadBytesResumable(storageRef, img);

//             uploadTask.on( 
//                 (error)=>{
//                 // setErr(true);
//                 },
            
//                 () => {
//                 // Handle successful uploads on complete
//                 // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//                 getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
//                 // console.log(res)
//                 await updateDoc(doc(db,"chats",data.chatId),{
//                     messages:arrayUnion({
//                         id: uuid(),
//                         text,
//                         senderId:currentUser.uid,
//                         date: Timestamp.now(),
//                         img: downloadURL,
//                     }),
//                 });
//                 });
//                 } 
//                 // (err) => {
//                 //   setErr(err);
//                 // }, 
//             );
//         }else{
//             await updateDoc(doc(db,"chats",data.chatId),{
//                 messages:arrayUnion({
//                     id: uuid(),
//                     text,
//                     senderId:currentUser.uid,
//                     Date: Timestamp.now(),
//                 }),
//             });
//         }
//         await updateDoc(doc(db,"userChats",currentUser.uid),{
//             [data.chatId + ".lastMessage"]:{
//                 text,
//             },
//             [data.chatId + ".date"]:serverTimestamp(),
//         });
//         await updateDoc(doc(db,"userChats",data.user.uid),{
//             [data.chatId + ".lastMessage"]:{
//                 text,
//             },
//             [data.chatId + ".date"]:serverTimestamp(),
//         });
//         setText("");
//         setImg(null);
//     }
//     return(
//         <div className="input">
//            <input 
//                 type="text" 
//                 placeholder="Type something..." 
//                 onChange={(e)=>setText(e.target.value)}
//                 value={text}
//             />
//            <div className="send">
//                 <img src={Attach} alt=""/>
//                 <input 
//                     type="file" 
//                     style={{display:"none"}} 
//                     id="file" onChange={(e)=> 
//                     setImg(e.target.files[0])}
                    
//                 />
//                 <label htmlFor="file">
//                     <img src={Img} alt=""/>
//                 </label>
//                 <button onClick={handleSend}>Send</button>
//            </div>
//         </div>
//     )
// }

// export default Input;