import React from 'react'
import { Container } from '../ContestSingle/Contact.styled'
import GradientBorderCard from '../../Components/GradientBorderCard ';



const boxStyle = {
	width: "60%",
	borderRadius: "10px",
	boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
	paddingBottom: "20px",
	backgroundColor: "#ffffff",
	// marginTop: "3rem",
	minHeight: "100vh",
	margin: "0 auto",
	// display : "flex",
	// flexDirection: "column",

};


export default function MyProfile() {
	return (
		<Container>
			<div style={boxStyle} >
				<div style={{ marginBottom: "25px" }}>
					<img src="/images/profilebackground.jpg" alt='profile' style={{ height: "200px", width:"100%", }} >
					</img>
					<div style={{display:"flex", justifyContent:"space-between"}}>
                    <div style={{display:"flex"}}>
                    <img src='/images/userprofile.png' style={{ width: "110px", height: "120px", marginTop: "-3rem", marginLeft: "2rem", display: "inline-block" }}></img>
					<h1 style={{ display: "inline-block", marginLeft: "1rem"}}>User Name</h1>
                    </div>
                    <i className="fa fa-edit" style={{marginRight:"2rem",marginTop:"0.5rem"}}></i>
                    </div>
				</div>
				
			</div>
		</Container>
	)
}