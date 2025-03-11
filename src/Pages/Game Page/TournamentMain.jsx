import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminGetSetting } from "../../API/API";
import { FaWhatsapp } from "react-icons/fa";

const TournamentMain = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();

  const getData = async () => {
    const getReponse = await adminGetSetting();
    setData(getReponse?.data?.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const openLinkInNewTab = (url) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/R1-Battel.apk";
    link.download = "R1-Battel.apk";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="TournamentMain-title">OUR TOURNAMENTS</div>
      <div className="TournamentMain-container" style={{ marginTop: "2rem" }}>
        <div className="TournamentMain-item">
          <img
            src="/tournament1.jpg"
            className="TournamentMain-img"
            onClick={() => navigate("/tournaments/classic")}
          />
        </div>
        <div className="TournamentMain-item">
          <img
            src="/tournament3.png"
            className="TournamentMain-img"
            style={{ opacity: "0.5" }}
          />
          <span className="TournamentMain-overlay-text">Coming Soon</span>
        </div>
        <div className="TournamentMain-item">
          <img
            src="/tournament2.jpg"
            className="TournamentMain-img"
            style={{ opacity: "0.5" }}
          />
          <span className="TournamentMain-overlay-text">Coming Soon</span>
        </div>
        <div className="TournamentMain-item">
          <img
            src="/tournament5.jpg"
            className="TournamentMain-img"
            onClick={() => openLinkInNewTab(data?.whatsAppLink)}
          />
        </div>
      </div>

      <div className="download-apk">Download Coming Soon...</div>

      <div className="TournamentMain-title-1" style={{ paddingTop: "1rem" }}>
        About Us
      </div>
      <div className="TournamentMain-title-2">
        Ring Ludo is a skill-based gaming product owned and operated by
        STARVISTAR GAMING LLP ("STARVISTAR GAMING LLP" or "We" or "Us" or
        "Our").
      </div>
      <div className="TournamentMain-title-1">Our Business & Products</div>
      <div className="TournamentMain-title-2">
        We are an HTML5 game-publishing company and our mission is to make
        accessing games fast and easy by removing the friction of app-installs.
      </div>
      <div className="TournamentMain-title-2">
        Ring Ludo is a skill-based gaming platform accessible only for our users
        in India. It is accessible On Ring Ludo, users can compete for real cash
        in Tournaments and Battles. They can encash their winnings via popular
        options such as Paytm Wallet, Amazon Pay, Bank Transfer, Mobile
        Recharges etc.
      </div>
      <div className="TournamentMain-title-1">Our Games</div>
      <div className="TournamentMain-title-2">
        Ring Ludo has a wide variety of high-quality, premium HTML5 games. Our
        games are especially compressed and optimized to work on low-end
        devices, uncommon browsers, and patchy internet speeds.
      </div>
      <div className="TournamentMain-title-2">
        We have games across several popular categories: Arcade, Action,
        Adventure, Sports & Racing, Strategy, Puzzle & Logic. We also have a
        strong portfolio of multiplayer games such as Ludo, Chess, 8 Ball Pool,
        Carrom, Tic Tac Toe, Archery, Quiz, Chinese Checkers, and more! Some of
        our popular titles are: Escape Run, Bubble Wipeout, Tower Twist, Cricket
        Gunda, Ludo With Friends. If you have any suggestions around new games
        that we should add or if you are a game developer yourself and want to
        work with us, don't hesitate to drop in a line.
      </div>

      {/* WhatsApp Floating Button */}
     {/* WhatsApp Floating Button */}
<a
  href="https://wa.me/8395907200"
  target="_blank"
  rel="noopener noreferrer"
  className="whatsapp-float"
>
  <FaWhatsapp className="whatsapp-icon" />
</a>

{/* WhatsApp Floating Button CSS */}
<style>
  {`
    .whatsapp-float {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: #25d366;
      color: white;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      transition: transform 0.3s ease-in-out;
    }
    .whatsapp-float:hover {
      transform: scale(1.1);
    }
    .whatsapp-icon {
      font-size: 36px;
    }
  `}
</style>

    </div>
  );
};

export default TournamentMain;
