import React from 'react';
import { Table } from 'antd';
import './App.css';
// import getData from "./fetch";

var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
function formatAsPercent(num) {
  return new Intl.NumberFormat("default", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
  }).format(parseFloat(num.toString()) / 100);
}

const ethers_1 = require("ethers");
const multicall_json_1 = __importDefault(require("./multicall.json"));
const GOO_CONTRACT_ADDRESS = "0xba3fe78a799f8b6203face16179d98724f9a62c5";
const ART_GOBBLERS_ADDRESS = "0x383049bb3ab2300580f2e51887d18efd8a2a00d3";
const MULTICALL_ADDRESS = "0xcA11bde05977b3631167028862bE2a173976CA11";
const whitelistForMevTesting = [
  ["Pluto", "0xE182E58EAb4e8DC072eAFea18031f8f608676B25"],
  ["0xMisaka", "0x3D31fa5C9Df0B0F800555FAB474595cE38Ad624e"],
  ["Imagine & CuriousRabbit", "0xb074b8bB11e07636DBd8d4A45b4369826886144f"],
  ["QTpie", "0xACED7eDDfC38F33d33a6DcC5D2AB83ebD8d6fb7B"],
  ["Alcibiades", "0x0Cc56E024E9FDa80F939aB3b434d0DD76765d175"],
  ["Ghilli", "0xFd495eeEd737b002Ea62Cf0534e7707a9656ba19"],
  ["Asnared", "0x203c120c4a37d9BC313B7E0CfCCf1A263c6522DD"],
  ["Snarks Team", "0xc6E058a257eD5EFD6F14DB90dF58754d6963d542"],
  ["0xSlime aka Ben Leimberger", "0xff1906B7510fc994ddB9f76Ef1F56DC9EF9AB95D"],
  ["Fireball", "0x6ba484ff27e481C4393D47De661cC5BE2537Ca56"],
  ["Jepsen", "0xc7FE1135Ba71e03a7a6b9E1dDB8f653f143bdCF9"],
  ["Otto Suwen", "0xCcfB66D52076A8295592642068c45D06FA6e36f6"],
  ["Brock", "0x493D4b9Af9CD7fAEa2c8aA3815753cd03177827b"],
  ["Will Price", "0x7fE092642F2Ad568bBd3d9795aD9d3AF474dd6f7"],
  ["John J", "0x1D18077167c1177253555e45B4b5448B11E30b4b"],
];

// const dataSource = [
//   {
//     key: '1',
//     rank: '1',
//     percentage: '0.00%',
//     name: 'a',
//     address: '0x',
//     balance:'0',
//     multiple:'1x'
//   },
//   {
//     key: '2',
//     rank: '2',
//     percentage: '0.00%',
//     name: 'b',
//     address: '0x',
//     balance:'0',
//     multiple:'1x'
//   },
// ];

