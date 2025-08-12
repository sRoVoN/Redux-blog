import { sub } from "date-fns-jalali";

const initialState = {
    blogs: [
        {
            id: "1",
            date: sub(new Date(), {minutes: 4}).toISOString() ,
            title: "The First Post",
            body: " body of my first post",
            user: "1",
            reactions: {
              heart: "0",
              thumbsUp: "0",
              thumbsDown: "0",
              laughing: "0",
              raisedEyebroe: "0",
              sad: "0",
            },
          },
          {
            id: "2",
            title: "The Second Post",
            date: sub(new Date(), {minutes: 10}).toISOString() ,
            body: " Content of my second post",
            user: "2",
            reactions: {
              heart: "0",
              thumbsUp: "0",
              thumbsDown: "0",
              laughing: "0",
              raisedEyebroe: "0",
              sad: "0",
            },
          },


    ]
};