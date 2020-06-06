import React from "react";
import Card from "../Cards";
import "./index.css";

export default function Column({
  index,
  title,
  titleColor,
  addCardToColumn,
  cards,
  moveCard,
  handleDeleteColumn,
  length,
  columns,
  handleDeleteCard,
  handleMoveColumn
}) {
  const handleAddCard = () => {
    const userInput = window.prompt("Please write a card name");
    if (userInput) {
      addCardToColumn(userInput, index);
    }
  };
  const deleteCard = () => {
    const sure = window.prompt(
      "If you do wanna delete this card, input Text yes "
    );
    if (sure === "yes") {
      handleDeleteColumn(index);
    }
  };

  return (
    <div className="column-container">
        <div className='col-top' style={{ backgroundColor: titleColor }}>
                {
                index !== 0 && (
                    <div className="prev">
                    <button onClick={() => handleMoveColumn(index, index - 1)}>
                        Prev
                    </button>
                    </div>
                )
                }
                <div className="header" >
                    {title}
                </div>
                {index !== length && (
                    <div className="next">
                    <button onClick={() => handleMoveColumn(index, index + 1)}>
                        Next
                    </button>
                    </div>
                )}
        </div>
       
      <div className="list">
                    {
              cards &&(
                cards.map((card, i) => (
                    <Card
                      handleMoveCard={moveCard}
                      index={index}
                      key={i}
                      title={card.title}
                      cardIndex={i}
                      length={length}
                      columns={columns}
                      handleDeleteCard={handleDeleteCard}
                    />
                    )))
                }
          
        
      </div>
      <div className="footer">
        <button onClick={handleAddCard}>+ Add a card</button>
      </div>
      <button className="clo-delete" onClick={deleteCard}>
        Delete {columns[index].title}
      </button>
    </div>
  );
}
