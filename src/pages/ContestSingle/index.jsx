import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Container, Header } from "./Contact.styled";
import API_URLS from "../../config.js";
import { useTableland } from "../../contexts/Tableland";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import GradientBorderCard from "../../Components/GradientBorderCard .jsx";
import CampaignAbi from "../../abi/Campaign.json";
import { providers } from "ethers";
import { ethers } from "ethers";
import { usePrivy, useWallets } from "@privy-io/react-auth";

const boxStyle = {
	width: "60%",
	margin: "0 auto",
	borderRadius: "10px",
	boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
	padding: "20px",
	backgroundColor: "#ffffff",
	marginTop:"24px"
	// display : "flex",
	// flexDirection: "column",
	// justifyContent: "center"
};
function Contest() {

	const [contest, setContest] = useState(null);
	const [submissions, setSubmissions] = useState([]);
	const [winners, setWinners] = useState([]);
	const [campaignContractAddress, setCampaignContractAddress] = useState([]);

	const { id } = useParams(); // Get the ID parameter from the URL
	const { ready, authenticated, user, logout } = usePrivy();
	const { wallets } = useWallets();
	const wallet = wallets[0];
	const networkID = wallet ? wallet.chainId?.split(":")[1] : null;
	const userAddress = user ? user.wallet?.address : null;

	const [winnersArray, setWinnersArray] = useState([])
	const [payOut, setPayout] = useState([])
	const fadeTop = {
		hidden: { opacity: 0, y: -30 },
		visible: { opacity: 1, y: 0 },
	};


	useEffect(() => {
		const fetchContest = async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_FRAME_URL}/api/contest/${id}`,
				);
				setContest(response.data);
				setCampaignContractAddress(response.data.campaignAddress);
				console.log(
					"contest campaign address ======>>>>>>>>>",
					response.data.campaignAddress,
				);
			} catch (error) {
				console.error("Error fetching contest:", error);
			}
		};

		fetchContest();
	}, [id]); // Fetch contest data when the ID parameter changes

	useEffect(() => {
		const fetchSubmissions = async () => {
			if (!campaignContractAddress) return; // Avoid fetching if the address is not set yet

			try {
				console.log("from fetch submission", campaignContractAddress);

				const response1 = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL
					}/contest-submission/${campaignContractAddress}`,
				);
				setSubmissions(response1.data);
				console.log("submission data =====>>>>", response1.data);
			} catch (error) {
				console.error("Error fetching submissions:", error);
			}
		};

		const fetchWinners = async () => {
			if (!campaignContractAddress) return; // Avoid fetching if the address is not set yet

			try {
				const response2 = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL
					}/winners-announced/${campaignContractAddress}`,
				);
				console.log("winners fetched: ", response2.data);
				setWinners(response2.data);
			} catch (error) {
				console.error("Error fetching winners:", error);
			}
		};

		if (campaignContractAddress) {
			fetchSubmissions();
			fetchWinners();
		}
	}, [campaignContractAddress]);

	// useEffect(() => {
	// 	const fetchContest = async () => {
	// 		try {
	// 			const response = await axios.get(
	// 				`${import.meta.env.VITE_FRAME_URL}/api/contest/${id}`,
	// 			);
	// 			setContest( response.data );

	// 			setCampaignContractAddress(response.data.campaignAddress);
	// 			console.log(
	// 				"contest campaign address ======>>>>>>>>>",
	// 				response.data.campaignAddress,
	// 			);
	// 		} catch (error) {
	// 			console.error("Error fetching contest:", error);

	// 		}
	// 	};


	// 	const fetchSubmissions = async () => {
	// 			try
	// 			{
	// 				console.log(
	// 					"from fetch submission",
	// 					campaignContractAddress,
	// 				);

	// 				const response1 = await axios.get(
	// 					`${
	// 						import.meta.env.VITE_BACKEND_URL
	// 					}/contest-submission/${campaignContractAddress}`,
	// 				);
	// 				 setSubmissions( response1.data );
	// 				console.log("submission data =====>>>>", response1.data);
	// 			} catch (error) {
	// 				console.error("Error fetching submissions:", error);
	// 			}
	// 	};

	// 	const fetchWinners = async () => {
	// 		try {
	// 			const response2 = await axios.get(
	// 				`${
	// 					import.meta.env.VITE_BACKEND_URL
	// 				}/winners-announced/${campaignContractAddress}`,
	// 			);
	// 			setWinners(response2.data);
	// 			console.log("submission =====>>>>", response2);
	// 		} catch (error) {
	// 			console.error("Error fetching winners:", error);
	// 		}
	// 	};


	// 	fetchContest();
	// 	fetchSubmissions()
	// 	fetchWinners();
	// }, [id]); // Fetch data whenever the ID parameter changes



	if (!contest) {
		return <div>Contest not found</div>;
	}

	const upvoteContractCall = async (submissionId, contractAddress) => {
		const provider = new providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const campaignContractAddress = contractAddress || contest.campaignAddress;
		const campaign = new ethers.Contract(
			campaignContractAddress,
			CampaignAbi,
			signer,
		);
		console.log("signer =>>>>>>>", signer);
		console.log("contest campaign addresss =>>>>>>>", contest.campaignAddress);
		console.log("campaign submissionId =>>>>>>>", submissionId);
		try {
			const result = await campaign.upvoteSubmission(userAddress, submissionId);
			console.log("UpVote Method call result:", result);
			toast.success("You have voted successful..!");

		} catch (error) {
			console.error("Error calling method:", error);
		}
	};

	const claimCall = async () => {
		try {
			const provider = new providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const campaignContractAddress = contest.campaignAddress;

			const campaign = new ethers.Contract(
				campaignContractAddress,
				CampaignAbi,
				signer,
			);
			console.log("signer =>>>>>>>", signer);
			console.log(
				"contest campaign addresss =>>>>>>>",
				contest.campaignAddress,
			);

			const result = await campaign.claim();
			console.log("claim Method call result:", result);
			toast.success("You have claimed successfuly..!");
		} catch (error) {
			console.error("Error calling method:", error);
		}
	};
	const selectWinnersContractCall = async () => {

		const payoutAmount = ethers.utils.parseEther(payOut.toString()).toString();
		const provider = new providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const campaignContractAddress = contest.campaignAddress;
		console.log("campaing address===>>>>>>>", campaignContractAddress)
		const campaign = new ethers.Contract(
			campaignContractAddress,
			CampaignAbi,
			signer,
		);
		try {

			console.log("winner array ===>>>>>>> ", winnersArray);
			console.log("winner payot===>>>>>>> ", [payoutAmount.toString()]);
			const result = await campaign.selectWinners(winnersArray, [
				payoutAmount.toString(),
			])
			console.log("Method call result:", result);
		} catch (error) {
			console.error("Error calling method:", error);
		}
	};

	// const calculateWinnersContractCall = async () => {
	// 	const provider = new providers.Web3Provider(window.ethereum);
	// 	const signer = provider.getSigner();
	// 	const campaignContractAddress =
	// 		submissionsContractAddress || contest.campaignAddress;
	// 	const campaign = new ethers.Contract(
	// 		campaignContractAddress,
	// 		CampaignAbi,
	// 		signer,
	// 	);
	// 	try {
	// 		const result = await campaign.calculateWinners();
	// 		console.log("Method call result:", result);
	// 	} catch (error) {
	// 		console.error("Error calling method:", error);
	// 	}
	// };

	return (
		<Container>
			<Header>
				<motion.div
					className="header-content"
					variants={fadeTop}
					initial="hidden"
					animate="visible"
					transition={{ duration: 0.6 }}
				></motion.div>
			</Header>

			<div style={boxStyle} className="rounded-box" >
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						gap: "4rem",
						margin: "20px",
						justifyContent: "center",
					}}
				>
					<div style={{ width: "400px", display: "flex", flexDirection: "column", justifyContent: "center" }} >

						<img
							style={{
								marginTop: "10px",
								marginBottom: "10px",
								borderRadius: "20px",
								// width: "300px",
								// width:"100%",
								height: "350px"
							}}
							src={contest.imageUrl}
							alt={contest.title}
						/>
						<h2 style={{marginBottom:"10px"}}>{contest.title}</h2>
						<p style={{ textAlign: "justify" }}>
							<b> Description : </b>
							{contest.description}
							In publishing and graphic design, a placeholder text commonly used
							to demonstrate the visual form of a document or a typeface without
							relying on meaningful content. may be used as a placeholder before
							the final copy is available.
						</p>
					</div>
					{/* <hr style={{ color: "yellow" }} /> */}
					<div style={{ width: "400px" }}>
						<div style={{ marginTop: "10px" }}>
							<h2>Schedule</h2>
							<p style={{ marginTop: "10px" }}>
								<b>Started At:</b>{" "}
								{new Date(parseInt(contest.startedAt)).toLocaleString()}
							</p>
							<p>
								<b>Ended At:</b>{" "}
								{new Date(parseInt(contest.endedAt)).toLocaleString()}
							</p>
						</div>
						<div style={{ marginTop: "20px", display: "flex", flexDirection: "column" }}>
							<div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
								<Link to={`/participate/${contest._id}`} key={contest._id}>
									<button className="btn btn-primary">Participate</button>
								</Link>{" "}
								<button className="btn btn-secondary" type="submit">
									<b> Cast Now</b>
								</button>
							</div>
							<h2 style={{ marginTop: "20px" }}>Winners</h2>
							{/* {winners.map((winner) => (
								<p style={{ marginTop: "10px" }}>
									<b>1st : </b> {winner.winningSubmissions}
								</p>
							))}
							 */}
							{Array.isArray(winners) && winners.length > 0 ? (
								winners.map((winner, index) => (
									<p key={index} style={{ marginTop: "10px" }}>
										<b>{index + 1} : </b> {winner.winningSubmissions}
									</p>
								))
							) : (
								<p>No winners announced yet</p>
							)}

							<button
								style={{
									marginTop: "20px",
									marginBottom: "20px",
									width: "100%",
									background: "black",
									color: "white"
								}}
								className="btn btn-light"
								onClick={claimCall}
							>
								Claim Price
							</button>
							<input
								placeholder="type submission id saperate by comma"
								type="text"
								onChange={(e) => setWinnersArray(e.target.value.split(","))}
								style={{
									padding: "10px 10px", border: "1px solid hsla(279, 6%, 55%, 0.5)",
									border: "1px solid #ffcf4b",
									borderRadius: "5px",
									cursor: "pointer",
									width: "100%"
								}}
							/>
							<br />
							<input
								placeholder="type payout saperate by comma"
								type="text"
								onChange={(e) => setPayout(e.target.value.split(","))}
								style={{
									padding: "10px 10px", border: "1px solid hsla(279, 6%, 55%, 0.5)",
									border: "1px solid #ffcf4b",
									borderRadius: "5px",
									cursor: "pointer",
									width: "100%",
									marginBottom: "24px"
								}}
							/>
							<button
								style={{
									marginTop: "20px",
									width: "100%",
									background: "#FFD960",
									color: "black"
								}}
								onClick={selectWinnersContractCall}
								className="btn btn-primary"
							>
								Anounce Winner
							</button>
						</div>
					</div>
				</div>


				<div style={{ margin: "10px" }} className="contest-details"></div>
			</div>
			<div style={boxStyle} className="rounded-box">
				<div>
					<h2 style={{ marginTop: "40px", marginBottom: "20px" }}>
						Participants
					</h2>
					{submissions.map((submission) => (
						<GradientBorderCard>
							<Link
								to={`/contest-submission/${submission.submissionId}`}
								key={submission.submissionId}
							>
								<div style={{ textAlign: "center"}}>
									<img
										style={{ textAlign: "center", borderRadius: "5px" }}
										width={"100%"}
										height={"250px"}
										src={submission.imageUrlOrHash}
										alt="meme"
									/>
								</div>
							</Link>

							<div style={{ textAlign: "center", fontSize: "12px" }}>
								<h3>
									{" "}
									<b> {submission.description}</b>
									<br />
									<b>Submission ID : {submission.submissionId}</b>
								</h3>

								<div
									style={{
										display: "flex",
										flexDirection: "column",
										marginTop: "10px",
										fontSize: "10px",
										justifyContent: "space-around"
									}}
								>
									<a
										style={{ width: "100%", fontSize: "12px"}}
										className="btn btn-primary highlight"
									>
										<b>
											{" "}
											Cast <i className="fas fa-share"></i>
										</b>
									</a>
									<a
										style={{ width: "100%", marginTop: "10px",fontSize: "12px" }}
										className="btn btn-primary highlight"
										onClick={() =>
											upvoteContractCall(
												submission.submissionId,
												submission.contractAddress,
											)
										}
									>
										<b>
											Upvote <i className="fas fa-arrow-up"></i>{" "}
										</b>
									</a>
								</div>
							</div>
						</GradientBorderCard>
					))}
				</div>
			</div>
		</Container>
	);
}

export default Contest;