const columnsA = [
  {
    title: 'Rank',
    dataIndex: 'rank',
    key: 'rank',
  },
  {
    title: 'Percentage',
    dataIndex: 'percentage',
    key: 'percentage',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Balance',
    dataIndex: 'balance',
    key: 'balance',
  }
];
const columnsB = [
  {
    title: 'Rank',
    dataIndex: 'rank',
    key: 'rank',
  },
  {
    title: 'Percentage',
    dataIndex: 'percentage',
    key: 'percentage',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Balance',
    dataIndex: 'balance',
    key: 'balance',
  },
  {
    title: 'Multiple',
    dataIndex: 'multiple',
    key: 'multiple',
  }
];
const gooABI = [ { "inputs": [ { "internalType": "address", "name": "_artGobblers", "type": "address" }, { "internalType": "address", "name": "_pages", "type": "address" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "Unauthorized", "type": "error" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "DOMAIN_SEPARATOR", "outputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" } ], "name": "allowance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "approve", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "artGobblers", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "burnForGobblers", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "burnForPages", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [ { "internalType": "uint8", "name": "", "type": "uint8" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "mintForGobblers", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "nonces", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "pages", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" } ], "name": "permit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transfer", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" } ]
const gobABI = [ { "inputs": [ { "internalType": "bytes32", "name": "_merkleRoot", "type": "bytes32" }, { "internalType": "uint256", "name": "_mintStart", "type": "uint256" }, { "internalType": "contract Goo", "name": "_goo", "type": "address" }, { "internalType": "address", "name": "_team", "type": "address" }, { "internalType": "address", "name": "_community", "type": "address" }, { "internalType": "address", "name": "_vrfCoordinator", "type": "address" }, { "internalType": "address", "name": "_linkToken", "type": "address" }, { "internalType": "bytes32", "name": "_chainlinkKeyHash", "type": "bytes32" }, { "internalType": "uint256", "name": "_chainlinkFee", "type": "uint256" }, { "internalType": "string", "name": "_baseUri", "type": "string" }, { "internalType": "string", "name": "_unrevealedUri", "type": "string" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "AlreadyClaimed", "type": "error" }, { "inputs": [ { "internalType": "uint256", "name": "gobblerId", "type": "uint256" } ], "name": "CannotBurnLegendary", "type": "error" }, { "inputs": [ { "internalType": "uint256", "name": "cost", "type": "uint256" } ], "name": "IncorrectGobblerAmount", "type": "error" }, { "inputs": [], "name": "InvalidProof", "type": "error" }, { "inputs": [], "name": "MintStartPending", "type": "error" }, { "inputs": [], "name": "NoRemainingLegendaryGobblers", "type": "error" }, { "inputs": [ { "internalType": "uint256", "name": "totalRemainingToBeRevealed", "type": "uint256" } ], "name": "NotEnoughRemainingToBeRevealed", "type": "error" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" } ], "name": "OwnerMismatch", "type": "error" }, { "inputs": [ { "internalType": "uint256", "name": "currentPrice", "type": "uint256" } ], "name": "PriceExceededMax", "type": "error" }, { "inputs": [], "name": "RequestTooEarly", "type": "error" }, { "inputs": [], "name": "ReserveImbalance", "type": "error" }, { "inputs": [], "name": "RevealsPending", "type": "error" }, { "inputs": [], "name": "SeedPending", "type": "error" }, { "inputs": [], "name": "ZeroToBeRevealed", "type": "error" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" } ], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "gobblerId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "nft", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" } ], "name": "ArtFedToGobbler", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "gobblerId", "type": "uint256" } ], "name": "GobblerClaimed", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "gobblerId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "price", "type": "uint256" } ], "name": "GobblerPurchased", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "numGobblers", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "lastRevealedId", "type": "uint256" } ], "name": "GobblersRevealed", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "gooAdded", "type": "uint256" } ], "name": "GooAdded", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "gooAdded", "type": "uint256" } ], "name": "GooRemoved", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "gobblerId", "type": "uint256" }, { "indexed": false, "internalType": "uint256[]", "name": "burnedGobblerIds", "type": "uint256[]" } ], "name": "LegendaryGobblerMinted", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnerUpdated", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "randomness", "type": "uint256" } ], "name": "RandomnessFulfilled", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "toBeRevealed", "type": "uint256" } ], "name": "RandomnessRequested", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "lastMintedGobblerId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "numGobblersEach", "type": "uint256" } ], "name": "ReservedGobblersMinted", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }, { "indexed": false, "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" } ], "name": "TransferBatch", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "TransferSingle", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "string", "name": "value", "type": "string" }, { "indexed": true, "internalType": "uint256", "name": "id", "type": "uint256" } ], "name": "URI", "type": "event" }, { "inputs": [], "name": "BASE_URI", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "FIRST_LEGENDARY_GOBBLER_ID", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "LEGENDARY_AUCTION_INTERVAL", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "LEGENDARY_SUPPLY", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAX_MINTABLE", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAX_SUPPLY", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MINTLIST_SUPPLY", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "RESERVED_SUPPLY", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "UNREVEALED_URI", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "gooAmount", "type": "uint256" } ], "name": "addGoo", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "bal", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address[]", "name": "owners", "type": "address[]" }, { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" } ], "name": "balanceOfBatch", "outputs": [ { "internalType": "uint256[]", "name": "balances", "type": "uint256[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bytes32[]", "name": "proof", "type": "bytes32[]" } ], "name": "claimGobbler", "outputs": [ { "internalType": "uint256", "name": "gobblerId", "type": "uint256" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "community", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "currentNonLegendaryId", "outputs": [ { "internalType": "uint128", "name": "", "type": "uint128" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "gobblerId", "type": "uint256" }, { "internalType": "address", "name": "nft", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "bool", "name": "isERC1155", "type": "bool" } ], "name": "feedArt", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "getCopiesOfArtFedToGobbler", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "getEmissionDataForUser", "outputs": [ { "internalType": "uint64", "name": "emissionMultiple", "type": "uint64" }, { "internalType": "uint128", "name": "lastBalance", "type": "uint128" }, { "internalType": "uint64", "name": "lastTimestamp", "type": "uint64" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "getGobblerData", "outputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint48", "name": "idx", "type": "uint48" }, { "internalType": "uint48", "name": "emissionMultiple", "type": "uint48" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "gobblerId", "type": "uint256" } ], "name": "getGobblerEmissionMultiple", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "timeSinceStart", "type": "uint256" }, { "internalType": "uint256", "name": "sold", "type": "uint256" } ], "name": "getPrice", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "user", "type": "address" } ], "name": "getUserEmissionMultiple", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "gobblerPrice", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "gobblerRevealsData", "outputs": [ { "internalType": "uint64", "name": "randomSeed", "type": "uint64" }, { "internalType": "uint64", "name": "nextRevealTimestamp", "type": "uint64" }, { "internalType": "uint56", "name": "lastRevealedId", "type": "uint56" }, { "internalType": "uint56", "name": "toBeRevealed", "type": "uint56" }, { "internalType": "bool", "name": "waitingForSeed", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "goo", "outputs": [ { "internalType": "contract Goo", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "user", "type": "address" } ], "name": "gooBalance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "hasClaimedMintlistGobbler", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "initialPrice", "outputs": [ { "internalType": "int256", "name": "", "type": "int256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" } ], "name": "isApprovedForAll", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "legendaryGobblerAuctionData", "outputs": [ { "internalType": "uint128", "name": "startPrice", "type": "uint128" }, { "internalType": "uint128", "name": "numSold", "type": "uint128" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "legendaryGobblerPrice", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "merkleRoot", "outputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "maxPrice", "type": "uint256" } ], "name": "mintFromGoo", "outputs": [ { "internalType": "uint256", "name": "gobblerId", "type": "uint256" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256[]", "name": "gobblerIds", "type": "uint256[]" } ], "name": "mintLegendaryGobbler", "outputs": [ { "internalType": "uint256", "name": "gobblerId", "type": "uint256" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "numGobblersEach", "type": "uint256" } ], "name": "mintReservedGobblers", "outputs": [ { "internalType": "uint256", "name": "lastMintedGobblerId", "type": "uint256" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "mintStart", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "numMintedForReserves", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "numMintedFromGoo", "outputs": [ { "internalType": "uint128", "name": "", "type": "uint128" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256[]", "name": "", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "", "type": "uint256[]" }, { "internalType": "bytes", "name": "", "type": "bytes" } ], "name": "onERC1155BatchReceived", "outputs": [ { "internalType": "bytes4", "name": "", "type": "bytes4" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "bytes", "name": "", "type": "bytes" } ], "name": "onERC1155Received", "outputs": [ { "internalType": "bytes4", "name": "", "type": "bytes4" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "id", "type": "uint256" } ], "name": "ownerOf", "outputs": [ { "internalType": "address", "name": "owner", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "requestId", "type": "bytes32" }, { "internalType": "uint256", "name": "randomness", "type": "uint256" } ], "name": "rawFulfillRandomness", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "gooAmount", "type": "uint256" } ], "name": "removeGoo", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "requestRandomSeed", "outputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "numGobblers", "type": "uint256" } ], "name": "revealGobblers", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }, { "internalType": "bytes", "name": "data", "type": "bytes" } ], "name": "safeBatchTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" } ], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" } ], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "setOwner", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "team", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "gobblerId", "type": "uint256" } ], "name": "uri", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" } ]

