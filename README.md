# MegaVote: Decentralized Voting dApp

MegaVote is a fully-responsive decentralized application (dApp) built for community governance. It allows users to create and vote on proposals, with all data and actions recorded on the MEGA Testnet blockchain.

## Core Features

-   **Wallet Connection**: Seamlessly connect to the MEGA Testnet (Chain ID: 6342) via MetaMask. The app ensures you are on the correct network.
-   **Create Proposals**: Users can create new governance proposals with a title and description, which are then submitted as a transaction to the blockchain.
-   **Browse Proposals**: View a live feed of all community proposals, sorted with the newest first. The list updates in real-time as new proposals are created.
-   **On-Chain Voting**: Cast your vote (Upvote/Downvote) on any proposal. Each vote is a transaction recorded on the MEGA Testnet.
-   **Duplicate Vote Prevention**: The smart contract and the UI prevent a user from voting on the same proposal more than once.
-   **Dynamic Detail View**: Click the "Details" button on any proposal to open a pop-up modal with its full description and current vote counts.
-   **Interactive Feedback**: Receive toast notifications for transaction submissions and confirmations. A sound effect plays upon a successful vote.
-   **Block Explorer Integration**: Easily view your transactions (proposal creation, votes) on the [MEGA Testnet Explorer](https://www.megaexplorer.xyz/).
-   **Fully Responsive**: A mobile-first design ensures a great user experience on all devices, from desktop to mobile phones.
-   **Light & Dark Mode**: A theme toggle allows users to switch between light and dark modes.

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (with App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Blockchain Interaction**: [Ethers.js](https://ethers.io/)
-   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Form Management**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) for validation
-   **AI (Core Stack)**: [Genkit](https://firebase.google.com/docs/genkit)
-   **Target Network**: [MEGA Testnet](https://www.megaeth.com/)

## Getting Started

This project is set up to run in a development environment like Firebase Studio.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later)
-   [MetaMask](https://metamask.io/) browser extension.
-   Test ETH on the MEGA Testnet.

### Installation & Running the App

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run the development server**:
    ```bash
    npm run dev
    ```

3.  Open your browser to [http://localhost:9002](http://localhost:9002) to see the application.

## Project Structure

-   `src/app/`: Contains the main pages and layouts for the Next.js application.
    -   `src/app/main/page.tsx`: The main page displaying the list of proposals.
    -   `src/app/create/page.tsx`: The page for creating a new proposal.
-   `src/app/components/`: Contains all the reusable React components.
    -   `ProposalCard.tsx`: The card for displaying a single proposal.
    -   `CreateProposal.tsx`: The form for submitting a new proposal.
    -   `Header.tsx`: The main navigation header.
    -   `providers/`: Contains React Context providers for managing global state (`AppStateProvider`, `Web3Provider`).
-   `src/lib/`: Core logic, constants, and utility functions.
    -   `constants.ts`: Blockchain constants like Chain ID and Contract Address.
    -   `contract.ts`: The ABI for the `MegaVote` smart contract.
    -   `types.ts`: TypeScript type definitions.
    -   `utils.ts`: Helper functions.
-   `src/hooks/`: Custom React hooks, such as `useWeb3`.
-   `public/`: Static assets, including the `sound.mp3` file for vote confirmations.
-   `src/ai/`: Configuration for Genkit.
