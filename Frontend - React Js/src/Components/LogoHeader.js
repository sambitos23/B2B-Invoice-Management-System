import { Grid } from '@mui/material'
import React from 'react'

function LogoHeader() {
  return (
    <div style={{ padding: 10 }}>
      <Grid container>
        <Grid item xs={5}>
          <img src="./Images/abclogo.svg" alt="abc_logo" style={{width:"200px", marginLeft:"10px"}}/>
        </Grid>
        <Grid item xs={6}>
          <img src="./Images/hrclogo.svg" alt="hrc_logo" style={{width:"150px", marginLeft:"40px"}}/>
        </Grid>
      </Grid>
    </div>
  )
}

export default LogoHeader