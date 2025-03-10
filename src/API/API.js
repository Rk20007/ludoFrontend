import axios from "axios";
import Cookies from "js-cookie";

const baseURL = import.meta.env.VITE_API_URL;

export const loginbyNumber = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/api/v1/users/generate-otp`, {
      mobileNo: data,
    });
    return response.data;
  } catch (error) {
    if (
      error?.response?.data?.statusCode === 401 ||
      error?.response?.data?.statusCode === 403
    ) {
      localStorage.clear();
      Cookies.remove("verifyToken");
      window.location.href = "/login";
    }
    return error;
  }
};

export const loginbyOtp = async (data) => {
  let obj =
    data.referalCode !== ""
      ? {
          mobileNo: data.mobileNo,
          otp: data.otp,
          referalCode: data.referalCode,
        }
      : {
          mobileNo: data.mobileNo,
          otp: data.otp,
        };
  try {
    const response = await axios.post(
      `${baseURL}/api/v1/users/verify-otp`,
      obj
    );
    return response.data;
  } catch (error) {
    if (
      error?.response?.data?.statusCode === 401 ||
      error?.response?.data?.statusCode === 403
    ) {
      localStorage.clear();
      Cookies.remove("verifyToken");
      window.location.href = "/login";
    }
    return error;
  }
};

export const redendOtp = async (data) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/v1/users/resend-otp`,
      data
    );
    return response.data;
  } catch (error) {
    if (
      error?.response?.data?.statusCode === 401 ||
      error?.response?.data?.statusCode === 403
    ) {
      localStorage.clear();
      Cookies.remove("verifyToken");
      window.location.href = "/login";
    }
    return error;
  }
};

export const getBalanceDetail = async (data) => {
  try {
    const response = await axios.get(`${baseURL}/api/v1/users/user-dashboard`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("verifyToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    if (
      (error?.response?.data?.statusCode === 401 ||
        error?.response?.data?.statusCode === 403) &&
      Cookies.get("verifyToken")
    ) {
      localStorage.clear();
      Cookies.remove("verifyToken");
      window.location.href = "/login";
    }
    return error;
  }
};

export const profileData = async (data) => {
  try {
    const response = await axios.get(`${baseURL}/api/v1/users`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("verifyToken")}`,
      },
    });
    return response;
  } catch (error) {
    if (
      error?.response?.data?.statusCode === 401 ||
      error?.response?.data?.statusCode === 403
    ) {
      localStorage.clear();
      Cookies.remove("verifyToken");
      window.location.href = "/login";
    }
    return error;
  }
};

export const profileDataUpdate = async (data) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/v1/users`,
      { name: data },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("verifyToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    if (
      error?.response?.data?.statusCode === 401 ||
      error?.response?.data?.statusCode === 403
    ) {
      localStorage.clear();
      Cookies.remove("verifyToken");
      window.location.href = "/login";
    }
    return error;
  }
};

export const kycDataUpload = async (data) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/v1/users/upload-kyc-document`,
      data,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("verifyToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    if (
      error?.response?.data?.statusCode === 401 ||
      error?.response?.data?.statusCode === 403
    ) {
      localStorage.clear();
      Cookies.remove("verifyToken");
      window.location.href = "/login";
    }
    return error;
  }
};

export const kycDataUploadAdmin = async (data) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/v1/admin/upload-kyc-document`,
      data,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("verifyToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    if (
      error?.response?.data?.statusCode === 401 ||
      error?.response?.data?.statusCode === 403
    ) {
      localStorage.clear();
      Cookies.remove("verifyToken");
      window.location.href = "/login";
    }
    return error;
  }
};

export const rechargeAPI = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/api/v1/transaction`, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("verifyToken")}`,
      },
    });
    return response;
  } catch (error) {
    if (
      error?.response?.data?.statusCode === 401 ||
      error?.response?.data?.statusCode === 403
    ) {
      localStorage.clear();
      Cookies.remove("verifyToken");
      window.location.href = "/login";
    }
    return error;
  }
};

export const withdrawAPI = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/api/v1/transaction`, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("verifyToken")}`,
      },
    });
    return response;
  } catch (error) {
    if (
      error?.response?.data?.statusCode === 401 ||
      error?.response?.data?.statusCode === 403
    ) {
      localStorage.clear();
      Cookies.remove("verifyToken");
      window.location.href = "/login";
    }
    return error;
  }
};

