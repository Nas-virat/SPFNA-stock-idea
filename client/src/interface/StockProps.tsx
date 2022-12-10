export interface StockProperties {
    symbol: string;
    price : number;
    cost_price : number;
    quantity : number;
    rate : number;
  }
  
export default interface StockProps{
    data :StockProperties[];
    totalvalue : number;
    pl : number;
    plpercent : number;
}
