import { Skeleton, TextField } from "@mui/material";
import MessageBox from "../../components/MessageBox/MessageBox";
import MessagePreviewBox from "../../components/MessagePreviewBox/MessagePreviewBox";
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";
import styles from "./Messages.module.css";
import { useEffect, useRef, useState } from "react";
import MessagePreviewBoxSkeleton from "../../components/Skeletons/MessagePreviewBoxSkeleton/MessagePreviewBoxSkeleton";
import MessageBoxSectionSkeleton from "../../components/Skeletons/MessageBoxSectionSkeleton/MessageBoxSectionSkeleton";
import { useParams } from "react-router-dom";
import {
  createMessage,
  getConversationMessages,
} from "../../helpers/messages.helper";
import {
  createConversation,
  getAllUserConversations,
  getConversationBetweenUserAndInterlocutor,
} from "../../helpers/conversations";

export default function Messages() {
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const interlocutorIdFromParams = parseInt(params.id!);
  const [conversations, setConversations] = useState<
    {
      id: number;
      interlocutorName: string;
      unreadCount: number;
      preview: string;
    }[]
  >([]);

  const divRef = useRef(null);

  const [messagesFromActiveConversation, setMessagesFromActiveConversation] =
    useState<
      {
        id: number;
        type: "sent" | "received";
        content: string;
        createdAt: Date;
      }[]
    >([]);

  const [selectedConvId, setSelectedConvId] = useState<number>();
  const [messageBeingTyped, setMessageBeingTyped] = useState("");

  const handleGetAllConversations = async () => {
    if (interlocutorIdFromParams) {
      const conversationBetweenUserAndInterlocutor =
        await getConversationBetweenUserAndInterlocutor(
          interlocutorIdFromParams
        );

      if (conversationBetweenUserAndInterlocutor && interlocutorIdFromParams) {
        setSelectedConvId(conversationBetweenUserAndInterlocutor.id);
      } else {
        const createdConv = await createConversation(interlocutorIdFromParams);
        if (createdConv) {
          setSelectedConvId(createdConv.id);
        }
      }
    }
    const allUserConversations = await getAllUserConversations();

    setConversations(allUserConversations);
  };

  useEffect(() => {
    handleGetAllConversations();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (selectedConvId) {
      setIsLoading(true);
      setConversations((curr) =>
        curr.map((conv) => {
          if (conv.id === selectedConvId) {
            return { ...conv, unreadCount: 0 };
          } else {
            return conv;
          }
        })
      );
      handleGetActiveConversationMessage(selectedConvId);
      setIsLoading(false);
    }
  }, [selectedConvId]);

  const handleGetActiveConversationMessage = async (conversationId: number) => {
    const messages = await getConversationMessages(conversationId);
    setMessagesFromActiveConversation(messages);
  };

  const handleCreateMessage = async (content: string) => {
    setIsLoading(true);
    const createdMessage = await createMessage({
      content,
      conversationId: selectedConvId!,
    });
    if (createdMessage) {
      setMessagesFromActiveConversation((curr) => [...curr, createdMessage]);
      setMessageBeingTyped("");
    }
    setIsLoading(false);
  };

  const monthsInFrench = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const handleGetTime = (timestamp: Date) => {
    const date = new Date(timestamp);
    const formattedDayMonthYear = getFormattedDayMonthYear(date);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${formattedDayMonthYear} - ${hours}:${minutes}`;
  };

  const getFormattedDayMonthYear = (date: Date) => {
    const day = date.getDay();
    const month = monthsInFrench[date.getMonth()];
    const year = date.getFullYear();
    const todaysDate = new Date();
    if (
      date.getDate() === todaysDate.getDate() &&
      date.getMonth() === todaysDate.getMonth() &&
      date.getFullYear() === todaysDate.getFullYear()
    ) {
      return "aujourd'hui";
    } else {
      return `${day} ${month} ${year}`;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebarContainer}>
        <SideBar />
      </div>
      <div className={styles.mainContentWithNavBar}>
        <NavBar />
        <div className={styles.mainContent}>
          <div className={styles.left}>
            {isLoading ? (
              <MessagePreviewBoxSkeleton />
            ) : (
              <>
                {conversations.map((conv) => (
                  <div onClick={() => setSelectedConvId(conv.id)} key={conv.id}>
                    <MessagePreviewBox
                      selected={conv.id === selectedConvId}
                      name={conv.interlocutorName}
                      preview={conv.preview}
                      unreadCount={conv.unreadCount}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
          <div className={styles.right}>
            <div className={styles.messagesBoxesSection} ref={divRef}>
              {isLoading ? (
                <MessageBoxSectionSkeleton />
              ) : (
                <div>
                  {messagesFromActiveConversation.map((mess) => (
                    <MessageBox
                      key={mess.id}
                      type={mess.type}
                      message={mess.content}
                      time={handleGetTime(mess.createdAt)}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className={styles.messageFieldContainer}>
              {isLoading ? (
                <Skeleton height={50} />
              ) : (
                <TextField
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCreateMessage(messageBeingTyped);
                    }
                  }}
                  value={messageBeingTyped}
                  onChange={(e) => setMessageBeingTyped(e.target.value)}
                  placeholder="Ex: Bonjour, et si on se rencontrait ?"
                  size="small"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      background: "white",
                    },
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
