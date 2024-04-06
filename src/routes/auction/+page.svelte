<script>
	let product = {
	  name: "Plum-Elixir",
	  seller: "Antoine Lie",
	  highestBid: "$100",
	  description: "Plum Elixir capture l'essence luxueuse et envoûtante des prunes mûres cueillies à leur apogée. Cette fragrance enivrante dévoile des notes fruitées riches et sucrées de prune juteuse, harmonisées avec des nuances florales délicates et des accords boisés chauds. L'élixir de prune incarne l'élégance sophistiquée, évoquant une atmosphère de mystère et de séduction. Portez Plum Elixir pour révéler votre côté séduisant et laissez-vous envelopper par son sillage enivrant qui laisse une empreinte inoubliable partout où vous allez.",
	  imageUrl: "/photos/bottle-400.webp"
	};
	let showModal = false;
  
	// Function to handle making an offer
	function makeOffer() {
	  // Add your logic here
	}
	
    function toggleModal() {
	  console.log("Offer made!");
      showModal = !showModal;
    }// Variable pour stocker le montant en USD
  	let connectedWallet = ''; // Variable pour stocker l'adresse du portefeuille connecté

  	function connectWallet() {
    	// Ajoutez ici la logique pour connecter le portefeuille
    	connectedWallet = 'Wallet Address'; // Exemple d'adresse de portefeuille connecté
  	}

  	function confirmPayment() {
    	// Ajoutez ici la logique pour confirmer le paiement en XRP
    	console.log('Payment confirmed!');
  	}
	import { onMount } from 'svelte';

	let amountInXRP = 0;
	let amountInUSD = 0;
	let xrpToUsdRate = 0;

	// Function to convert XRP to USD
	async function convertXRPtoUSD() {
		if (xrpToUsdRate === 0) {
			try {
				const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=ripple&vs_currencies=usd`);
				const data = await response.json();
				xrpToUsdRate = data.ripple.usd;
				amountInUSD = amountInXRP * xrpToUsdRate;
			} catch (error) {
				console.error('Error fetching conversion rate:', error);
			}
		}
		else {
			amountInUSD = amountInXRP * xrpToUsdRate;
		}
	}

	// Call convertXRPtoUSD on initial mount and whenever amountInXRP changes
	onMount(convertXRPtoUSD);
	$: convertXRPtoUSD();
</script>

<div class="auction-page">
	<!-- Product Image Section -->
	<div class="product-image">
	  <img src={product.imageUrl} alt="Product Image"/>
	</div>
  
	<!-- Product Details Section -->
	<div class="product-details">
		<h2>{product.name}</h2>
		<p class="seller">by {product.seller}</p>
		<h4>Description: </h4>
		<p></p>
		<p class="description">{product.description}</p>
		<h3> Highest Bid : <b class="price">{product.highestBid}</b></h3>
		<button on:click={toggleModal} class="offer-button">Make an offer</button>`
	</div>
</div>
{#if showModal}
<div class="modal">
	<div class="modal-content">
		<div class="title">
			<span class="close" on:click={toggleModal}>&times;</span>
			<h2>Make an Offer</h2>
		</div>
	  <button class="connect-button" on:click={connectWallet}>Connect Wallet</button>
	  <div style="width: 80%;">
		  <p style="font-size: 18px;">Offer amount</p>
		  <input class="input" type="number" bind:value={amountInXRP} on:input={convertXRPtoUSD} placeholder="Enter amount in XRP">
		  <div class="total"><p>Total : </p><p>{amountInXRP === null ? '-' : amountInXRP} XRP <b class="usd">${amountInUSD.toFixed(2)}</b></p></div>
	  </div>
	  <p class="description">We will use your digital wallet to submit your offer. You will be asked to confirm your offer amount with your digital wallet.</p>
	  <button class="bid-button" on:click={confirmPayment} disabled>Confirm Payment</button>
	</div>
  </div>
{/if}

<style>
  .modal {
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4);
  }

  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
	font-size: 30px;
    border: 1px solid #888;
    width: 40vw;
	height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
	justify-content: space-evenly; /* Centrer horizontalement */
  }

  .bid-button {
	background-color: #030304;
	color: #fff;
	margin: 20px;
	padding: 10px;
	font-size: 20px;
	width: 80%;
  }

  .connect-button {
	background-color: #030304;
	color: #fff;
	font-size: 20px;
	margin: 20px;
	padding: 10px;
	width: 80%;
  }

  .title {
	border-bottom: #030304 1px solid;
	width: 100%;
	padding: 2vh;
	align-items: center;
    display: flex;
    flex-direction: column;
  }

  .usd {
	color: #888;
  }

  .total {
	display: flex;
	justify-content: space-between;
  }

  .modal-content .description {
	font-size: 14px; /* Smaller font size for description */
	font-weight: normal; /* Remove boldness */
	font-family: Arial, sans-serif;
	text-transform: none;
	width: 80%;  /* Change font family */
  }

  .input {
	width: 100%;
	font-size: 20px;
	margin-bottom: 2vh;
	margin-top: 2vh;
  }

  .close {
    color: #aaa;
    align-self: flex-end; /* Aligner à droite */
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  .auction-page {
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  height: 100vh;
  }
  
  .product-image {
	  flex: 1;
	  max-width: 70%;
	  padding: 20px;
	  height: 50vh;
	  display: flex;
      flex-direction: column;
      align-items: center;
  }
  
  .product-details {
	  flex: 1;
	  max-width: 30%;
	  padding: 20px;
	  display: flex;
      flex-direction: column;
      justify-content: space-evenly;
	  border-left: black 1px solid;
  }
  
  .offer-button {
	font-size: 20px;
    padding: 10px;
    background-color: #030304;
	margin: 10px;
    color: #fff;
    border: none;
    cursor: pointer;
  }

  .product-details p {
    margin-bottom: 2vw; /* Remove default margin for paragraphs */
    font-size: 16px; /* Default font size */
  }

  .price {
	font-size: 30px;
  }

  .product-details h2 {
	font-size: 30px;
  }

  .product-details h3 h4 {
    font-size: 24px; /* Larger font size for product name */
  }

  .product-details .seller {
    font-size: 14px; /* Smaller font size for seller */
  }

  .product-details .description {
  font-size: 14px; /* Smaller font size for description */
  font-weight: normal; /* Remove boldness */
  font-family: Arial, sans-serif;
  text-transform: none;  /* Change font family */
}

</style>
  
  