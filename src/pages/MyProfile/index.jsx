import React from 'react'
import { Container } from '../ContestSingle/Contact.styled'
import GradientBorderCard from '../../Components/GradientBorderCard ';
import NoDataFound from "../../Components/NoDataFound.jsx";
import MyContest from '../MyContest/index.jsx';
import MyContestList from '../MyContestList/index.jsx';
import SubmitedContest from '../SubmitedContest/index.jsx';
import MyMemesList from '../MyMemesList/index.jsx';
import { useState } from 'react';



const boxStyle = {
	width: "70%",
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
 
const content = {
    display:" none"
}

const showContent = {
    display: "block"
}


export default function MyProfile() {

	const [toggle, setToggle] = useState(1);

    function updateToggle(id) {
        setToggle(id)   
    }

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

				<div>
					<ul style={{display:"flex" ,gap:"2rem" , marginLeft:"2rem", fontWeight:"bold",cursor:"pointer"}}>
						<li onClick={()=>updateToggle(1)}>My Contest</li>
						<li	onClick={()=>updateToggle(2)}>Submited Contest</li>
						<li	onClick={()=>updateToggle(3)}>My Memes</li>
					</ul>
					<hr style={{color: "gray", margin:"5px 20px 0 20px" }}></hr>
				</div>
				<div style={toggle === 1 ? showContent: content}>
					<MyContest></MyContest>
				</div>
				<div style={toggle === 2 ? showContent: content}>
					<SubmitedContest></SubmitedContest>
				</div>
				<div style={toggle === 3 ? showContent: content}> 
					<MyMemesList></MyMemesList>
				</div>
				
			</div>
		</Container>
	)
}