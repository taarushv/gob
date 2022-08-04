// "use strict";
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// function numberWithCommas(x) {
//     return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
// }
// function formatAsPercent(num) {
//     return new Intl.NumberFormat("default", {
//         style: "percent",
//         minimumFractionDigits: 2,
//         maximumFractionDigits: 2,
//     }).format(parseFloat(num.toString()) / 100);
// }

// const ethers_1 = require("ethers");
// const Goo_json_1 = __importDefault(require("./Goo.json"));
// const ArtGobblers_json_1 = __importDefault(require("./ArtGobblers.json"));
// const multicall_json_1 = __importDefault(require("./multicall.json"));
// const GOO_CONTRACT_ADDRESS = "0xba3fe78a799f8b6203face16179d98724f9a62c5";
// const ART_GOBBLERS_ADDRESS = "0x383049bb3ab2300580f2e51887d18efd8a2a00d3";
// const MULTICALL_ADDRESS = "0xcA11bde05977b3631167028862bE2a173976CA11";
// const whitelistForMevTesting = [
//     ["Pluto", "0xE182E58EAb4e8DC072eAFea18031f8f608676B25"],
//     ["0xMisaka", "0x3D31fa5C9Df0B0F800555FAB474595cE38Ad624e"],
//     ["Imagine & CuriousRabbit", "0xb074b8bB11e07636DBd8d4A45b4369826886144f"],
//     ["QTpie", "0xACED7eDDfC38F33d33a6DcC5D2AB83ebD8d6fb7B"],
//     ["Alcibiades", "0x0Cc56E024E9FDa80F939aB3b434d0DD76765d175"],
//     ["Ghilli", "0xFd495eeEd737b002Ea62Cf0534e7707a9656ba19"],
//     ["Asnared", "0x203c120c4a37d9BC313B7E0CfCCf1A263c6522DD"],
//     ["'Snarks' Team", "0xc6E058a257eD5EFD6F14DB90dF58754d6963d542"],
//     ["0xSlime aka Ben Leimberger", "0xff1906B7510fc994ddB9f76Ef1F56DC9EF9AB95D"],
//     ["Fireball", "0x6ba484ff27e481C4393D47De661cC5BE2537Ca56"],
//     ["Jepsen", "0xc7FE1135Ba71e03a7a6b9E1dDB8f653f143bdCF9"],
//     ["Otto Suwen", "0xCcfB66D52076A8295592642068c45D06FA6e36f6"],
//     ["Brock", "0x493D4b9Af9CD7fAEa2c8aA3815753cd03177827b"],
//     ["Will Price", "0x7fE092642F2Ad568bBd3d9795aD9d3AF474dd6f7"],
//     ["John J", "0x1D18077167c1177253555e45B4b5448B11E30b4b"],
// ];
// async function main() {
//     console.log("starting");
//     const provider = new ethers_1.ethers.providers.JsonRpcProvider("https://eth-rinkeby.alchemyapi.io/v2/oByEQdb2IOUXtMnDdawdPRwA1xmkqoDk");
//     const artGobblerContract = new ethers_1.ethers.Contract(ART_GOBBLERS_ADDRESS, ArtGobblers_json_1.default.abi, provider);
//     const gooContract = new ethers_1.ethers.Contract(GOO_CONTRACT_ADDRESS, Goo_json_1.default.abi, provider);
//     const multicallContract = new ethers_1.ethers.Contract(MULTICALL_ADDRESS, multicall_json_1.default, provider);
//     const artGobblerInterface = artGobblerContract.interface;
//     const gooInterface = gooContract.interface;
//     const gooDecimal = 18;
//     const everyoneGooBalance = [];
//     const everyoneGobblerBalance = [];
//     const multicallCallData = whitelistForMevTesting
//         .map(([name, address]) => {
//         return [
//             {
//                 target: ART_GOBBLERS_ADDRESS,
//                 allowFailure: false,
//                 callData: artGobblerInterface.encodeFunctionData("gooBalance", [
//                     address,
//                 ]),
//             },
//             {
//                 target: gooContract.address,
//                 allowFailure: false,
//                 callData: gooInterface.encodeFunctionData("balanceOf", [address]),
//             },
//             {
//                 target: artGobblerContract.address,
//                 allowFailure: false,
//                 callData: artGobblerInterface.encodeFunctionData("getUserEmissionMultiple", [address]),
//             },
//         ];
//     })
//         .flat();
//     let totalGoo = await gooContract.totalSupply();
//     try {
//         const callRes = await multicallContract.callStatic.aggregate3(multicallCallData, {
//             gasLimit: 1000000000,
//         });
//         await Promise.all(whitelistForMevTesting.map(async ([name, address], i) => {
//             const addressesInner = [];
//             const idsInner = [];
//             for (let i = 0; i < 10000; i++) {
//                 addressesInner.push(address);
//                 idsInner.push(i);
//             }
//             const index = i * 3;
//             const gooBalanceStake = ethers_1.ethers.BigNumber.from(callRes[index].returnData);
//             const gooBalanceUnstake = ethers_1.ethers.BigNumber.from(callRes[index + 1].returnData);
//             const multiple = ethers_1.ethers.BigNumber.from(callRes[index + 2].returnData);
//             totalGoo = totalGoo.add(gooBalanceStake);
//             const hasNft = (await artGobblerContract.balanceOfBatch(addressesInner, idsInner)).filter((x) => x.toNumber() == 1).length;
//             everyoneGobblerBalance.push([
//                 name,
//                 address,
//                 hasNft,
//                 "multiple " + multiple.toString(),
//             ]);
//             everyoneGooBalance.push([
//                 name,
//                 address,
//                 parseFloat(ethers_1.ethers.utils.formatUnits(gooBalanceStake.add(gooBalanceUnstake), gooDecimal)),
//             ]);
//         }));
//     }
//     catch (error) {
//         console.log("MULTICALL FAILED", error);
//         throw error;
//     }
//     everyoneGooBalance.sort((a, b) => b[2] - a[2]);
//     everyoneGobblerBalance.sort((a, b) => b[2] - a[2]);
//     const price = await artGobblerContract.gobblerPrice();
//     const initialPrice = await artGobblerContract.initialPrice();
//     const gobblerMinted = (await artGobblerContract.numMintedFromGoo()).sub(ethers_1.ethers.BigNumber.from(68));
//     console.log("Gobbler Price", ethers_1.ethers.utils.formatUnits(price, gooDecimal));
//     console.log("Initial Price", ethers_1.ethers.utils.formatUnits(initialPrice, gooDecimal));
//     console.log("gobblerMinted", gobblerMinted.toString());
//     console.log();
//     console.log("Goo Balance");
//     console.table(everyoneGooBalance.map(([name, address, balance]) => {
//         const percent = ethers_1.ethers.utils
//             .parseEther(balance + "")
//             .mul(ethers_1.ethers.BigNumber.from(10000))
//             .div(totalGoo)
//             .toNumber();
//         return {
//             percent: formatAsPercent(percent / 100),
//             name,
//             address,
//             balance: numberWithCommas(balance),
//         };
//     }));
//     // for (const [name, address, balance] of everyoneGooBalance) {
//     //   // console.log(formatAsPercent(percent.toNumber()), name, address, balance);
//     // }
//     console.log();
//     console.log("Gobbler Balance");
//     console.table(everyoneGobblerBalance.map(([name, address, balance, multiple]) => {
//         const minted = balance - 100;
//         const percent = (minted * 100) / gobblerMinted.toNumber();
//         return {
//             percent: formatAsPercent(percent),
//             name,
//             address,
//             balance: numberWithCommas(balance),
//             multiple,
//         };
//     }));
//     return [everyoneGobblerBalance, everyoneGooBalance]
//     // for (const [name, address, balance, multiple] of everyoneGobblerBalance) {
//     //   const minted = balance - 100;
//     //   const percent = (minted * 100) / gobblerMinted.toNumber();
//     //   console.log(formatAsPercent(percent), name, address, balance, multiple);
//     // }
// }

