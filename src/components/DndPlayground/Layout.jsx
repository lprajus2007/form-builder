import React from 'react'
import { useDrop } from 'react-dnd'
import ItemTypes from './ItemTypes'
import ItemRenderer from './ItemRenderer'

import { Grid, IconButton, Paper } from '@material-ui/core'

const Layout = ({ greedy, direction, items, setItems, generateSchema, deleteSelf }) => {
  // const [hasDropped, setHasDropped] = useState(false)
  // const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false)

  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop(item, monitor) {
      const didDrop = monitor.didDrop()
      if (didDrop && !greedy) {
        return
      }
      setItems(oldItems => [...oldItems, item])
      // setHasDropped(true)
      // setHasDroppedOnChild(didDrop)
      return { name: 'ColumnLayout' }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  })

  const renderedGrid = <Grid 
    container
    direction={direction || 'column'}
    spacing={2}
    ref={drop} 
    style={{minHeight: '3em'}}
    xs={12}>
    <ItemRenderer items={items} setItems={setItems} deleteSelf={deleteSelf} generateSchema={generateSchema} direction={direction} />
    <Grid container style={{ marginTop: '1em' }} justify="flex-end">
      <Grid item style={{textAlign: 'right'}} xs={1}>
        <IconButton onClick={deleteSelf} style={{color: 'red'}}><i class="material-icons">clear</i></IconButton>
      </Grid>
      <Grid item style={{textAlign: 'right'}} xs={1}>
        <IconButton onClick={generateSchema} style={{color: 'green'}}><i class="material-icons">done</i></IconButton>
      </Grid>
    </Grid>
  </Grid>;

  return (
    <Paper style={{margin: '4em', padding: '1em'}}>
      {renderedGrid}
    </Paper>
  )
}

export default Layout
