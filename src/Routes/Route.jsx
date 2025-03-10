import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../Pages/Authentication/Login";
import Common from "../Common";
import Support from "../Pages/Help and Support/Support";
import Privacy from "../Pages/Help and Support/Privacy";
import Terms from "../Pages/Help and Support/Terms";
import ResponsibleGaming from "../Pages/Help and Support/ResponsibleGaming";
import VerifyOTP from "../Pages/Authentication/VerifyOTP";
import Profile from "../Pages/Profile/Profile";
import Kyc from "../Pages/Profile/Kyc";
import Wallet from "../Pages/Profile/Wallet";
import TransactionPage from "../Pages/Recharge/TransactionPage";
import GameHistory from "../Pages/Game Page/GameHistory";
import ReferHistory from "../Pages/Refferals/ReferHistory";
import ReferEarn from "../Pages/Refferals/ReferEarn";
import Notification from "../Pages/Refferals/Notification";
import Recharge from "../Pages/Recharge/Recharge";
import RechargeSubmit from "../Pages/Recharge/RechargeSubmit";
import Withdraw from "../Pages/Withdrawal/Withdraw";
import Tournament from "../Pages/Game Page/Tournament";
import Logout from "../Pages/Authentication/Logout";
import ProtectedRoute from "../util/SecureRoute";
import ClassicGame from "../Pages/Game Page/ClassicGame";
import Battle from "../Pages/Game Page/Battle";
import AdminLogin from "../Admin/Authentication/AdminLogin";
import AdminHome from "../Admin/Pages/Home";
import AdminRecharge from "../Admin/Pages/Recharge";
import AdminWithdraw from "../Admin/Pages/Withdraw";
import UpdateQR from "../Admin/Pages/UpdateQR";
import SetRefer from "../Admin/Pages/SetRefer";
import AdminNotifications from "../Admin/Pages/AdminNotifications";
import SocialMedia from "../Admin/Pages/SocialMedia";
import KycAdmin from "../Admin/Pages/KycAdmin";
import AdminSignUp from "../Admin/Pages/AdminSignUp";
import AdminTournament from "../Admin/Pages/AdminTournament";
import GamePageAdmin from "../Admin/Pages/GamePageAdmin";
import ManualKYC from "../Admin/Pages/ManualKYC";
import UserManagement from "../Admin/Pages/UserManagement";
import MainUser from "../Admin/User details/Main.user";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Common />,
    children: [
      {
        path: "/",
        element: <Navigate to="/login" />,
      },
      {
        path: "/login",
        element: <ProtectedRoute Component={Login} />,
      },
      {
        path: "/support",
        element: <ProtectedRoute Component={Support} />,
      },
      {
        path: "/privacy-policy",
        element: <ProtectedRoute Component={Privacy} />,
      },
      {
        path: "/terms",
        element: <ProtectedRoute Component={Terms} />,
      },
      {
        path: "/responsible-gaming",
        element: <ProtectedRoute Component={ResponsibleGaming} />,
      },
      {
        path: "/verify-otp",
        element: <VerifyOTP />,
      },
      {
        path: "/profile",
        element: <ProtectedRoute Component={Profile} />,
      },
      {
        path: "/kyc",
        element: <ProtectedRoute Component={Kyc} />,
      },
      {
        path: "/wallet",
        element: <ProtectedRoute Component={Wallet} />,
      },
      {
        path: "/transaction-history",
        element: <ProtectedRoute Component={TransactionPage} />,
      },
      {
        path: "/Gamehistory",
        element: <ProtectedRoute Component={GameHistory} />,
      },
      {
        path: "/Referral-history",
        element: <ProtectedRoute Component={ReferHistory} />,
      },
      {
        path: "/refer-earn",
        element: <ProtectedRoute Component={ReferEarn} />,
      },
      {
        path: "/Notification",
        element: <ProtectedRoute Component={Notification} />,
      },
      {
        path: "/addcash",
        element: <ProtectedRoute Component={Recharge} />,
      },
      {
        path: "/recharge-submit",
        element: <ProtectedRoute Component={RechargeSubmit} />,
      },
      {
        path: "/withdraw",
        element: <ProtectedRoute Component={Withdraw} />,
      },
      {
        path: "/tournaments",
        element: <ProtectedRoute Component={Tournament} />,
      },
      {
        path: "/logout",
        element: <ProtectedRoute Component={Logout} />,
      },
      {
        path: "/tournaments/classic",
        element: <ProtectedRoute Component={ClassicGame} />,
      },
      {
        path: "/tournaments/classic/battle",
        element: <ProtectedRoute Component={Battle} />,
      },
      {
        path: "/admin/login",
        element: <AdminLogin />,
      },
      {
        path: "/admin/secure/signup",
        element: <AdminSignUp />,
      },
      {
        path: "/admin/secure/home",
        element: <AdminHome />,
      },
      {
        path: "/admin/secure/recharge",
        element: <AdminRecharge />,
      },
      {
        path: "/admin/secure/withdraw",
        element: <AdminWithdraw />,
      },
      {
        path: "/admin/secure/update-qr",
        element: <UpdateQR />,
      },
      {
        path: "/admin/secure/set-percentage",
        element: <SetRefer />,
      },
      {
        path: "/admin/secure/notifications",
        element: <AdminNotifications />,
      },
      {
        path: "/admin/secure/socialMedia",
        element: <SocialMedia />,
      },
      {
        path: "/admin/secure/kyc",
        element: <KycAdmin />,
      },
      {
        path: "/admin/secure/tournaments",
        element: <AdminTournament />,
      },
      {
        path: "/admin/secure/tournaments/result",
        element: <GamePageAdmin />,
      },
      {
        path: "/admin/secure/manual-kyc",
        element: <ManualKYC />,
      },
      {
        path: "/admin/secure/user-management",
        element: <UserManagement />,
      },
      {
        path: "/admin/secure/user-details/:id",
        element: <MainUser />,
      },
    ],
  },
]);