// const getData = async (this) => {
//     console.log("starting");

//     const provider = new ethers_1.ethers.providers.JsonRpcProvider("https://eth-rinkeby.alchemyapi.io/v2/oByEQdb2IOUXtMnDdawdPRwA1xmkqoDk");
//     const artGobblerContract = new ethers_1.ethers.Contract(ART_GOBBLERS_ADDRESS, ArtGobblers_json_1.default.abi, provider);
//     const gooContract = new ethers_1.ethers.Contract(GOO_CONTRACT_ADDRESS, Goo_json_1.default.abi, provider);
//     const multicallContract = new ethers_1.ethers.Contract(MULTICALL_ADDRESS, multicall_json_1.default, provider);
//     const artGobblerInterface = artGobblerContract.interface;
//     const gooInterface = gooContract.interface;
//     const gooDecimal = 18;
//     const everyoneGooBalance = [];
//     const everyoneGobblerBalance = [];
//     const multicallCallData = whitelistForMevTesting
//         .map(([name, address]) => {
//         return [
//             {
//                 target: ART_GOBBLERS_ADDRESS,
//                 allowFailure: false,
//                 callData: artGobblerInterface.encodeFunctionData("gooBalance", [
//                     address,
//                 ]),
//             },
//             {
//                 target: gooContract.address,
//                 allowFailure: false,
//                 callData: gooInterface.encodeFunctionData("balanceOf", [address]),
//             },
//             {
//                 target: artGobblerContract.address,
//                 allowFailure: false,
//                 callData: artGobblerInterface.encodeFunctionData("getUserEmissionMultiple", [address]),
//             },
//         ];
//     })
//         .flat();
//     let totalGoo = await gooContract.totalSupply();
//     // console.log(ethers_1.utils.formatEther(totalGoo))
//     try {
//         console.log("Starting multicall")
//         const callRes = await multicallContract.callStatic.aggregate3(multicallCallData, {
//             gasLimit: 1000000000,
//         });
//         await Promise.all(whitelistForMevTesting.map(async ([name, address], i) => {
//             console.log(name)
//             const addressesInner = [];
//             const idsInner = [];
//             for (let i = 0; i < 10000; i++) {
//                 addressesInner.push(address);
//                 idsInner.push(i);
//             }
//             const index = i * 3;
//             const gooBalanceStake = ethers_1.ethers.BigNumber.from(callRes[index].returnData);
//             const gooBalanceUnstake = ethers_1.ethers.BigNumber.from(callRes[index + 1].returnData);
//             const multiple = ethers_1.ethers.BigNumber.from(callRes[index + 2].returnData);
//             totalGoo = totalGoo.add(gooBalanceStake);
//             const hasNft = (await artGobblerContract.balanceOfBatch(addressesInner, idsInner)).filter((x) => x.toNumber() == 1).length;
//             everyoneGobblerBalance.push([
//                 name,
//                 address,
//                 hasNft,
//                 "multiple " + multiple.toString(),
//             ]);
//             everyoneGooBalance.push([
//                 name,
//                 address,
//                 parseFloat(ethers_1.ethers.utils.formatUnits(gooBalanceStake.add(gooBalanceUnstake), gooDecimal)),
//             ]);
//         }));
//         console.log("Ending multicall")
//     }
//     catch (error) {
//         console.log("MULTICALL FAILED", error);
//         throw error;
//     }
//     everyoneGooBalance.sort((a, b) => b[2] - a[2]);
//     everyoneGobblerBalance.sort((a, b) => b[2] - a[2]);
//     const price = await artGobblerContract.gobblerPrice();
//     const initialPrice = await artGobblerContract.initialPrice();
//     const gobblerMinted = (await artGobblerContract.numMintedFromGoo()).sub(ethers_1.ethers.BigNumber.from(68));
//     console.log("Gobbler Price", ethers_1.ethers.utils.formatUnits(price, gooDecimal));
//     console.log("Initial Price", ethers_1.ethers.utils.formatUnits(initialPrice, gooDecimal));
//     console.log("gobblerMinted", gobblerMinted.toString());
//     console.log();
//     console.log("Goo Balance");
//     const gooData = []
//     console.table(everyoneGooBalance.map(([name, address, balance], i) => {
//         const percent = ethers_1.ethers.utils
//             .parseEther(balance + "")
//             .mul(ethers_1.ethers.BigNumber.from(10000))
//             .div(totalGoo)
//             .toNumber();
//         const final = {
//             key:i+1,
//             rank:`#${i+1}`,
//             percentage: formatAsPercent(percent / 100),
//             name,
//             address,
//             balance: numberWithCommas(balance),
//         };
//         gooData.push(final);
//         return final;
//     }));
//     this.setState({goo: gooData})

//     // key: '1',
//     // rank: '1',
//     // percentage: '0.00%',
//     // name: 'a',
//     // address: '0x',
//     // balance:'0'
//     console.log();
//     console.log("Gobbler Balance");
//     const gobData = []
//     console.table(everyoneGobblerBalance.map(([name, address, balance, multiple], i) => {
//         console.log(name)
//         const minted = balance - 100;
//         const percent = (minted * 100) / gobblerMinted.toNumber();
//         const final = {
//             key: i+1,
//             rank:`#${i+1}`,
//             percentage: formatAsPercent(percent),
//             name,
//             address,
//             balance: numberWithCommas(balance),
//             multiple,
//         };
//         return final;
//     }));
//     this.setState({gob: gobData})

//     return [gooData, gobData]}

// export default getData;