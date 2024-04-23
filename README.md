## Memester

## Arbitrum
Deploying contracts on Arbitrum involves leveraging its layer 2 scaling solution built on Ethereum, which enables faster and more cost-effective transactions while maintaining compatibility with Ethereum's ecosystem. 

### Smart Contracts : 
#### [CampaignFactory.sol](https://github.com/LearnWeb3-Hackathon/contract-memster/blob/main/contracts/CampaignFactory.sol)
#### [Campaign.sol](https://github.com/LearnWeb3-Hackathon/contract-memster/blob/main/contracts/Campaign.sol)

### Contract Address : [0xDE919C2c586015f93dbDa5c2852E6e84E58fe8D4](https://sepolia.arbiscan.io/address/0xDE919C2c586015f93dbDa5c2852E6e84E58fe8D4)



## Filecoin Integration
#### Store data with Tableland seamlessly integrates with various features of the Memester platform, including meme creation tools, competition platforms, and voting systems. This integration ensures that data flows smoothly between different components of the platform, enabling a cohesive user experience.
### Integration while login  [File](https://github.com/codeminto/memeAgent/blob/main/client/src/pages/Login/index.jsx)

	const CreateTable = async (res) => {

		try
		{
			const chainId = wallet?.chainId?.split(":")[1];
			const userAddress = user.wallet?.address;
			const { data } = await axios.get(
				"${import.meta.env.VITE_BACKEND_URL}/tableland?address=${userAddress}&networkId=${chainId}",
			);
			if ( !data && !data?.length )
			{
        await createTable()
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

 ### Integration while submitting meme and participation [File](https://github.com/codeminto/memeAgent/blob/main/client/src/contexts/Tableland.jsx)

![each meme will stored in taleland](https://github.com/codeminto/memeAgent/assets/16322269/e933598e-5333-463c-8c0d-4d132416de23)



## Farcaster
Users on Memester can create memes and generate frames, which can be shared on Farcaster. During competitions, users can generate frames on Warpcast and submit their votes for memes directly from Farcaster's Warpcast integration. This seamless integration between Memester and Warpcast enhances user engagement and voting accessibility, streamlining the competition process.

![tested frame in frame gear](https://github.com/codeminto/memeAgent/assets/16322269/cd597644-3019-4733-b2d2-b8d3a60306cb)



