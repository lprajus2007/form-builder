import React, { Fragment } from 'react'
import Dropdown from '../form-components/Dropdown'
import Slider from '../form-components/Slider'
import MaterialRadioGroup from '../form-components/RadioGroup'
import Label from '../form-components/Label'
import Layout from './Layout'


import { TextField, Grid } from '@material-ui/core'

const ItemRenderer = ({ greedy, direction, items, setItems, generateSchema, deleteSelf }) => {
    const componentReducer = (item) => {
        switch(item.name) {
            case 'VerticalLayout':
                return {item, component: <Grid container />};
            case 'ResponsiveLayout':
                return {item, component: <Layout items={items} setItems={setItems} deleteSelf={deleteSelf} generateSchema={generateSchema} direction="row" />};
            case 'TextField':
                return {item, component: <TextField label="text" variant="outlined" style={{width: '90%'}} />};
            case 'PhoneNumberInput':
                return {item, component: <div />};
            case 'Password':
                return {item, component: <TextField label="password" type="password" variant="outlined" style={{width: '90%'}} />};
            case 'RadioGroup':
                return {item, component: <MaterialRadioGroup />};
            case 'OutlinedInput':
                return {item, component: <TextField style={{ width: '90%' }} />};
            case 'FileUpload':
                return {item, component: <TextField />};
            case 'Dropdown':
                return {item, component: <Dropdown style={{width: '90%'}} />};
            case 'DateInput':
                return {item, component: <TextField />};
            case 'CountrySelector':
                return {item, component: <TextField />};
            case 'Blob':
                return {item, component: <TextField />};
            case 'Agreements':
                return {item, component: <TextField />};
            case 'Address':
                return {item, component: <TextField />};
            case 'Slider':
                return {item, component: <Slider />};
            case 'Label':
                return {item, component: <Label label={item.label} />};
            default: 
                return {item: {name: "", weight: 6, type: 'box'}, component: <Fragment />};
        }
    }
    return items.map(componentReducer).map((field, i) => <Grid item justify="space-around" alignItems="center" key={`item-${field.item.name}-${i}`} xs={direction === 'row' ? field.item.weight || 6 : 12}>{field.component}</Grid>);
}

export default ItemRenderer;
