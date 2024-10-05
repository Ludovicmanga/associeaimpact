import { Skeleton } from "@mui/material";
import styles from "./MessagePreviewBoxSkeleton.module.css";

export default function MessagePreviewBoxSkeleton() {
  return (
    <div>
      <Skeleton
        variant="rectangular"
        height={80}
        animation="pulse"
        sx={{
          margin: "0.5rem 0",
        }}
      />
      <Skeleton
        variant="rectangular"
        height={80}
        animation="wave"
        sx={{
          margin: "0.5rem 0",
        }}
      />
      <Skeleton
        variant="rectangular"
        height={80}
        animation="pulse"
        sx={{
          margin: "0.5rem 0",
        }}
      />
    </div>
  );
}
