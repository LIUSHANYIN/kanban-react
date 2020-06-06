import React from "react";
import "./index.css";

export default function Cards({
  index,
  handleMoveCard,
  cardIndex,
  title,
  length,
  columns,
  handleDeleteCard,
}) {
  const deleteCard = () => {
    handleDeleteCard(index, cardIndex);
  };
  return (
    <div className="card">
      {index !== 0 && (
        <div className="prev">
          <button onClick={() => handleMoveCard(index, index - 1, cardIndex)}>
            Prev
          </button>
        </div>
      )}
      <div className="content">{title}</div>
      <button onClick={deleteCard}>
        Delete {columns[index].cards[cardIndex].title.substr(0, 3)}
      </button>

      {index !== length && (
        <div className="next">
          <button onClick={() => handleMoveCard(index, index + 1, cardIndex)}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}
