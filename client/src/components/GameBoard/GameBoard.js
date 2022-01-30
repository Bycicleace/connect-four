import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_GAME } from "../../utils/queries";
import "./GameBoard.css";
const img0 = require("../../assets/board/0.png");
const img1 = require("../../assets/board/1.png");
const img2 = require("../../assets/board/2.png");

function GameBoard(props) {
  // Get game ID from prop passing
  const { params } = props;
  const board = params;
  let col = -1;
  let row = 0;

  return (
    <div className="gameBoard__container">
      {board.map((column) => {
        col += 1;
        row = -1;
        return (
          <div className="gameBoard__column" key={`${col}`}>
            {column.split("").map((field) => {
              row += 1;
              switch (field) {
                case "0":
                  return (
                    <img
                      id={`${col}${row}`}
                      className="gameBoard__field"
                      src={img0}
                      key={`${col}${row}`}
                    />
                  );
                case "1":
                  return (
                    <img
                      id={`${col}${row}`}
                      className="gameBoard__field"
                      src={img1}
                      key={`${col}${row}`}
                    />
                  );
                case "2":
                  return (
                    <img
                      id={`${col}${row}`}
                      className="gameBoard__field"
                      src={img2}
                      key={`${col}${row}`}
                    />
                  );
              }
            })}
          </div>
        );
      })}
    </div>
  );
}

export default GameBoard;
