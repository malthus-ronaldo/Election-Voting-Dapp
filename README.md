# Small Election Voting DApp

A decentralized application (DApp) built on Ethereum blockchain, allowing transparent voting using a smart contract. The project is Dockerized for easy deployment.

## ✨ Features

- **Smart contract written in Solidity for secure and immutable voting**
- **Backend API using Node.js and Express for interacting with the blockchain**
- **Frontend built with HTML and JavaScript for user interaction**
- **Dockerized for easy setup and deployment**

---

## Prerequisites

- **Nodejs** installed : [Documentation officielle](https://nodejs.org/fr)
- **Docker** installed: [Documentation officielle](https://www.docker.com/)
- Metamask extension for browser interaction.

---

## Setup

### 1. Clone the Repository

```bash
 git clone https://github.com/malthus-ronaldo/Election-Voting-Dapp.git
 cd Election-Voting-Dapp
```

### 2. Install Dependencies

```bash
 npm install
```

---

### 3. Environment Configuration

Create a .env file at the root of the project and add the following:

API_URL=<YOUR_ETHEREUM_RPC_URL>
PRIVATE_KEY=<YOUR_WALLET_PRIVATE_KEY>
CONTRACT_ADDRESS=<DEPLOYED_CONTRACT_ADDRESS>

### 4. Run the Application Locally

```bash
 npm start
```

Access the application at http://localhost:3000.

---

## Using Docker

### 1. Build Docker Image

```bash
 docker build -t malthus/voting-app .
```

### 2. Run Docker Container

```bash
 docker run -p 3000:3000 malthus/voting-app
```

Access the application at http://localhost:3000.

---

## Smart Contract

The Voting.sol contract is located in contracts/. It allows:

- Adding candidates (owner-only).
- Voting for candidates.
- Checking voting status and remaining time.

To compile and deploy the contract:

1.  Install Hardhat:

```bash
 npm install --save-dev hardhat
```

2. Compile the contract:

```bash
 npx hardhat compile
```
