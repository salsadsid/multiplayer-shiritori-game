import { useCallback, useState } from "react";
import WordInput from "../input/wordInput";

const PlayerPad = ({
  playerRefs,
  handlePressEnter,
  playerWords,
  error,
  name,
  points,
}) => {
  const [inputedValue, setInputedValue] = useState("");

  const handleWordInput = useCallback((e, value) => {
    e.preventDefault();
    setInputedValue(value);
  }, []);
  const handleBlur = useCallback((e) => {
    e.preventDefault();
    setInputedValue("");
  }, []);
  //   console.log(words, "Mark 1");
  return (
    <div className="min-h-[300px] min-w-[350px] bg-green-100 border rounded-sm hover:border-green-300 focus:border-green-300 p-3 px-8 flex flex-col justify-start items-center">
      <p className="flex text-xl mb-4 italic items-center gap-4">
        {name}
        <span className="bg-blue-100 rounded-full p-2 font-medium">
          {points ? points : 0}
        </span>
      </p>
      <WordInput
        ref={playerRefs}
        onChangeHandle={handleWordInput}
        onEnterPressHandle={handlePressEnter}
        onBlurHandle={handleBlur}
        value={inputedValue}
      />
      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
      <div>
        {playerWords?.length > 0 &&
          playerWords?.map((w, i) => <p key={i}>{w}</p>)}
      </div>
    </div>
  );
};

export default PlayerPad;
