import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

const dummy = [
  {
    value: "dummy",
    label: "1"
  },
  {
    value: "dummy2",
    label: "2"
  },
  {
    value: "dummy3",
    label: "3"
  },
  {
    value: "dummy4",
    label: "4"
  }
];

class TextFields extends React.Component {
  state = {
    dummy: "dummy1"
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    return (
      <TextField
        id="standard-select-dummy"
        select
        label={this.props.label || "Select"}
        value={this.state.dummy}
        helperText={this.props.helperText || "Helper text to help the user pick an option"}
        margin="normal"
        style={{width: '100%'}}
      >
        {dummy.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    );
  }
}

export default TextFields;