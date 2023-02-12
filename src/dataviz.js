import * as d3 from 'd3';

export const BarChart = (data, result) => {
  console.log(result);
  const devFunc = new Function('d3', 'data', result); 
  devFunc(d3, eval(data));
};

