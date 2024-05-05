

import {StockProperties} from "../interface/StockProps";

const chartFunction = (datachart : StockProperties[]) => {
    const labels = datachart.map((item) => item.symbol);

    //sum of all the values
    const totalValue = datachart.reduce((acc, item) => acc + item.price * item.quantity * item.rate, 0);

    const data = datachart.map((item) => (item.price * item.quantity * item.rate)*100/totalValue);

    return { labels, data};
    
}

export default chartFunction;