export const transactionHistoryAPI = async (data) => {
  try {
    const response = await axios.get(`${baseURL}/api/v1/transaction`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("verifyToken")}`,
      },
    });
    return response;
  } catch (error) {
    if (
      error?.response?.data?.statusCode === 401 ||
      error?.response?.data?.statusCode === 403
    ) {
      localStorage.clear();
      Cookies.remove("verifyToken");
      window.location.href = "/login";
    }
    return error;
  }
};

export const gameHistoryAPI = async (data) => {
  try {
    const response = await axios.get(`${baseURL}/api/v1/battle/game-history`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("verifyToken")}`,
      },
    });
    return response;
  } catch (error) {
    if (
      error?.response?.data?.statusCode === 401 ||
      error?.response?.data?.statusCode === 403
    ) {
      localStorage.clear();
      Cookies.remove("verifyToken");
      window.location.href = "/login";
    }
    return error;
  }
};

export const NotificationAPI = async (data) => {
  try {
    const response = await axios.get(`${baseURL}/api/v1/notification`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("verifyToken")}`,
      },
    });
    return response;
  } catch (error) {
    if (
      error?.response?.data?.statusCode === 401 ||
      error?.response?.data?.statusCode === 403
    ) {
      localStorage.clear();
      Cookies.remove("verifyToken");
      window.location.href = "/login";
    }
    return error;
  }
};

export const ReferHistorynAPI = async (data) => {
  try {
    const response = await axios.get(
      `${baseURL}/api/v1/users/referral-history`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("verifyToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    if (
      error?.response?.data?.statusCode === 401 ||
      error?.response?.data?.statusCode === 403
    ) {
      localStorage.clear();
      Cookies.remove("verifyToken");
      window.location.href = "/login";
    }
    return error;
  }
};

export const GetBattleDataAPI = async (data) => {
  try {
    const response = await axios.get(`${baseURL}/api/v1/battle`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("verifyToken")}`,
      },
    });
    return response;
  } catch (error) {
    console.log("++++", error);
    if (
      error?.response?.data?.statusCode === 401 ||
      error?.response?.data?.statusCode === 403
    ) {
      localStorage.clear();
      Cookies.remove("verifyToken");
      window.location.href = "/login";
    }
    return error;
  }
};

export const CreateBattleAPI = async (data) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/v1/battle/create`,
      {
        amount: data,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("verifyToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    if (
      error?.response?.data?.statusCode === 401 ||
      error?.response?.data?.statusCode === 403
    ) {
      localStorage.clear();
      Cookies.remove("verifyToken");
      window.location.href = "/login";
    }
    return error;
  }
};

export const DeleteBattleAPI = async (data) => {
  try {
    const response = await axios.delete(`${baseURL}/api/v1/battle/${data}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("verifyToken")}`,
      },
    });
    return response;
  } catch (error) {
    if (
      error?.response?.data?.statusCode === 401 ||
      error?.response?.data?.statusCode === 403
    ) {
      localStorage.clear();
      Cookies.remove("verifyToken");
      window.location.href = "/login";
    }
    return error;
  }
};

export const AcceptBattleAPI = async (data) => {
  try {
    const response = await axios.get(
      `${baseURL}/api/v1/battle/send-creater-accept-request/${data}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("verifyToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    if (
      error?.response?.data?.statusCode === 401 ||
      error?.response?.data?.statusCode === 403
    ) {
      localStorage.clear();
      Cookies.remove("verifyToken");
      window.location.href = "/login";
    }
    return error;
  }
};

export const AcceptRejectBattleAPI = async (data) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/v1/battle/accept-or-reject-request-by-creater`,
      { ...data },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("verifyToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    if (
      error?.response?.data?.statusCode === 401 ||
      error?.response?.data?.statusCode === 403
    ) {
      localStorage.clear();
      Cookies.remove("verifyToken");
      window.location.href = "/login";
    }
    return error;
  }
};

export const StartBattleAPI = async (data) => {
  try {
    const response = await axios.get(
      `${baseURL}/api/v1/battle/start-battle-by-accepted-user/${data}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("verifyToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    if (
      error?.response?.data?.statusCode === 401 ||
      error?.response?.data?.statusCode === 403
    ) {
      localStorage.clear();
      Cookies.remove("verifyToken");
      window.location.href = "/login";
    }
    return error;
  }
};

