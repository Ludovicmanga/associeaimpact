import { TextField } from "@mui/material";
import MessageBox from "../../components/MessageBox/MessageBox";
import MessagePreviewBox from "../../components/MessagePreviewBox/MessagePreviewBox";
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";
import styles from "./Messages.module.css";

export default function Messages() {
  return (
    <div className={styles.container}>
      <div className={styles.sidebarContainer}>
        <SideBar />
      </div>
      <div className={styles.mainContentWithNavBar}>
        <NavBar />
        <div className={styles.mainContent}>
          <div className={styles.left}>
            <MessagePreviewBox selected={false} />
            <MessagePreviewBox selected={true} />
            <MessagePreviewBox selected={false} />
          </div>
          <div className={styles.right}>
            <div className={styles.messagesBoxesSection}>
              <MessageBox
                type="received"
                message={
                  <>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Veritatis laudantium laboriosam commodi earum? Illum, natus!
                    Tempore quasi quisquam sit, dolore id maxime minus numquam
                    eos aperiam eveniet doloribus, rerum aut.
                  </>
                }
              />
              <MessageBox
                type="received"
                message={
                  <>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Veritatis laudantium laboriosam commodi earum? Illum, natus!
                    Tempore quasi quisquam sit, dolore id maxime minus numquam
                    eos aperiam eveniet doloribus, rerum aut.
                  </>
                }
              />
              <MessageBox
                type="received"
                message={
                  <>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Veritatis laudantium laboriosam commodi earum? Illum, natus!
                    Tempore quasi quisquam sit, dolore id maxime minus numquam
                    eos aperiam eveniet doloribus, rerum aut.
                  </>
                }
              />
              <MessageBox
                type="received"
                message={
                  <>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Veritatis laudantium laboriosam commodi earum? Illum, natus!
                    Tempore quasi quisquam sit, dolore id maxime minus numquam
                    eos aperiam eveniet doloribus, rerum aut.
                  </>
                }
              />
              <MessageBox
                type="received"
                message={
                  <>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Veritatis laudantium laboriosam commodi earum? Illum, natus!
                    Tempore quasi quisquam sit, dolore id maxime minus numquam
                    eos aperiam eveniet doloribus, rerum aut.
                  </>
                }
              />
              <MessageBox
                type="received"
                message={
                  <>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Veritatis laudantium laboriosam commodi earum? Illum, natus!
                    Tempore quasi quisquam sit, dolore id maxime minus numquam
                    eos aperiam eveniet doloribus, rerum aut.
                  </>
                }
              />
              <MessageBox
                type="received"
                message={
                  <>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Veritatis laudantium laboriosam commodi earum? Illum, natus!
                    Tempore quasi quisquam sit, dolore id maxime minus numquam
                    eos aperiam eveniet doloribus, rerum aut.
                  </>
                }
              />
              <MessageBox
                type="received"
                message={
                  <>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Veritatis laudantium laboriosam commodi earum? Illum, natus!
                    Tempore quasi quisquam sit, dolore id maxime minus numquam
                    eos aperiam eveniet doloribus, rerum aut.
                  </>
                }
              />
              <MessageBox type="received" message="received" />
              <MessageBox type="sent" message="sent" />
            </div>
            <div className={styles.messageFieldContainer}>
              <TextField
                placeholder="Ex: Bonjour, et si on se rencontrait ?"
                size="small"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    background: "white",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
