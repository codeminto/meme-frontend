import React from 'react'
import notfound from "../assets/images/notfound/no-data.jpg";

export default function NoDataFound() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <img src={notfound} style={{ width: '75%', height: "75vh", borderRadius: '14px' }} />
            <h1 style={{ margin: '2rem' }}>No Data Found</h1>
        </div>
    )
}
