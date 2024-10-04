import { Skeleton, TextField } from "@mui/material";
import MessageBox from "../../components/MessageBox/MessageBox";
import MessagePreviewBox from "../../components/MessagePreviewBox/MessagePreviewBox";
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";
import styles from "./Messages.module.css";
import { useEffect, useState } from "react";
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

  const [messagesFromActiveConversation, setMessagesFromActiveConversation] =
    useState<
      {
        id: number;
        type: "sent" | "received";
        content: string;
        createdAt: Date;
      }[]
    >([]);

  const [selectedConvId, setSelectedConvId] = useState();
  const [messageBeingTyped, setMessageBeingTyped] = useState("");

  const handleGetAllConversations = async () => {
    const conversationBetweenUserAndInterlocutor =
      await getConversationBetweenUserAndInterlocutor(interlocutorIdFromParams);

    if (conversationBetweenUserAndInterlocutor) {
      setSelectedConvId(conversationBetweenUserAndInterlocutor.id);
    } else {
      const createdConv = await createConversation(interlocutorIdFromParams);
      if (createdConv) {
        setSelectedConvId(createdConv.id);
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
      receiverId: interlocutorIdFromParams!,
    });
    if (createdMessage) {
      setMessagesFromActiveConversation((curr) => [...curr, createdMessage]);
      setMessageBeingTyped("");
    }
    setIsLoading(false);
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
                  <MessagePreviewBox
                    selected={conv.id === selectedConvId}
                    name={conv.interlocutorName}
                    preview={conv.preview}
                  />
                ))}
              </>
            )}
          </div>
          <div className={styles.right}>
            <div className={styles.messagesBoxesSection}>
              {isLoading ? (
                <MessageBoxSectionSkeleton />
              ) : (
                <>
                  {messagesFromActiveConversation.map((mess) => (
                    <MessageBox
                      key={mess.id}
                      type={mess.type}
                      message={mess.content}
                    />
                  ))}
                </>
              )}
            </div>
            <div className={styles.messageFieldContainer}>
              {isLoading ? (
                <Skeleton height={50} />
              ) : (
                <TextField
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      //@ts-ignore
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
