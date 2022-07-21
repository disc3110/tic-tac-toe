export const Player = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;
 
  return {getName, getSymbol}
 }