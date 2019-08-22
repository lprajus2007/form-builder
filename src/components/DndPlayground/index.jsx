import React, {useState} from 'react'
import Layout from './Layout'
import Box from './Box'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { Paper, Grid, GridList, Typography } from '@material-ui/core'

const tileData = [
  {
    title: 'VerticalLayout'
  },
  {
    title: 'ResponsiveLayout'
  },
  {
    title: 'TextField'
  },
  // {
  //   title: 'PhoneNumberInput'
  // },
  {
    title: 'Password'
  },
  {
    title: 'RadioGroup'
  },
  {
    title: 'OutlinedInput'
  },
  // {
  //   title: 'FileUpload'
  // },
  {
    title: 'Dropdown'
  },
  {
    title: 'Slider'
  },
  {
    title: 'Label'
  }
  // {
  //   title: 'DateInput'
  // },
  // {
  //   title: 'CountrySelector'
  // },
  // {
  //   title: 'Blob'
  // },
  // {
  //   title: 'Agreements'
  // },
  // {
  //   title: 'Address'
  // }
];

export default function DndPlayground() {
  const [items, setItems] = useState([])
  const deleteLayout = () => {
    items.pop();
  }
  const generateSchema = () => {
    console.log(items);
  }

  return (
    <div className="App">
      <Typography variant="h3" align="center">OANDA Form Builder</Typography>
      <DndProvider backend={HTML5Backend}>
        <Grid container xs={12} justify="center" spacing={4} style={{minHeight: '8em'}}>
          <Grid key={0} item xs={6} >
            <Layout items={items} setItems={setItems} deleteSelf={deleteLayout} generateSchema={generateSchema} />
          </Grid>
          <Grid key={1} item xs={6}>
            <Paper style={{margin: '4em', padding: '1em'}}>
              <GridList cellHeight={160}>
                {tileData.map(tile => (<Box name={tile.title}>{tile.title}</Box>))}
              </GridList>
            </Paper>
          </Grid>
        </Grid>
      </DndProvider>
    </div>
  )
}