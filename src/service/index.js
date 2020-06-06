import axios from "axios";

const url = "https://shanyinkanban.herokuapp.com/users";

const handleFetchDate = (userID) => {
  const data = axios.get(`${url}/fetch`, {
    params: { userId: userID },
  });
  return data;
};
const serviceAddColumn = (userId, columnName, color) => {
  const data = axios.post(`${url}/add`, {
    userId,
    columnName,
    color,
  });
  return data;
};
const serviceDeleteColumn = (userId, columnIndex) => {
  const data = axios.post(`${url}/delete`, {
    userId,
    columnIndex,
  });
  return data;
};
const serviceDeleteCard = (userId, columnIndex, cardIndex) => {
  const data = axios.post(`${url}/deleteCard`, {
    userId,
    columnIndex,
    cardIndex,
  });
  return data;
};

const serviceAddCard = (userId, columnIndex, cardName) => {
  const data = axios.post(`${url}/addCard`, {
    userId,
    columnIndex,
    cardName,
  });
  return data;
};
const serviceMoveCard = (userId, currentColumn, nextColumn, cardIndex) => {
  const data = axios.post(`${url}/moveCard`, {
    userId,
    currentColumn,
    nextColumn,
    cardIndex,
  });
  return data;
};
const serviceMoveColumn = (userId, currentColumn, targetColumn) => {
  const data = axios.post(`${url}/moveColumn`, {
    userId,
    currentColumn,
    targetColumn,
  });
  return data;
};

const dataService = {
  handleFetchDate,
  serviceAddColumn,
  serviceDeleteColumn,
  serviceDeleteCard,
  serviceAddCard,
  serviceMoveCard,
  serviceMoveColumn,
};

export default dataService;
