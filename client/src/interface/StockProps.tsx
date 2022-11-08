interface stock {
    symbol: string;
    price : number;
    cost_price : number;
    quantity : number;
    rate : number;
  }
export default interface StockProps{
    data :stock[];
    totalvalue : number;
    pl : number;
    plpercent : number;
}
