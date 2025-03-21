import React, {useState, useEffect} from 'react'
import SideBar from './components/sidebar/sidebar'
import Body from './components/body/body'
import MessageBlock from './components/message-block/message-block'
import styles from './style.module.css'
function ChatPage({socket}) {
    const [messages, setMessages]=useState([])
    const [status, setStatus]=useState('')
    useEffect(() => {
      
    socket.on('responseTyping', (data)=>{
        setStatus(data)
        setTimeout(() => setStatus(''), 1000)
    })
   ;
    }, [socket])
    
    useEffect( ()=>{
        socket.on('response', (data)=>setMessages([...messages, data]))
    }, [socket, messages])
    return (
        <div className={styles.chat}>
            <SideBar socket={socket}/>
            <main className={styles.main}>
                <Body messages={messages} status={status}/>
                <MessageBlock socket={socket}/>
            </main>

        </div>
    )
}

export default ChatPage
