import React from 'react'
import { Container } from '../ContestSingle/Contact.styled'
import GradientBorderCard from '../../Components/GradientBorderCard ';
import "./ProfilePage.css"


import {Tabs, Tab} from "@nextui-org/tabs";





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


export default function Profile() {
	return (
		<Container>
			<div style={boxStyle} >
				<div style={{ marginBottom: "25px" }}>

					<img src="/images/profile.jpg" alt='profile' className='w-full h-50px' style={{ height: "200px" }} >
					</img>
					<img src='/images/userphoto.png' style={{ width: "140px", height: "140px", marginTop: "-3rem", marginLeft: "2rem", display: "inline-block" }}></img>
					<h1 className='text-4xl font-semibold ml-5' style={{ display: "inline-block" }}>User Name</h1>
				</div>
				
			</div>
		</Container>
	)
}
