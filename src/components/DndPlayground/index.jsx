import React, { useState } from 'react'
import Layout from './Layout'
import Box from './Box'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { Paper, Grid, GridList } from '@material-ui/core'

const tileData = [
  // {
  //   title: 'ResponsiveLayout'
  // },
  {
    title: 'TextField'
  },
  {
    title: 'Password'
  },
  {
    title: 'RadioGroup'
  },
  {
    title: 'OutlinedInput'
  },
  {
    title: 'Dropdown'
  },
  {
    title: 'Slider'
  },
  {
    title: 'Label'
  }
];

export default function DndPlayground() {
  const [items, setItems] = useState([])
  const deleteLayout = (index) => {
    items.splice(index, 1);
    setItems(items);
  }

  const generateNodeKeys = (node) => {
    switch(node.name) {
      case 'Label' :
        return {
          type: 'Label',
          text: node.label || 'Label'
        }
      default:
        return {
          type: 'Control'
        }
    }
  }

  const download = (filename, schema) => {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;base64,' + btoa(JSON.stringify(schema)));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  const generateSchema = (nodes) => {
    if (nodes.hasOwnProperty('length')) {
      return {
        type: "ColumnLayout",
        elements: nodes.map(node => generateSchema(node))
      }
    }
    return {
      ...generateNodeKeys(nodes),
      scope: `#/properties/${nodes.name}`
    }
  }

  const downloadSchema = () => {
    const schema = generateSchema(items);
    console.log(schema);
    if (items.length) download('uiSchema.json', schema);
  }

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Grid container justify="center" spacing={4} style={{minHeight: '8em'}}>
          <Grid key={0} item xs={6} >
            <Layout keyy='layout-base' isInitial items={items} setItems={setItems} deleteLayout={deleteLayout} generateSchema={downloadSchema} selfIndex={-1} />
          </Grid>
          <Grid key={1} item xs={6}>
            <Paper style={{margin: '4em', padding: '1em'}}>
              <GridList cellHeight={160}>
                {tileData.map((tile, i) => (<Box name={tile.title} key={`box-${i}`} />))}
              </GridList>
            </Paper>
          </Grid>
        </Grid>
      </DndProvider>
    </div>
  )
}