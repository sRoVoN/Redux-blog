import React from "react";
import { formatDistanceToNow, parseISO } from "date-fns";

interface ShowTimeProps {
  timestamp: string;
}

const ShowTime: React.FC<ShowTimeProps> = ({ timestamp }) => {
  const timeAgo = timestamp ? formatDistanceToNow(parseISO(timestamp)) : "";
  return <span> | {timeAgo} ago</span>;
};

export default ShowTime;
