import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import Layout from "../components/layout/Layout";
import Users from "../pages/users/Users";
import UserActions from "../pages/users/userActions/UserActions";
// import { Messages } from "../pages/messages/Messages";
// import Chat from "../pages/messages/Chat";
import { Community } from "../pages/community/Community";
import CommunityPostDetails from "../pages/community/CommunityPostDetails";
import CommunityPostReactions from "../pages/community/CommunityPostReactions";
import { Report } from "../pages/reports/Report";
import PostReports from "../pages/reports/PostReports";
import StoryReports from "../pages/reports/StoryReports";
import CommunityPostReports from "../pages/reports/CommunityPostReports";
import StoryPost from "../pages/users/userActions/posts/postsDetail/StoryPost/StoryPost";
import StoryReels from "../pages/users/userActions/posts/postsDetail/StoryPost/StoryReels";
import UsersPostReactions from "../pages/users/userActions/posts/postsDetail/StoryPost/UsersPostReactions";
import { Notification } from "../pages/notification/Notification";
import { Profile } from "../pages/profile/Profile";
import ProtectedRoutes from "./ProtectedRoutes";
import { Setting } from "../pages/Setting/Setting";
import Login from "../pages/auth/Login";
import ReportPostReactions from "../pages/reports/reportPostReactions";
import ReportCommunityPostReactions from "../pages/reports/reportCommunityPostReaction";
import ReelReports from "../pages/reports/ReelReports";

const LayoutRoutes = () => {
  const routes = [
    { path: "*", element: <Navigate to="/" /> },
    { path: "/login", element: <Login /> },
    {path: "/", element: (<ProtectedRoutes><Dashboard /></ProtectedRoutes>)},
    {path: "/dashboard/notifications", element: (<ProtectedRoutes><Notification /></ProtectedRoutes>)},
    {path: "/dashboard/setting", element: (<ProtectedRoutes><Setting /></ProtectedRoutes>)},
    {path: "/dashboard/profile", element: (<ProtectedRoutes><Profile /></ProtectedRoutes>)},
    {path: "/users", element: ( <ProtectedRoutes><Users /></ProtectedRoutes>)},
    {path: "users/actions/:id", element: (<ProtectedRoutes><UserActions /></ProtectedRoutes>)},
    {path: "/users/actions/posts/story/:id", element: (<ProtectedRoutes><StoryPost /></ProtectedRoutes>)},
    {path: "/users/actions/posts/story/reactions/:id", element: (<ProtectedRoutes><UsersPostReactions /></ProtectedRoutes>)},
    {path: "users/actions/reels/story/:id", element: (<ProtectedRoutes><StoryReels /></ProtectedRoutes>)},
    // {path: "/messages", element: (<ProtectedRoutes><Messages /></ProtectedRoutes>)},
    // {path: "/messages/user", element: (<ProtectedRoutes><Chat /></ProtectedRoutes>)},
    {path: "/community", element: (<ProtectedRoutes><Community /></ProtectedRoutes>)},
    {path: "/community/post", element: (<ProtectedRoutes><CommunityPostDetails /></ProtectedRoutes>)},
    {path: "/community/post/reactions", element: (<ProtectedRoutes><CommunityPostReactions /></ProtectedRoutes>)},
    {path: "/reports", element: (<ProtectedRoutes><Report /></ProtectedRoutes>)},
    {path: "/reports/post", element: (<ProtectedRoutes><PostReports /></ProtectedRoutes>)},
    {path: "/reports/reel", element: (<ProtectedRoutes><ReelReports /></ProtectedRoutes>)},
    {path: "/reports/story", element: (<ProtectedRoutes><StoryReports /></ProtectedRoutes>)},
    {path: "/reports/community-post",element: (<ProtectedRoutes><CommunityPostReports /></ProtectedRoutes>)},
    {path: "/reports/post/reactions", element: (<ProtectedRoutes><ReportPostReactions /></ProtectedRoutes>)},
    {path: "/reports/community-post/reactions", element: (<ProtectedRoutes><ReportCommunityPostReactions /></ProtectedRoutes>)},

  ]



  return (
    <Layout>
      <Routes>
        {routes.map((item, index) => (
          <Route key={index} path={item.path} element={item.element} />
        ))}
      </Routes>
    </Layout>
  );
};

export default LayoutRoutes;
