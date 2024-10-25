import { AiOutlineWechat } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { IoDocumentText } from "react-icons/io5";
import { MdHandshake } from "react-icons/md";

export const colors = {
  primary: "#2E4D55",
  orange: "#E4774F"
};
export const fontSize = {
  span: '28px'
};
export const dashboard = {
  likes:'500',
  shares:'900',
  Media:'1300',
  stories:'560',
  posts:'260',
  users:'960',
}
export const sidebarData = [
  {
    text: "Dashboard",
    path: "/",
    icon: <HiMiniSquares2X2 size={20} />,
  },
  { text: "Users", path: "/users", icon: <FaUsers size={20} /> },
  // { text: "Messages", path: "/messages", icon: <AiOutlineWechat size={20} /> },
  { text: "Community", path: "/community", icon: <MdHandshake size={20} /> },
  { text: "Reports", path: "/reports", icon: <IoDocumentText size={20} /> },
];
