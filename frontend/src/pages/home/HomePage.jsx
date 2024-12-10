import React from 'react'
import SideBar from '../../components/sideBar/SideBar'
import ConversationPage from '../../components/Conversation/ConversationPage'


const HomePage = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] w-full justify-center gap-7  '>
      <SideBar/>
      <ConversationPage/>
    </div>
  )
}

export default HomePage