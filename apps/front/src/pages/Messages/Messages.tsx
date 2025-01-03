import {
  Avatar,
  Button,
  Fab,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Skeleton,
  TextField,
  useMediaQuery,
} from "@mui/material";
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
import { handleGetTime } from "../../utils/utils";
import NoResultInfo from "../../components/NoResultInfo/NoResultInfo";
import noMessagesImg from "../../images/noMessages.svg";
import NoAccessMessage from "../../components/NoAccessMessage/NoAccessMessage";
import PaymentModal from "../../components/PaymentModal/PaymentModal";
import { Conversation } from "../../types/types";
import { Search, West } from "@mui/icons-material";
import NoSelectedMessage from "../../components/NoSelectedMessage/NoSelectedMessage";

export default function Messages() {
  const [messagesListLoading, setMessagesListLoading] = useState(true);
  const [messagesPreviewsLoading, setMessagesPreviewsLoading] = useState(true);
  const [paymentModalIsOpen, setPaymentModalIsOpen] = useState(false);
  const params = useParams();
  const interlocutorIdFromParams = parseInt(params.id!);
  const [selectedConvId, setSelectedConvId] = useState<number>();
  const [messageBeingTyped, setMessageBeingTyped] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [filteredConversations, setFilteredConversations] = useState<
    Conversation[]
  >([]);
  const [searchMessageInput, setSearchMessageInput] = useState("");
  const endMessageDiv = useRef<HTMLDivElement | null>(null);

  const handleOpenPaymentModal = () => setPaymentModalIsOpen(true);

  const handleChangeSelectedConv = async () => {
    if (selectedConvId) {
      setConversations((curr) =>
        curr.map((conv) => {
          if (conv.id === selectedConvId) {
            return { ...conv, unreadCount: 0 };
          } else {
            return conv;
          }
        })
      );
      handleGetActiveConversationMessages(selectedConvId);
      setMessagesListLoading(false);
    }
  };

  const [messagesFromActiveConversation, setMessagesFromActiveConversation] =
    useState<
      {
        id: number;
        type: "sent" | "received";
        content: string;
        createdAt: Date;
      }[]
    >([]);

  const handleScrollToBottom = () => {
    setTimeout(() => {
      if (endMessageDiv.current) {
        endMessageDiv.current.scrollIntoView();
      }
    }, 30);
  };

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
    setMessagesPreviewsLoading(false);
    setMessagesListLoading(false);
  }, []);

  useEffect(() => {
    if (selectedConvId) {
      setMessagesListLoading(true);
      handleChangeSelectedConv();
      handleScrollToBottom();
    }
  }, [selectedConvId, endMessageDiv]);

  useEffect(() => {
    if (!searchMessageInput || searchMessageInput.length === 0) {
      setFilteredConversations(conversations);
    } else {
      setFilteredConversations((curr) =>
        conversations.filter((conv) =>
          conv.interlocutorName
            .toLocaleLowerCase()
            .includes(searchMessageInput.toLocaleLowerCase())
        )
      );
    }
  }, [searchMessageInput, conversations]);

  const handleGetActiveConversationMessages = async (
    conversationId: number
  ) => {
    const messages = await getConversationMessages(conversationId);
    setMessagesFromActiveConversation(messages);
  };

  const handleCreateMessage = async (content: string) => {
    setMessagesListLoading(true);
    const createdMessage = await createMessage({
      content,
      conversationId: selectedConvId!,
    });
    if (createdMessage) {
      setMessagesFromActiveConversation((curr) => [...curr, createdMessage]);
      setMessageBeingTyped("");
      handleScrollToBottom();
    }
    setMessagesListLoading(false);
  };

  return (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.mainContentWithNavBar}>
        <NavBar />
        {selectedConvId && (
          <div className={styles.topForSmallScreen}>
            <div className={styles.topForSmallScreenArrowAndPic}>
              <IconButton onClick={() => setSelectedConvId(undefined)}>
                <West />
              </IconButton>
              <div className={styles.topForSmallScreenPicContainer}>
                <Avatar
                  sx={{
                    height: 60,
                    width: 60,
                  }}
                  variant="circular"
                />
              </div>
            </div>
            <div className={styles.topForSmallScreenInterlocutorName}>
              {
                conversations.find((conv) => conv.id === selectedConvId)
                  ?.interlocutorName
              }
            </div>
          </div>
        )}
        <div className={styles.mainContent}>
          <>
            <div
              className={
                selectedConvId
                  ? styles.messagePreviewsContainerWhenAMessageSelected
                  : styles.messagePreviewsContainerWhenNoMessageSelected
              }
            >
              {messagesPreviewsLoading ? (
                <MessagePreviewBoxSkeleton />
              ) : conversations.length === 0 ? (
                <div className={styles.noResultInfoContainer}>
                  <NoResultInfo
                    text="Vous n'avez pas de messages"
                    img={noMessagesImg}
                  />
                </div>
              ) : (
                <>
                  <div className={styles.searchMessageInputContainer}>
                    <OutlinedInput
                      value={searchMessageInput}
                      onChange={(e) => setSearchMessageInput(e.target.value)}
                      placeholder="Rechercher"
                      fullWidth
                      size="small"
                      className={styles.filterBtn}
                      startAdornment={
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      }
                    />
                  </div>
                  {filteredConversations.map((conv) => (
                    <div
                      onClick={() => setSelectedConvId(conv.id)}
                      key={conv.id}
                    >
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
            <div
              className={
                selectedConvId
                  ? styles.messagesSectionContainerWhenAMessageSelected
                  : styles.messagesSectionContainerWhenNoMessageSelected
              }
            >
              <div className={styles.messagesBoxesSection}>
                {messagesListLoading ? (
                  <MessageBoxSectionSkeleton />
                ) : !selectedConvId ? (
                  <NoSelectedMessage />
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
                    <div ref={endMessageDiv}></div>
                  </div>
                )}
              </div>
              <div className={styles.messageFieldContainer}>
                {messagesListLoading ? (
                  <Skeleton height={50} />
                ) : (
                  <div className={styles.messageTextFieldContainer}>
                    <TextField
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && messageBeingTyped) {
                          handleCreateMessage(messageBeingTyped);
                        }
                      }}
                      value={messageBeingTyped}
                      onChange={(e) => setMessageBeingTyped(e.target.value)}
                      placeholder="Ex: Bonjour, et si on se rencontrait ?"
                      size="small"
                      fullWidth
                      sx={{
                        "& .MuiInputBase-root": {
                          backgroundColor: "white",
                        },
                        margin: "0 1rem 0 0",
                      }}
                    />
                    <Fab
                      variant="extended"
                      size="medium"
                      color="primary"
                      onClick={(e) => {
                        if (messageBeingTyped) {
                          handleCreateMessage(messageBeingTyped);
                        }
                      }}
                      sx={{}}
                    >
                      Envoyer
                    </Fab>
                  </div>
                )}
              </div>
            </div>
          </>
        </div>
      </div>
      <PaymentModal
        isOpen={paymentModalIsOpen}
        setIsOpen={setPaymentModalIsOpen}
      />
    </div>
  );
}
