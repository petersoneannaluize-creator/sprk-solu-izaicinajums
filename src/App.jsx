import React from "react";

export default function App() {
  return (
    <main style={{fontFamily:"Arial, sans-serif", padding:"40px", background:"#f4f7fb", minHeight:"100vh"}}>
      <h1 style={{color:"#123B63"}}>Regulatora soļu izaicinājums</h1>
      <p>25 gadi · 25 miljoni soļu</p>

      <div style={{
        background:"white",
        border:"1px solid #d8e2ee",
        padding:"24px",
        marginTop:"24px"
      }}>
        <h2 style={{color:"#123B63"}}>Šobrīd esam nogājuši 7 842 160 soļu 👣</h2>

        <div style={{
          height:"20px",
          background:"#dbe4ef",
          marginTop:"16px",
          overflow:"hidden"
        }}>
          <div style={{
            width:"31%",
            background:"#123B63",
            height:"100%"
          }} />
        </div>

        <p style={{marginTop:"12px"}}>
          Progress tiek atjaunots pirmdienās.
        </p>
      </div>
    </main>
  );
}
