import React, { useState } from "react";
import "./App.css";
import Column from "./components/Column";
import { useEffect } from "react";
import dataService from "./service/index";
import shortid from "shortid";

function App() {
  const [columns, setColumns] = useState([]);
  const [width, setWidth] = useState("");
  const [color, setColor] = useState("");
  const [length, setLength] = useState(3);
  const userId = "5ed705b53d91074e065ef8ca";

  useEffect(() => {
    const fetchDate = async () => {
      const result = await dataService.handleFetchDate(userId);
      console.log(result);
      setColumns(result.data.data.columnDate);
    };
    fetchDate();
  }, []);

  useEffect(() => {
    const fetchDate = async () => {
      const result = await dataService.handleFetchDate(userId);
      const finalCardIndex = result.data.data.columnDate.length;
      setLength(finalCardIndex - 1);
    };
    fetchDate();
  }, [columns, length]);

  useEffect(() => {
    const getRandomColor = () => {
      let color = "hsl(" + Math.random() * 360 + ", 100%,75%)";
      setColor(color);
    };
    getRandomColor();
  }, [width]);

  useEffect(() => {
    const fetchDate = async () => {
      const result = await dataService.handleFetchDate(userId);
      const wid = result.data.data.columnDate.length * 380 + 500;
      setWidth(wid);
    };
    fetchDate();
  }, [width, columns]);

  const handleAddCard = async (input, index) => {
    await dataService.serviceAddCard(userId, index, input);

    const result = await dataService.handleFetchDate(userId);
    setColumns(result.data.data.columnDate);
  };

  const handleMoveCard = async (currentColumn, nextColumn, cardIndex) => {
    await dataService.serviceMoveCard(
      userId,
      currentColumn,
      nextColumn,
      cardIndex
    );
    const result = await dataService.handleFetchDate(userId);
    setColumns(result.data.data.columnDate);
  };

  const handleAddColumn = async () => {
    const userInput = window.prompt("Please write a list name");
    if (userInput) {
      await dataService.serviceAddColumn(userId, userInput, color);
    }
    const result = await dataService.handleFetchDate(userId);
    setColumns(result.data.data.columnDate);
  };

  const handleDeleteColumn = async (columnIndex) => {
    await dataService.serviceDeleteColumn(userId, columnIndex);
    const result = await dataService.handleFetchDate(userId);
    setColumns(result.data.data.columnDate);
  };

  const handleDeleteCard = async (columnIndex, cardIndex) => {
    await dataService.serviceDeleteCard(userId, columnIndex, cardIndex);
    const result = await dataService.handleFetchDate(userId);
    setColumns(result.data.data.columnDate);
  };

  const handleMoveColumn = async (currentColumn, targetColumn) => {
    await dataService.serviceMoveColumn(userId, currentColumn, targetColumn);

    const result = await dataService.handleFetchDate(userId);
    setColumns(result.data.data.columnDate);
  };

  const trackColumn = (index) => {
    window.scrollTo({
      left: index * 350,
      behavior: "smooth",
    });
  };
  const moveEnd = () => {
    window.scrollTo({
      left: width,
      behavior: "smooth",
    });
  };

  return (
    <div className="App" style={{ width: `${width}px` }}>
      <div className="columns-container">
        {columns &&
          columns.map((column, i) => (
            <Column
              key={i}
              moveCard={handleMoveCard}
              addCardToColumn={handleAddCard}
              index={i}
              titleColor={column.color}
              cards={column.cards}
              title={column.title}
              handleDeleteColumn={handleDeleteColumn}
              length={length}
              columns={columns}
              handleDeleteCard={handleDeleteCard}
              handleMoveColumn={handleMoveColumn}
            />
          ))}
        <button onClick={handleAddColumn} className="clo-bt">
          Add a new List
        </button>
      </div>

      <div className="small-map">
        {columns &&
          columns.map((col, i) => (
            <div key={shortid.generate()} className="small-card">
              <button
                style={{ backgroundColor: col.color }}
                onClick={() => trackColumn(i)}
              >
                {col.title.substr(0, 10)}
              </button>
            </div>
          ))}
        <button onClick={moveEnd} className="small-add">
          Add
        </button>
      </div>
    </div>
  );
}

export default App;
