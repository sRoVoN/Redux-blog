import { useDispatch } from "react-redux";
import { reactionAdded } from "../reducers/blogSlice";


const reactonEmoji = {
    heart: " 💗",
    thumbsUp: "👍",
    thumbsDown: "👎",
    laughing: "😂",
    raisedEyebrow: "🤨",
    sad: "😢",
};
const ReactionButtons = ({blog}) => {
    const dispath = useDispatch();
    const reactonButtons = Object
    .entries(reactonEmoji)
    .map(([name, emoji]) => {
        return(
            <button key={name} 
            className="muted-button"
            style={{marginRight: "2px"}}
             type="button"
             onClick={() => dispath(reactionAdded({blogId: blog.id, reaction: name}))}
            >
                {emoji} {blog.reactions[name]}
            </button>
        );
    }
 );
 return    <div>{reactonButtons}</div>



};
export default ReactionButtons;