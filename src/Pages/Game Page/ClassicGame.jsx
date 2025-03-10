import React, { useEffect } from "react";
import ClassicBlock1 from "../../Components/Card/ClassicBlock1";
import OpenBattel from "./OpenBattel";
import LiveBattle from "./LiveBattle";
import { CreateBattleAPI, GetBattleDataAPI } from "../../API/API";
import toast from "react-hot-toast";
import { Button, CircularProgress } from "@mui/material";

const fakeBattles = [
  {
    _id: "battle_1",
    createdBy: { _id: "user_1", name: "Arjun Sharma" },
    roomNo: 100,
    status: "ONGOING",
    entryFee: 1350,
    winnerAmount: 2565, // (1350 * 2) - 5%
    acceptedBy: { _id: "user_11", name: "Priya Patel" },
    isBattleRequestAccepted: true,
    isFakeBattle: true,
  },
  {
    _id: "battle_2",
    createdBy: { _id: "user_2", name: "Ravi Kumar" },
    roomNo: 101,
    status: "ONGOING",
    entryFee: 1750,
    winnerAmount: 3325, // (1750 * 2) - 5%
    acceptedBy: { _id: "user_12", name: "Aarti Reddy" },
    isBattleRequestAccepted: true,
    isFakeBattle: true,
  },
  {
    _id: "battle_3",
    createdBy: { _id: "user_3", name: "Sanya Gupta" },
    roomNo: 102,
    status: "ONGOING",
    entryFee: 9100,
    winnerAmount: 17245, // (9100 * 2) - 5%
    acceptedBy: { _id: "user_13", name: "Vikram Singh" },
    isBattleRequestAccepted: true,
    isFakeBattle: true,
  },
  {
    _id: "battle_4",
    createdBy: { _id: "user_4", name: "Tanvi Desai" },
    roomNo: 103,
    status: "ONGOING",
    entryFee: 8000,
    winnerAmount: 15200, // (8000 * 2) - 5%
    acceptedBy: { _id: "user_14", name: "Mohit Mehta" },
    isBattleRequestAccepted: true,
    isFakeBattle: true,
  },
  {
    _id: "battle_5",
    createdBy: { _id: "user_5", name: "Neha Joshi" },
    roomNo: 104,
    status: "ONGOING",
    entryFee: 1200,
    winnerAmount: 2280, // (1200 * 2) - 5%
    acceptedBy: { _id: "user_15", name: "Rajesh Iyer" },
    isBattleRequestAccepted: true,
    isFakeBattle: true,
  },
  {
    _id: "battle_6",
    createdBy: { _id: "user_6", name: "Karan Nair" },
    roomNo: 105,
    status: "ONGOING",
    entryFee: 300,
    winnerAmount: 570, // (300 * 2) - 5%
    acceptedBy: { _id: "user_16", name: "Maya Sharma" },
    isBattleRequestAccepted: true,
    isFakeBattle: true,
  },
  {
    _id: "battle_7",
    createdBy: { _id: "user_7", name: "Siddharth Verma" },
    roomNo: 106,
    status: "ONGOING",
    entryFee: 950,
    winnerAmount: 1802.5, // (950 * 2) - 5%
    acceptedBy: { _id: "user_17", name: "Swati Singh" },
    isBattleRequestAccepted: true,
    isFakeBattle: true,
  },
  {
    _id: "battle_8",
    createdBy: { _id: "user_8", name: "Rina Agarwal" },
    roomNo: 107,
    status: "ONGOING",
    entryFee: 7500,
    winnerAmount: 14250, // (7500 * 2) - 5%
    acceptedBy: { _id: "user_18", name: "Amit Kumar" },
    isBattleRequestAccepted: true,
    isFakeBattle: true,
  },
  {
    _id: "battle_9",
    createdBy: { _id: "user_9", name: "Suresh Patel" },
    roomNo: 108,
    status: "ONGOING",
    entryFee: 11000,
    winnerAmount: 20900, // (11000 * 2) - 5%
    acceptedBy: { _id: "user_19", name: "Neelam Kapoor" },
    isBattleRequestAccepted: true,
    isFakeBattle: true,
  },
  {
    _id: "battle_10",
    createdBy: { _id: "user_10", name: "Deepak Rao" },
    roomNo: 109,
    status: "ONGOING",
    entryFee: 200,
    winnerAmount: 380, // (200 * 2) - 5%
    acceptedBy: { _id: "user_20", name: "Pooja Choudhary" },
    isBattleRequestAccepted: true,
    isFakeBattle: true,
  },
  {
    _id: "battle_11",
    createdBy: { _id: "user_11", name: "Vishal Singh" },
    roomNo: 110,
    status: "ONGOING",
    entryFee: 450,
    winnerAmount: 855, // (450 * 2) - 5%
    acceptedBy: { _id: "user_21", name: "Sneha Yadav" },
    isBattleRequestAccepted: true,
    isFakeBattle: true,
  },
  {
    _id: "battle_12",
    createdBy: { _id: "user_12", name: "Preeti Sharma" },
    roomNo: 111,
    status: "ONGOING",
    entryFee: 650,
    winnerAmount: 1235, // (650 * 2) - 5%
    acceptedBy: { _id: "user_22", name: "Ajay Tiwari" },
    isBattleRequestAccepted: true,
    isFakeBattle: true,
  },
  {
    _id: "battle_13",
    createdBy: { _id: "user_13", name: "Anjali Mehta" },
    roomNo: 112,
    status: "ONGOING",
    entryFee: 700,
    winnerAmount: 1330, // (700 * 2) - 5%
    acceptedBy: { _id: "user_23", name: "Kunal Das" },
    isBattleRequestAccepted: true,
    isFakeBattle: true,
  },
  {
    _id: "battle_14",
    createdBy: { _id: "user_14", name: "Manish Kapoor" },
    roomNo: 113,
    status: "ONGOING",
    entryFee: 100,
    winnerAmount: 190, // (100 * 2) - 5%
    acceptedBy: { _id: "user_24", name: "Meera Jain" },
    isBattleRequestAccepted: true,
    isFakeBattle: true,
  },
  {
    _id: "battle_15",
    createdBy: { _id: "user_15", name: "Rohit Sharma" },
    roomNo: 114,
    status: "ONGOING",
    entryFee: 400,
    winnerAmount: 760, // (400 * 2) - 5%
    acceptedBy: { _id: "user_25", name: "Divya Bhatt" },
    isBattleRequestAccepted: true,
    isFakeBattle: true,
  },
];

