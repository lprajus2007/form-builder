import React, { useState, Fragment } from 'react'
import { useDrag } from 'react-dnd'

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, TextField } from '@material-ui/core';

const style = {
  display: 'inline-block',
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  margin: '0.5rem 1rem',
  backgroundColor: 'white',
  cursor: 'move',
}

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

const Box = ({ name }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    label: "",
    helperText: ""
  });
  const [item, setItem] = useState({
    name,
    label: "",
    helperText: "",
    weight: 4,
    type: 'box' 
  });

  const handleDoubleClick = () => {
    setItem({
      name,
      label: "",
      helperText: "",
      weight: 4,
      type: 'box' 
    });
    setValues({
      label: ""
    })
    setOpen(true);
  }

  const handleSave = () => {
    setItem({...item, ...values});
    handleClose();
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  }

  const getContent = (name) => (
    <form>
      <Fragment>
        <TextField
          id="label"
          label="Enter Label"
          className={classes.textField}
          value={values.label}
          onChange={handleChange('label')}
          margin="normal"
        />
        {item.name === 'Dropdown' && <TextField
          id="helperText"
          label="Enter Helper Text"
          className={classes.textField}
          value={values.helperText}
          onChange={handleChange('helperText')}
          margin="normal"
        />}
      </Fragment>
    </form>
  )

  const [, drag] = useDrag({
    item,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        setItem({
          name,
          label: "",
          weight: 4,
          type: 'box' 
        });
      }
    },
  })

  return (
    <div ref={drag} onDoubleClick={handleDoubleClick} style={style}>
      <div>{item.name}</div>
      {item.label && <div>{item.label}</div>}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">{item.name}</h2>
            {getContent(item.name)}
            <Button onClick={handleSave}>Save</Button>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
export default Box
