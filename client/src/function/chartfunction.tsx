

interface stock{
    symbol: string;
    price : number;
    cost_price : number;
    quantity : number;
    rate : number;
  }


const chartFunction = (datachart : stock[]) => {
    const labels = datachart.map((item) => item.symbol);

    const rate = 1;

    const data = datachart.map((item) => item.price * item.quantity * rate);

    console.log(labels,data);

    return { labels, data };
    
    }


export default chartFunction;