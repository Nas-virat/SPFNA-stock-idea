

import {StockProperties} from "../interface/StockProps";

const chartFunction = (datachart : StockProperties[],totalValue : number) => {
    const labels = datachart.map((item) => item.symbol);

    const rate = 1;

    const data = datachart.map((item) => (item.price * item.quantity * rate)*100/totalValue);

    console.log(labels,data);

    return { labels, data };
    
    }


export default chartFunction;