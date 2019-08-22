import React from "react";
import { Typography } from "@material-ui/core";

export default function Label() {
  return (
        <Typography style={{
            fontFamily: '"helvetica neue", Helvetica, Arial, sans-serif',
            fontSize: 16,
            lineHeight: '22px',
            padding: '0 3px',
            textAlign: 'left'
        }}>
            Label
        </Typography>
    );
}