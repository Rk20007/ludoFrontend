import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminGetSetting } from "../../API/API";

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
        Ring Ludo is a skill based gaming product owned and operated by
        STARVISTAR GAMING LLP ("STARVISTAR GAMING LLP" or "We" or "Us" or
        "Our").
      </div>
      <div className="TournamentMain-title-1">Our Business & Products</div>
      <div className="TournamentMain-title-2">
        We are an HTML5 game-publishing company and our mission is to make
        accessing games fast and easy by removing the friction of app-installs.
      </div>
      <div className="TournamentMain-title-2">
        Ring Ludo is a skill based gaming platform accessible only for our users
        in India. It is accessible On Ring Ludo, users can compete for real cash
        in Tournaments and Battles. They can encash their winnings via popular
        options such as Paytm Wallet, Amazon Pay, Bank Transfer, Mobile
        Recharges etc.
      </div>
      <div className="TournamentMain-title-1">Our Games</div>
      <div className="TournamentMain-title-2">
        Ring Ludo has a wide-variety of high-quality, premium HTML5 games. Our
        games are especially compressed and optimised to work on low-end
        devices, uncommon browsers, and patchy internet speeds.
      </div>
      <div className="TournamentMain-title-2">
        We have games across several popular categories: Arcade, Action,
        Adventure, Sports & Racing, Strategy, Puzzle & Logic. We also have a
        strong portfolio of multiplayer games such as Ludo, Chess, 8 Ball Pool,
        Carrom, Tic Tac Toe, Archery, Quiz, Chinese Checkers and more! Some of
        our popular titles are: Escape Run, Bubble Wipeout, Tower Twist, Cricket
        Gunda, Ludo With Friends. If you have any suggestions around new games
        that we should add or if you are a game developer yourself and want to
        work with us, don't hesitate to drop in a line.
      </div>
    </div>
  );
};

export default TournamentMain;
