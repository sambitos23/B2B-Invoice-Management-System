import React from 'react'

export default function Footer() {
  return (
    <div style={{display: "flex", justifyContent:"center", width:"100%", marginTop:"18px"}}>
      <div style={{ borderRight: "2px solid #ffffff" }}>
        <a href='https://siligurisutra.com/' style={{marginRight:"8px", color:"#1C5CC4",}}>
          Privacy Policy
        </a>
      </div>
      <span style={{marginLeft: "12px", color:"white"}}>
        © 2022 Highradius.All Rights Reserved.
      </span>
    </div>
  )
}
