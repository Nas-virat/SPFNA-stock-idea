

import {StockProperties} from "../interface/StockProps";

const chartFunction = (datachart : StockProperties[]) => {
    const labels = datachart.map((item) => item.symbol);

    const rate = 1;

    //sum of all the values
    const totalValue = datachart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const data = datachart.map((item) => (item.price * item.quantity * rate)*100/totalValue);

    return { labels, data};
    
}

export default chartFunction;