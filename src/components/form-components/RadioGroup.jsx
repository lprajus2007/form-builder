import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { FormControlLabel, Grid } from "@material-ui/core";

const dummy = [
  {
    value: "1",
    label: "Opt1"
  },
  {
    value: "2",
    label: "Opt2"
  },
  {
    value: "3",
    label: "Opt3"
  },
  {
    value: "4",
    label: "Opt4"
  }
];

class MaterialRadioGroup extends React.Component {
  state = {
    dummy: "1"
  };

  handleChange = event => {
    this.setState({ dummy: event.target.value });
  };
  render() {
    return (
      <RadioGroup value={this.state.dummy} onChange={this.handleChange}>
        <Grid container xs={12}>
          {dummy.map(option => {
            return (
              <Grid item xs={3} key={option.value}>
                <div>
                  <FormControlLabel
                    value={option.value}
                    key={option.value}
                    control={
                      <Radio checked={this.state.dummy === option.value} />
                    }
                    label={option.label}
                  />
                </div>
              </Grid>
            );
          })}
        </Grid>
      </RadioGroup>
    );
  }
}

export default MaterialRadioGroup;