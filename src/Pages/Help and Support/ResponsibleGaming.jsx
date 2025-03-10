import React, { useEffect } from "react";

const ResponsibleGaming = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ paddingBottom: '10em' }}>
      <div className="support-heading">Responsible Gaming</div>
      <div className="privacy-container-text-intro">Our Mission Statement</div>
      <div className="privacy-container-text">
        Play Games 24x7 encourages all its players to play responsibly. We are
        committed to helping players who wish to stop playing or who wish to
        limit the amount that they play.
      </div>
      <div className="privacy-container-text">
        Ensure Responsible Play Players must be 18 years of age to play skill
        games. Players can request for their accounts to be temporarily blocked,
        if they want to self-exclude themselves for some time. Players can
        follow our ‘Guide to Responsible Play’ in order to keep a check on their
        play behaviour.
      </div>
      <div
        className="privacy-container-text-intro"
        style={{ paddingTop: "15px" }}
      >
        Guide to Responsible Play
      </div>
      <div className="privacy-container-text">
        Sometimes, players may find it hard to recognize that their online play
        is getting out of control. A common reaction is to minimize, hide or
        deny such problems and the harm it could be causing. Some people will
        lie to themselves about how much money or time is being spent on online
        playing. Following are some of the best practices to help you play
        responsibly:
      </div>
      <div className="privacy-container-text">
        Play in moderation and only for entertainment. Do not play to make money
        or escape problems. Never chase your losses while playing. Set aside an
        entertainment budget. Keep track of the time and monitor the amount of
        money you spend. Use the Add Cash limit option to help control the
        amount you spend. Balance the time you spend on playing online games
        with other leisure activities.
      </div>
      <div
        className="privacy-container-text-intro"
        style={{ paddingTop: "15px" }}
      >
        Recognize whether you are not playing responsibly Do you do any of the
        following:
      </div>
      <div className="privacy-container-text">
        I. Do you spend more money and time than you intend to playing games? Do
        you feel guilty or ashamed while game playing habits? Do you try to win
        back your losses? Do you miss important things in life such as family
        time, work, leisure activities, appointments to play games? Do you think
        about your gameplay all day long? Do you have arguments with friends or
        family about you playing habits? Do you lie or steal to get money to
        play games? Do you have debts or struggled financially to play games?
        Has playing games negatively impacted your professional life? Do you
        have relationship problems like arguments, disagreements or loss of
        Connection with friends and family? Have you experienced an increase in
        stress, depression or panic attacks due to playing games?
      </div>
      <div className="privacy-container-text">
        Game Prudence Game Prudence is an independent body which aims to help
        players, playing on skill-gaming websites, in incorporating responsible
        gaming habits into their lifestyles. Game Prudence is a non-judgemental
        platform providing you with private, confidential and free of cost
        psychological counselling, wherein you can identify how healthy your
        gaming habits are as well as receive professional guidance from experts.
        All Game Prudence experts are certified by iGaming Academy. To Learn
        More..
      </div>
      <div className="privacy-container-text">
        Get Help from Game Prudence If you suspect that you are facing any of
        the issues mentioned above and as a result have not been playing
        responsibly, or if you know someone who is facing similar issues, kindly
        seek help immediately. You can get help by registering your request at
        Game Prudence.
      </div>
    </main>
  );
};

export default ResponsibleGaming;
