import { useAuthContext } from "../../context/AuthContext";
import useMessages from "../../zustand/useMessages";

const ChatBubbleMessages = ({ message }) => {
	
	const { authUser, setAuthUser } = useAuthContext();
	const { selectedUser, setSelectedUser } = useMessages();
	
	const fromMe = message.senderId === authUser.loggedInUser._id;
	
	const chatClassName = fromMe? "chat-end" : "chat-start";
	const profilePic = fromMe? authUser.loggedInUser.profileImage : selectedUser?.profileImage;
	const bubbleBgColor = fromMe? "bg-blue-500" : "";

	const shakeClass = message.shouldShake ? "shake" : "";


	const createdAt = new Date(message.createdAt);
	const formattedTime = createdAt.toLocaleTimeString([], {
	  hour: "2-digit",
	  minute: "2-digit",
	});

	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass}  pb-2`}>{message.chat}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
};
export default ChatBubbleMessages;