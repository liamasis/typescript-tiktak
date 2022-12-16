import { useEffect, useState } from "react";
import "./App.css";

/* There are two different types of testing: unit integration e2e
  - Unit testing: Fully isolated. Test one function one by one.
    Write thousands of these
    No dependencies
  - Integration: testing function that calls a function. Dependencies. 
    Write a good couple of these
    few dependencies
  - End to end (E2E): Testing full flow. Manipulate the DOM. 
    Write few
    Lots of dependencies
  The more dependenci es the harder it is to test.
  Cypress or React Testing Library for E2E
  Jest for Unit and integration Testing.
  Puppeteer can be used for E2E but mostly web scraping.
  You can integrate E2E into jest testing as jest is light wait and you can import renderers/screens and use them in same file.
*/
export interface playerType {
  name: string | null;
  symbol: string;
}
export interface coord {
  coord: number[];
}
export interface moveType {
  coord: number[];
  player: playerType;
}

export function App() {
  const players = [
    {
      name: "Liam",
      symbol: "X",
    },
    {
      name: "Gab",
      symbol: "O",
    },
  ];

  const [moves, setMoves] = useState<moveType[]>([]);
  const [player, setPlayer] = useState<playerType>(players[0]);
  const [winner, setWinner] = useState<playerType | null>(null);

  useEffect(() => {
    if (moves.length < 3) return;
    const cP = moves[moves.length - 1].player;
    const fM = moves.filter((move: moveType) => move.player.name === cP.name);
    if (checkWin(fM)) {
      setWinner(cP);
    }
  }, [moves]);

  function checkWin(fM: moveType[]) {
    const xValues: number[] = [0, 0, 0];
    const yValues: number[] = [0, 0, 0];
    fM.forEach((move) => {
      xValues[move.coord[0] - 1] = xValues[move.coord[0] - 1]
        ? xValues[move.coord[0] - 1] + 1
        : 1;
      yValues[move.coord[1] - 1] = yValues[move.coord[1] - 1]
        ? yValues[move.coord[1] - 1] + 1
        : 1;
    });
    console.log(xValues);
    if (xValues.find((val) => val === 3)) return true;
    if (yValues.find((val) => val === 3)) return true;
    return false;
  }
  function addMove(coord: number[]) {
    const m = [...moves];
    m.push({ player, coord });
    setMoves(m);
    setPlayer(player.name === players[0].name ? players[1] : players[0]);
  }

  function Tile({ coord }: { coord: number[] }) {
    const fMoves = moves.find((move: moveType) => {
      return move.coord.join() === coord.join();
    });
    const text = fMoves ? fMoves.player.symbol : "";
    return (
      <div className="tileT" onClick={() => addMove(coord)}>
        {text}
      </div>
    );
  }
  if (winner) {
    return (
      <div>
        <h1>Winner: {winner.name}</h1>
      </div>
    );
  }
  return (
    <div className="App">
      <div className="tileRow">
        {[
          [1, 1],
          [1, 2],
          [1, 3],
        ].map((coord: number[]) => {
          return <Tile coord={coord} />;
        })}
      </div>
      <div className="tileRow">
        {[
          [2, 1],
          [2, 2],
          [2, 3],
        ].map((coord: number[]) => {
          return <Tile coord={coord} />;
        })}
      </div>
      <div className="tileRow">
        {[
          [3, 1],
          [3, 2],
          [3, 3],
        ].map((coord: number[]) => {
          return <Tile coord={coord} />;
        })}
      </div>
      <h1>Current player: {player.name}</h1>
    </div>
  );
}

export default App;