export const GetBattleAPI = async (data) => {
  try {
    const response = await axios.get(
      `${baseURL}/api/v1/battle/details/${data}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("verifyToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    if (
      error?.response?.data?.statusCode === 401 ||
      error?.response?.data?.statusCode === 403
    ) {
      localStorage.clear();
      Cookies.remove("verifyToken");
      window.location.href = "/login";
    }
    return error;
  }
};

export const SendRoomIDAPI = async (data) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/v1/battle/enter-room-number`,
      data,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("verifyToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    if (
      error?.response?.data?.statusCode === 401 ||
      error?.response?.data?.statusCode === 403
    ) {
      localStorage.clear();
      Cookies.remove("verifyToken");
      window.location.href = "/login";
    }
    return error;
  }
};

export const BattleResultAPI = async (data) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/v1/battle/update-battle-result-by-user`,
      data,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("verifyToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    if (
      error?.response?.data?.statusCode === 401 ||
      error?.response?.data?.statusCode === 403
    ) {
      localStorage.clear();
      Cookies.remove("verifyToken");
      window.location.href = "/login";
    }
    return error;
  }
};

export const ReferNEarnAPI = async (data) => {
  try {
    const response = await axios.get(
      `${baseURL}/api/v1/users/referr-and-earn-page`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("verifyToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    if (
      error?.response?.data?.statusCode === 401 ||
      error?.response?.data?.statusCode === 403
    ) {
      localStorage.clear();
      Cookies.remove("verifyToken");
      window.location.href = "/login";
    }
    return error;
  }
};

export const adminLogin = async (data) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/v1/users/admin/login`,
      data
    );
    return response;
  } catch (error) {
    console.log("error", error?.response?.data?.message?.email);
    return error;
  }
};

export const adminSignup = async (data) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/v1/users/admin/register`,
      data,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("verifyToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const adminTransaction = async (data) => {
  try {
    const response = await axios.get(
      `${baseURL}/api/v1/transaction?type=${data}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("verifyToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const adminTransactionApprove = async (data) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/v1/transaction/admin-response`,
      data,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("verifyToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const adminUpdateQR = async (data) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/v1/admin/update-payment-setting`,
      data,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("verifyToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const adminGetSetting = async (data) => {
  try {
    const response = await axios.get(`${baseURL}/api/v1/admin/settings`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("verifyToken")}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const adminReferAmount = async (data) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/v1/admin/upadate-referral-amount-percentage`,
      data,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("verifyToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const adminAllUsers = async (data) => {
  try {
    const response = await axios.get(`${baseURL}/api/v1/admin/all-users`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("verifyToken")}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const adminSendNotification = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/api/v1/notification`, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("verifyToken")}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const adminSocialUpdate = async (data) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/v1/admin/update-social-media-links`,
      data,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("verifyToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const adminKycDetails = async (data) => {
  try {
    const response = await axios.get(
      `${baseURL}/api/v1/admin/get-verification-request-list`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("verifyToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const adminKycUpdateDetails = async (data) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/v1/admin/approve-kyc/${data}`,
      { hello: "" },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("verifyToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const adminKycRejectDetails = async (data) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/v1/admin/reject-kyc/${data}`,
      { hello: "" },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("verifyToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const adminTournamentGet = async (data) => {
  try {
    const response = await axios.get(`${baseURL}/api/v1/battle/admin/list`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("verifyToken")}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const adminTournamentGetbyId = async (data) => {
  try {
    const response = await axios.get(
      `${baseURL}/api/v1/battle/admin/details/${data}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("verifyToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const adminTournamentResult = async (data) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/v1/battle/update-battle-result-by-admin`,
      data,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("verifyToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const adminDashboard = async (data) => {
  try {
    const url = data?.checked
      ? `${baseURL}/api/v1/admin/dashboard?fromDate=${data.fromDate}&toDate=${data.toDate}`
      : `${baseURL}/api/v1/admin/dashboard`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${Cookies.get("verifyToken")}`,
      },
    });
    return response;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const adminUserList = async (data) => {
  try {
    const response = await axios.get(`${baseURL}/api/v1/admin/all-users-list`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("verifyToken")}`,
      },
    });
    return response;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const adminUserBlock = async (data) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/v1/admin/block-user`,
      data,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("verifyToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const adminUserPenality = async (data) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/v1/admin/add-penalty`,
      data,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("verifyToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const adminUserBonus = async (data) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/v1/admin/add-bonus`,
      data,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("verifyToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const adminSetPercentage = async (data) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/v1/admin/add-battle-earning-percentage`,
      data,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("verifyToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const adminUserData = async (data) => {
  try {
    const response = await axios.get(
      `${baseURL}/api/v1/admin/user-details/${data}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("verifyToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
