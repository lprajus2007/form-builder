import React from 'react'
import { useDrag } from 'react-dnd'

const style = {
  display: 'inline-block',
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  margin: '0.5rem 1rem',
  backgroundColor: 'white',
  cursor: 'move',
}
const Box = ({ name, children }) => {
  const [, drag] = useDrag({ 
    item: { name, weight: 4, type: 'box' },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        console.log(`You dropped ${item.name} into ${dropResult.name}!`)
      }
    },
  })

  return (
    <div ref={drag} style={style}>
      {children}
    </div>
  )
}
export default Box