const ClassicGame = () => {
  const [battleData, setBattleData] = React.useState([]);
  const [amountData, setAmount] = React.useState("");
  const [loading, setloading] = React.useState(true);

  const getData = async () => {
    try {
      const response = await GetBattleDataAPI();
      const liveBattles = response.data.data.liveBattles || [];
      const combinedLiveBattles = [...liveBattles, ...fakeBattles];
      setBattleData({
        ...response.data.data,
        liveBattles: combinedLiveBattles,
      });
    } catch (error) {
      toast.error("Failed to fetch battle data.");
    }
  };

  const sendData = async () => {
    setloading(false);
    if (amountData < 50) {
      toast.error("Amount should be greater than 50");
      setloading(true);
      return;
    }
    if (amountData === "") {
      toast.error("Please enter amount");
      setloading(true);
    } else {
      try {
        const response = await CreateBattleAPI(amountData);
        console.log("response", response);
        if (response?.response?.status === 400) {
          toast.error(response?.response?.data?.message);
          setloading(true);
          return;
        }
        toast.success(response?.data?.message);
        setAmount("");
        setloading(true);
      } catch (error) {
        // console.log("error", error);
        toast.error(error.response.data.message);
        setloading(true);
        return;
      }
    }
  };

  useEffect(() => {
    const inetrvalData = setInterval(() => {
      getData();
    }, 1000);

    return () => clearInterval(inetrvalData);
  }, []);

  return (
    <div className="ClassicGame-main" style={{ marginBottom: "2rem" }}>
      <ClassicBlock1 />
      <div>
        <div className="ClassicGame-title">CREATE A BATTLE!</div>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <input
            placeholder="Enter Amount (min 50)"
            className="ClassicGame-input"
            type="number"
            onChange={(e) => setAmount(e.target.value)}
            value={amountData}
          />
          {loading ? (
            <button className="ClassicGame-btn" onClick={sendData}>
              Create
            </button>
          ) : (
            <Button variant="contained" disabled>
              <CircularProgress size={24} />
            </Button>
          )}
        </div>
      </div>
      <OpenBattel data={battleData.openBattles} />
      <LiveBattle data={battleData.liveBattles} />
    </div>
  );
};

export default ClassicGame;
