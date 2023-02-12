import React, { useEffect, useRef, useState } from 'react';
import { BarChart }  from './dataviz';
import { Paper, Button, Grid, AppBar, Toolbar, Typography, Container } from '@mui/material';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another


const sampleData = [
  { letter: 'A', frequency: 0.2847 },
  { letter: 'B', frequency: 0.1492 },
  { letter: 'C', frequency: 0.2782 },
  // ...
];

const App = () => {
  const chartRef = useRef(null);
  const [data, setData] = React.useState(` [
  { letter: 'A', frequency: 0.2847 },
  { letter: 'B', frequency: 0.1492 },
  { letter: 'C', frequency: 0.2782 },
  // ...
]`);

  const handleButtonClick = () => {
    // execute the D3 code and set the result
     BarChart(data, code);
   
  };

  useEffect(() => {
    BarChart(data, code);
  }, []);

  const [code, setCode] = React.useState(
    `const svg = d3.select('svg') .attr("width", 600)
  .attr("height", 400);
  svg.selectAll("*").remove();
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = +svg.attr('width') - margin.left - margin.right;
  const height = +svg.attr('height') - margin.top - margin.bottom;
  const g = svg.append('g')
    .attr('transform',  \`translate(\$\{margin.left\},\$\{margin.top\})\`);

  const x = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1);
  const y = d3.scaleLinear()
    .rangeRound([height, 0]);

  x.domain(data.map(d => d.letter));
  y.domain([0, d3.max(data, d => d.frequency)]);

  g.append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', \`translate(0,\$\{height\})\`)
    .call(d3.axisBottom(x));

  g.append('g')
    .attr('class', 'axis axis--y')
    .call(d3.axisLeft(y).ticks(10, '%'))
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '0.71em')
    .attr('text-anchor', 'end')
    .text('Frequency');

  g.selectAll('.bar')
    .data(data)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', d => x(d.letter))
    .attr('y', d => y(d.frequency))
    .attr('width', x.bandwidth())
    .attr('height', d => height - y(d.frequency));
    `
  );

  return (
        <div sx={{height: '100vh'}}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6">
                My React + D3 App Template
              </Typography>
            </Toolbar>
          </AppBar>
          <Grid container direction="row" justify="center" alignItems="center" sx={{width:'100%',  marginTop: 5, marginLeft: 3, marginRight:3 }}  spacing={5} >
            <Grid item sx={{
    height: '100%',
    width: '50%',
  }}>
  <Paper style={{ padding: 16, maxHeight: '400px', minHeight: '400px', overflow:'scroll' }}>
    <Editor
      value={code}
      onValueChange={code => setCode(code)}
      highlight={code => highlight(code, languages.js)}
      padding={20}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
      }}
    />

        </Paper>
           <Button variant="contained" color="primary" onClick={handleButtonClick} style={{ marginTop: 16 }}>
            Execute D3 code
          </Button>
  <Paper style={{ padding: 16, maxHeight: '200px', minHeight: '200px', overflow:'scroll' }}>
    <Editor
      value={data}
      onValueChange={data => setData(data)}
      highlight={data => highlight(data, languages.js)}
      padding={20}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
      }}
    />

        </Paper>

            </Grid>
            <Grid item sx={{
    height: '100%',
    width: '50%',
  }} >
<svg id="chart" ref={chartRef} />
          </Grid>
          </Grid>
          <footer sx={{width: '100%'}}>
            <Typography variant="body2" color="textSecondary" align="center">
              My React + D3 App Template
            </Typography>
          </footer>
        </div>
  );
};

export default App;