const mulABI = [ { "inputs": [ { "components": [ { "internalType": "address", "name": "target", "type": "address" }, { "internalType": "bytes", "name": "callData", "type": "bytes" } ], "internalType": "struct Multicall3.Call[]", "name": "calls", "type": "tuple[]" } ], "name": "aggregate", "outputs": [ { "internalType": "uint256", "name": "blockNumber", "type": "uint256" }, { "internalType": "bytes[]", "name": "returnData", "type": "bytes[]" } ], "stateMutability": "payable", "type": "function" }, { "inputs": [ { "components": [ { "internalType": "address", "name": "target", "type": "address" }, { "internalType": "bool", "name": "allowFailure", "type": "bool" }, { "internalType": "bytes", "name": "callData", "type": "bytes" } ], "internalType": "struct Multicall3.Call3[]", "name": "calls", "type": "tuple[]" } ], "name": "aggregate3", "outputs": [ { "components": [ { "internalType": "bool", "name": "success", "type": "bool" }, { "internalType": "bytes", "name": "returnData", "type": "bytes" } ], "internalType": "struct Multicall3.Result[]", "name": "returnData", "type": "tuple[]" } ], "stateMutability": "payable", "type": "function" }, { "inputs": [ { "components": [ { "internalType": "address", "name": "target", "type": "address" }, { "internalType": "bool", "name": "allowFailure", "type": "bool" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "bytes", "name": "callData", "type": "bytes" } ], "internalType": "struct Multicall3.Call3Value[]", "name": "calls", "type": "tuple[]" } ], "name": "aggregate3Value", "outputs": [ { "components": [ { "internalType": "bool", "name": "success", "type": "bool" }, { "internalType": "bytes", "name": "returnData", "type": "bytes" } ], "internalType": "struct Multicall3.Result[]", "name": "returnData", "type": "tuple[]" } ], "stateMutability": "payable", "type": "function" }, { "inputs": [ { "components": [ { "internalType": "address", "name": "target", "type": "address" }, { "internalType": "bytes", "name": "callData", "type": "bytes" } ], "internalType": "struct Multicall3.Call[]", "name": "calls", "type": "tuple[]" } ], "name": "blockAndAggregate", "outputs": [ { "internalType": "uint256", "name": "blockNumber", "type": "uint256" }, { "internalType": "bytes32", "name": "blockHash", "type": "bytes32" }, { "components": [ { "internalType": "bool", "name": "success", "type": "bool" }, { "internalType": "bytes", "name": "returnData", "type": "bytes" } ], "internalType": "struct Multicall3.Result[]", "name": "returnData", "type": "tuple[]" } ], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "getBasefee", "outputs": [ { "internalType": "uint256", "name": "basefee", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "blockNumber", "type": "uint256" } ], "name": "getBlockHash", "outputs": [ { "internalType": "bytes32", "name": "blockHash", "type": "bytes32" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getBlockNumber", "outputs": [ { "internalType": "uint256", "name": "blockNumber", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getChainId", "outputs": [ { "internalType": "uint256", "name": "chainid", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getCurrentBlockCoinbase", "outputs": [ { "internalType": "address", "name": "coinbase", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getCurrentBlockDifficulty", "outputs": [ { "internalType": "uint256", "name": "difficulty", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getCurrentBlockGasLimit", "outputs": [ { "internalType": "uint256", "name": "gaslimit", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getCurrentBlockTimestamp", "outputs": [ { "internalType": "uint256", "name": "timestamp", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "addr", "type": "address" } ], "name": "getEthBalance", "outputs": [ { "internalType": "uint256", "name": "balance", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getLastBlockHash", "outputs": [ { "internalType": "bytes32", "name": "blockHash", "type": "bytes32" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bool", "name": "requireSuccess", "type": "bool" }, { "components": [ { "internalType": "address", "name": "target", "type": "address" }, { "internalType": "bytes", "name": "callData", "type": "bytes" } ], "internalType": "struct Multicall3.Call[]", "name": "calls", "type": "tuple[]" } ], "name": "tryAggregate", "outputs": [ { "components": [ { "internalType": "bool", "name": "success", "type": "bool" }, { "internalType": "bytes", "name": "returnData", "type": "bytes" } ], "internalType": "struct Multicall3.Result[]", "name": "returnData", "type": "tuple[]" } ], "stateMutability": "payable", "type": "function" }, { "inputs": [ { "internalType": "bool", "name": "requireSuccess", "type": "bool" }, { "components": [ { "internalType": "address", "name": "target", "type": "address" }, { "internalType": "bytes", "name": "callData", "type": "bytes" } ], "internalType": "struct Multicall3.Call[]", "name": "calls", "type": "tuple[]" } ], "name": "tryBlockAndAggregate", "outputs": [ { "internalType": "uint256", "name": "blockNumber", "type": "uint256" }, { "internalType": "bytes32", "name": "blockHash", "type": "bytes32" }, { "components": [ { "internalType": "bool", "name": "success", "type": "bool" }, { "internalType": "bytes", "name": "returnData", "type": "bytes" } ], "internalType": "struct Multicall3.Result[]", "name": "returnData", "type": "tuple[]" } ], "stateMutability": "payable", "type": "function" } ]
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {goo: [], gob:[] };
  }
  async componentDidMount() {
    console.log("starting");

    const provider = new ethers_1.ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/76fcf0c16a9f434d975f1b3b88a1c667");
    const artGobblerContract = new ethers_1.ethers.Contract(ART_GOBBLERS_ADDRESS, gobABI, provider);
    const gooContract = new ethers_1.ethers.Contract(GOO_CONTRACT_ADDRESS, gooABI, provider);
    const multicallContract = new ethers_1.ethers.Contract(MULTICALL_ADDRESS, mulABI, provider);
    const artGobblerInterface = artGobblerContract.interface;
    const gooInterface = gooContract.interface;
    const gooDecimal = 18;
    const everyoneGooBalance = [];
    const everyoneGobblerBalance = [];
    const multicallCallData = whitelistForMevTesting
        .map(([name, address]) => {
        return [
            {
                target: ART_GOBBLERS_ADDRESS,
                allowFailure: false,
                callData: artGobblerInterface.encodeFunctionData("gooBalance", [
                    address,
                ]),
            },
            {
                target: gooContract.address,
                allowFailure: false,
                callData: gooInterface.encodeFunctionData("balanceOf", [address]),
            },
            {
                target: artGobblerContract.address,
                allowFailure: false,
                callData: artGobblerInterface.encodeFunctionData("getUserEmissionMultiple", [address]),
            },
        ];
    })
        .flat();
    let totalGoo = await gooContract.totalSupply();
    // console.log(ethers_1.utils.formatEther(totalGoo))
    try {
        console.log("Starting multicall")
        const callRes = await multicallContract.callStatic.aggregate3(multicallCallData, {
            gasLimit: 1000000000,
        });
        await Promise.all(whitelistForMevTesting.map(async ([name, address], i) => {
            const addressesInner = [];
            const idsInner = [];
            for (let i = 0; i < 10000; i++) {
                addressesInner.push(address);
                idsInner.push(i);
            }
            const index = i * 3;
            const gooBalanceStake = ethers_1.ethers.BigNumber.from(callRes[index].returnData);
            const gooBalanceUnstake = ethers_1.ethers.BigNumber.from(callRes[index + 1].returnData);
            const multiple = ethers_1.ethers.BigNumber.from(callRes[index + 2].returnData);
            totalGoo = totalGoo.add(gooBalanceStake);
            const hasNft = (await artGobblerContract.balanceOfBatch(addressesInner, idsInner)).filter((x) => x.toNumber() == 1).length;
            everyoneGobblerBalance.push([
                name,
                address,
                hasNft,
                "multiple " + multiple.toString(),
            ]);
            everyoneGooBalance.push([
                name,
                address,
                parseFloat(ethers_1.ethers.utils.formatUnits(gooBalanceStake.add(gooBalanceUnstake), gooDecimal)),
            ]);
            console.log('got balance')
        }));
        console.log("Ending multicall")
    }
    catch (error) {
        console.log("MULTICALL FAILED", error);
        throw error;
    }
    everyoneGooBalance.sort((a, b) => b[2] - a[2]);
    everyoneGobblerBalance.sort((a, b) => b[2] - a[2]);
    const price = await artGobblerContract.gobblerPrice();
    const initialPrice = await artGobblerContract.initialPrice();
    const gobblerMinted = (await artGobblerContract.numMintedFromGoo()).sub(ethers_1.ethers.BigNumber.from(68));
    console.log("Gobbler Price", ethers_1.ethers.utils.formatUnits(price, gooDecimal));
    console.log("Initial Price", ethers_1.ethers.utils.formatUnits(initialPrice, gooDecimal));
    console.log("gobblerMinted", gobblerMinted.toString());
    console.log();
    console.log("Goo Balance");
    const gooData = []

    for(var i=0;i<everyoneGooBalance.length;i++){
      console.log(i)
      var name, address, balance;
        [name, address, balance] = everyoneGooBalance[i];
        console.log(name)
        const percent = ethers_1.ethers.utils
            .parseEther(balance + "")
            .mul(ethers_1.ethers.BigNumber.from(10000))
            .div(totalGoo)
            .toNumber();
        console.log(percent)

        const final = {
            key:i+1,
            rank:`#${i+1}`,
            percentage: formatAsPercent(percent / 100),
            name,
            address,
            balance: numberWithCommas(balance),
        };
        gooData.push(final);
    }


    
    this.setState({goo: gooData})
    console.log("Setting state!!", gooData)

    // key: '1',
    // rank: '1',
    // percentage: '0.00%',
    // name: 'a',
    // address: '0x',
    // balance:'0'
    console.log();
    console.log("Gobbler Balance");
    const gobData = []


    for(var i=0;i<everyoneGobblerBalance.length;i++){
      var name, address, balance, multiple;
      [name, address, balance, multiple] = everyoneGobblerBalance[i];
      const minted = balance - 100;
      const percent = (minted * 100) / gobblerMinted.toNumber();
      const final = {
          key: i+1,
          rank:`#${i+1}`,
          percentage: formatAsPercent(percent),
          name,
          address,
          balance: numberWithCommas(balance),
          multiple,
      };
      gobData.push(final);
    }
    this.setState({gob: gobData})
    console.log("Setting state!!", gobData)

    // const r = (await getData(this))
    // this.setState({goo: r[0], gob:r[1]})
    // console.log(await main())
    // this.timerID = setInterval(
    //   () => this.tick(),
    //   10000
    // );

  }

  tick() {
    // this.setState({
    //   date: new Date()
    // });
  }

  render() {
    return (
      <div>
        <h1 style={{textAlign:'center'}}>Gobblers</h1>
        

        {this.state.gob.length<=0 ?  <h2 style={{textAlign:'center'}}>Making RPC calls...</h2> : <>
        <h2 style={{textAlign:'center'}}>Goo leaderboard</h2>
        <Table dataSource={this.state.goo} columns={columnsA}/>
        <h2 style={{textAlign:'center'}}>Gobbler leaderboard</h2>
        <Table dataSource={this.state.gob} columns={columnsB}/>

        </>}
        {/* <h2>It is {this.state.date.toLocaleTimeString()}.</h2> */}
      </div>
    );
  }
}

// const App = () => (
//   <div className="App">
//     <Button type="primary">Button</Button>
//   </div>
// );

export default App;