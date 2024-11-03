import React, { useCallback, useRef, useState } from "react";
import PlayerPad from "../../components/playerPad/PlayerPad";

const Home = () => {
  const player1InputRef = useRef(null);
  const player2InputRef = useRef(null);
  const [player1words, setPlayer1Words] = useState([]);
  const [player2words, setPlayer2Words] = useState([]);
  const [player1points, setPlayer1points] = useState(100);
  const [player2points, setPlayer2points] = useState(100);
  const [error, setError] = useState({ player: "", message: "" });

  const handlePressEnterPlayer1 = useCallback(
    async (e) => {
      if (e.key == "Enter") {
        if (e.target.value?.length < 4) {
          setError({ player: "1", message: "Word must be 4 characters" });
          player1InputRef.current.focus();
        } else {
          setError({});
          if (player1words.find((w) => w === e.target.value)) {
            setError({ player: "1", message: "Word already exists." });
            return;
          }
          setPlayer1Words((prev) => [e.target.value, ...prev]);
          player2InputRef.current.focus();
          const res = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${e.target.value}`
          );
          const data = await res.json();

          if (data?.length > 0) {
            setPlayer1points(player1points - Number(player1words[0]?.length));
          }
        }
      }
    },
    [setPlayer1Words, setPlayer1points, player1points, player1words]
  );

  const handlePressEnterPlayer2 = useCallback(
    async (e) => {
      if (e.key == "Enter") {
        if (e.target.value?.length < 4) {
          setError({ player: "2", message: "Word must be 4 characters" });
          player2InputRef.current.focus();
        } else {
          setError({});
          if (player2words.find((w) => w === e.target.value)) {
            setError({ player: "2", message: "Word already exists." });
            return;
          }
          setPlayer2Words((prev) => [e.target.value, ...prev]);
          player1InputRef.current.focus();

          const res = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${e.target.value}`
          );
          const data = await res.json();
        }
      }
    },
    [setPlayer2Words, player2points, player2words]
  );
  //   console.log(player1words, player2words);
  return (
    <div className="flex justify-center items-start gap-20 my-8">
      <PlayerPad
        key={"#player-1"}
        playerRefs={player1InputRef}
        handlePressEnter={handlePressEnterPlayer1}
        playerWords={player1words}
        error={error?.player === "1" ? error.message : ""}
        name="Player 1"
        points={player1points}
      />
      <PlayerPad
        key={"#player-2"}
        playerRefs={player2InputRef}
        handlePressEnter={handlePressEnterPlayer2}
        playerWords={player2words}
        error={error?.player === "2" ? error.message : ""}
        points={player2points}
        name="Player 2"
      />
    </div>
  );
};

export default Home;
