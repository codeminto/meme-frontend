import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Container, Header } from "./Contact.styled";
import "./ImageListPage.css";
import API_URLS from "../../config.js";
import { useTableland } from "../../contexts/Tableland";
import GradientBorderCard from "../../Components/GradientBorderCard .jsx";
import { useLoader } from "../../contexts/LoaderContext.jsx";
import NoDataFound from "../../Components/NoDataFound.jsx";
import { usePrivy, useWallets } from "@privy-io/react-auth";


function MyMemesList ()
{
		const { ready, authenticated, user, logout } = usePrivy();

	const [memes, setMemes] = useState([]);
	const [loading, setLoading] = useState(true);
	const { readTable } = useTableland();
	const { setLoader } = useLoader()
	const { wallets } = useWallets();
	const wallet = wallets[0];
	const userAddress = user ? user.wallet?.address : null;

	const fadeTop = {
		hidden: { opacity: 0, y: -30 },
		visible: { opacity: 1, y: 0 },
	};


	useEffect(() => {
		const fetchMemes = async () => {
			try {
				
				const response1 = await axios.get(
					`${
						import.meta.env.VITE_BACKEND_URL
					}/contest-submission?userId=${userAddress}`,
				);

				// const result = await readTable();
				// console.log("res", result);
				setMemes( response1.data );
				console.log("memes =====>>>>", response1);
				// setLoading(false);
				// const data = await readTable()
				// console.log({ data })
				// setMemes([...data])

			} catch (error) {
				console.error("Error fetching memes:", error);
				setLoading(false);
			} finally {
				setLoader({ loading: false, type: 'default' })
			}
		};

		if (ready && !authenticated) {
			window.location.href = "/login";
		} else {
			fetchMemes();
		}
	}, [ready, authenticated]);

	const boxStyle = {
		width: "70%",
		margin: "0 auto",
		borderRadius: "10px",
		boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
		padding: "20px",
		backgroundColor: "#ffffff",
	};

	
	return (
		<Container>
			<Header>
				<motion.div
					className="header-content"
					variants={fadeTop}
					initial="hidden"
					animate="visible"
					transition={{ duration: 0.6 }}
				>
					<h1 className="" style={{ marginTop: "1rem" }}>
						Meme List
					</h1>
				</motion.div>
			</Header>
			{!!!memes?.length && <NoDataFound />}
			{!!memes?.length && (
				<div style={boxStyle} className="rounded-box">
					{memes.map((meme) => (
						<GradientBorderCard>
							<Link to={`/meme/${meme.f_id}`} key={meme.f_id}>
								<div style={{ textAlign: "center" }}>
									<img
										style={{
											textAlign: "center",
											borderRadius: "5px",
											objectFit: "cover",
										}}
										width={"100%"}
										height={"250px"}
										src={meme.imageUrlOrHash}
										alt="my-meme"
									/>
								</div>
							</Link>

							<div style={{ textAlign: "center" }}>
								<h3>
									{" "}
									<b> {meme.title}</b>
								</h3>

								<div
									style={{
										display: "flex",
										marginTop: "10px",
										fontSize: "12px",
										justifyContent: "space-around",
									}}
								>
									<a style={{}} className="btn btn-primary highlight">
										<b>
											{" "}
											Cast <i className="fas fa-share"></i>
										</b>
									</a>
									<a
										style={{ marginLeft: "10px" }}
										className="btn btn-primary highlight"
									>
										<b>
											Upvote <i className="fas fa-arrow-up"></i>{" "}
										</b>
									</a>
								</div>
							</div>
						</GradientBorderCard>

						// <div style={{display:"flex",flexDirection:"column"}}>
						// 	<Link
						// 		to={`/meme/${meme.f_id}`}
						// 		key={meme.f_id}

						// 	>
						// 		<div className="image-box">
						// 			<img src={meme.uri} alt={meme.title} />
						// 		</div>
						// 		<div className="image-details">
						// 			<h3>{meme.title}</h3>
						// 			<p>{meme.description}</p>
						// 		</div>
						// 	</Link>
						// 	<button className="btn btn-primary highlight share-button">
						// 		Cast <i className="fas fa-share"></i>
						// 	</button>

						// 	<button className="btn btn-primary highlight share-button">
						// 		Upvote <i className="fas fa-arrow-up"></i>
						// 	</button>
						// </ div>
					))}
				</div>
			)}
		</Container>
	);
}

export default MyMemesList;
