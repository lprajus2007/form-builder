import React, { useState, Fragment } from 'react'
import Layout from './Layout'
import Box from './Box'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import ReactJson from 'react-json-view'

import { Paper, Grid, GridList, Button, Modal, Backdrop, Fade } from '@material-ui/core'

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

const styles = {
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    background: 'white',
    minHeight: '5em',
    display: 'flex',
    alignItems: 'center'
  },
  button: {
    marginTop: '20px'
  },
  schemaStyle: {
    maxHeight: '40vh',
    overflow: 'scroll'
  }
}

export default function DndPlayground() {
  const [items, setItems] = useState([])
  const [savedSchema, setSavedSchema] = useState()
  const [showModal, setShowModal] = useState(false)

  const deleteLayout = () => {
    setItems([]);
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

  const saveSchema = () => {
    if (items.length) {
      const schema = generateSchema(items);
      setSavedSchema(schema);
    }
    else {
      setShowModal(true);
    }
  }

  const downloadSchema = () => {
    download('uiSchema.json', savedSchema);
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showModal}
        style={styles.modal}
        onClose={() => setShowModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showModal}>
          <div style={styles.modalContent}>Form is empty!</div>
        </Fade>
      </Modal>
      <DndProvider backend={HTML5Backend}>
        <Grid container justify="center" spacing={4} style={{minHeight: '16em'}}>
          <Grid key={0} item xs={6} >
            <Layout keyy='layout-base' isInitial items={items} setItems={setItems} deleteSelf={deleteLayout} generateSchema={saveSchema} selfIndex={-1} />
          </Grid>
          <Grid key={1} item xs={6}>
            <Grid container direction="column">
              <Grid item>
                <Paper style={{margin: '4em 1em', padding: '1em', minHeight: '8em', background: 'lightgrey'}}>
                  <GridList cellHeight={160}>
                    {tileData.map((tile, i) => (<Box name={tile.title} key={`box-${i}`} />))}
                  </GridList>
                </Paper>
              </Grid>
              <Grid item>
                {savedSchema && <Fragment><div style={styles.schemaStyle} >
                  <ReactJson theme="ocean" displayDataTypes={false} displayObjectSize={false} src={savedSchema} style={{padding: '10px'}} />
                </div><Button onClick={downloadSchema} style={styles.button}>Download</Button></Fragment>}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DndProvider>
    </div>
  )
}