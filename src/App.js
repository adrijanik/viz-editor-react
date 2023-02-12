import React, { useEffect, useRef, useState } from 'react';
import { BarChart }  from './dataviz';
import { TextareaAutosize, Paper, Button, Grid, AppBar, Toolbar, Typography } from '@mui/material';
import { createEditor } from 'slate'
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


const initialValue = [ {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]


const App = () => {
  const [d3Code, setD3Code] = useState('');
  const [result, setResult] = useState(null);

  const chartRef = useRef(null);
  const handleCodeChange = (event) => {
    setD3Code(event.target.value);
  };

  const handleButtonClick = () => {
    // execute the D3 code and set the result
    setResult(d3Code);
  };

  useEffect(() => {
    BarChart(sampleData);
  }, []);

  useEffect(() => {
    // update the result when the D3 code changes
  }, [d3Code]);
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
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

            </Grid>
            <Grid item sx={{
    height: '100%',
    width: '50%',
  }} >
{result || <svg id="chart" ref={chartRef} />}
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
