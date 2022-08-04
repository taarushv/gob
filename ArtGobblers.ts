import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from "ethers";
import { EthersContractContextV5 } from "ethereum-abi-types-generator";

export type ContractContext = EthersContractContextV5<
  ArtGobblers,
  ArtGobblersMethodNames,
  ArtGobblersEventsContext,
  ArtGobblersEvents
>;

export declare type EventFilter = {
  address?: string;
  topics?: Array<string>;
  fromBlock?: string | number;
  toBlock?: string | number;
};

export interface ContractTransactionOverrides {
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
  /**
   * The price (in wei) per unit of gas
   */
  gasPrice?: BigNumber | string | number | Promise<any>;
  /**
   * The nonce to use in the transaction
   */
  nonce?: number;
  /**
   * The amount to send with the transaction (i.e. msg.value)
   */
  value?: BigNumber | string | number | Promise<any>;
  /**
   * The chain ID (or network ID) to use
   */
  chainId?: number;
}

export interface ContractCallOverrides {
  /**
   * The address to execute the call as
   */
  from?: string;
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
}
export type ArtGobblersEvents =
  | "ApprovalForAll"
  | "ArtFedToGobbler"
  | "GobblerClaimed"
  | "GobblerPurchased"
  | "GobblersRevealed"
  | "GooAdded"
  | "GooRemoved"
  | "LegendaryGobblerMinted"
  | "OwnerUpdated"
  | "RandomnessFulfilled"
  | "RandomnessRequested"
  | "ReservedGobblersMinted"
  | "TransferBatch"
  | "TransferSingle"
  | "URI";
export interface ArtGobblersEventsContext {
  ApprovalForAll(...parameters: any): EventFilter;
  ArtFedToGobbler(...parameters: any): EventFilter;
  GobblerClaimed(...parameters: any): EventFilter;
  GobblerPurchased(...parameters: any): EventFilter;
  GobblersRevealed(...parameters: any): EventFilter;
  GooAdded(...parameters: any): EventFilter;
  GooRemoved(...parameters: any): EventFilter;
  LegendaryGobblerMinted(...parameters: any): EventFilter;
  OwnerUpdated(...parameters: any): EventFilter;
  RandomnessFulfilled(...parameters: any): EventFilter;
  RandomnessRequested(...parameters: any): EventFilter;
  ReservedGobblersMinted(...parameters: any): EventFilter;
  TransferBatch(...parameters: any): EventFilter;
  TransferSingle(...parameters: any): EventFilter;
  URI(...parameters: any): EventFilter;
}
export type ArtGobblersMethodNames =
  | "new"
  | "BASE_URI"
  | "FIRST_LEGENDARY_GOBBLER_ID"
  | "LEGENDARY_AUCTION_INTERVAL"
  | "LEGENDARY_SUPPLY"
  | "MAX_MINTABLE"
  | "MAX_SUPPLY"
  | "MINTLIST_SUPPLY"
  | "RESERVED_SUPPLY"
  | "UNREVEALED_URI"
  | "addGoo"
  | "balanceOf"
  | "balanceOfBatch"
  | "claimGobbler"
  | "community"
  | "currentNonLegendaryId"
  | "feedArt"
  | "getCopiesOfArtFedToGobbler"
  | "getEmissionDataForUser"
  | "getGobblerData"
  | "getGobblerEmissionMultiple"
  | "getPrice"
  | "getUserEmissionMultiple"
  | "gobblerPrice"
  | "gobblerRevealsData"
  | "goo"
  | "gooBalance"
  | "hasClaimedMintlistGobbler"
  | "initialPrice"
  | "isApprovedForAll"
  | "legendaryGobblerAuctionData"
  | "legendaryGobblerPrice"
  | "merkleRoot"
  | "mintFromGoo"
  | "mintLegendaryGobbler"
  | "mintReservedGobblers"
  | "mintStart"
  | "name"
  | "numMintedForReserves"
  | "numMintedFromGoo"
  | "onERC1155BatchReceived"
  | "onERC1155Received"
  | "owner"
  | "ownerOf"
  | "rawFulfillRandomness"
  | "removeGoo"
  | "requestRandomSeed"
  | "revealGobblers"
  | "safeBatchTransferFrom"
  | "safeTransferFrom"
  | "setApprovalForAll"
  | "setOwner"
  | "team"
  | "uri";
export interface ApprovalForAllEventEmittedResponse {
  owner: string;
  operator: string;
  approved: boolean;
}
export interface ArtFedToGobblerEventEmittedResponse {
  user: string;
  gobblerId: BigNumberish;
  nft: string;
  id: BigNumberish;
}
export interface GobblerClaimedEventEmittedResponse {
  user: string;
  gobblerId: BigNumberish;
}
export interface GobblerPurchasedEventEmittedResponse {
  user: string;
  gobblerId: BigNumberish;
  price: BigNumberish;
}
export interface GobblersRevealedEventEmittedResponse {
  user: string;
  numGobblers: BigNumberish;
  lastRevealedId: BigNumberish;
}
export interface GooAddedEventEmittedResponse {
  user: string;
  gooAdded: BigNumberish;
}
export interface GooRemovedEventEmittedResponse {
  user: string;
  gooAdded: BigNumberish;
}
export interface LegendaryGobblerMintedEventEmittedResponse {
  user: string;
  gobblerId: BigNumberish;
  burnedGobblerIds: BigNumberish[];
}
export interface OwnerUpdatedEventEmittedResponse {
  user: string;
  newOwner: string;
}
export interface RandomnessFulfilledEventEmittedResponse {
  randomness: BigNumberish;
}
export interface RandomnessRequestedEventEmittedResponse {
  user: string;
  toBeRevealed: BigNumberish;
}
export interface ReservedGobblersMintedEventEmittedResponse {
  user: string;
  lastMintedGobblerId: BigNumberish;
  numGobblersEach: BigNumberish;
}
export interface TransferBatchEventEmittedResponse {
  operator: string;
  from: string;
  to: string;
  ids: BigNumberish[];
  amounts: BigNumberish[];
}
export interface TransferSingleEventEmittedResponse {
  operator: string;
  from: string;
  to: string;
  id: BigNumberish;
  amount: BigNumberish;
}
export interface URIEventEmittedResponse {
  value: string;
  id: BigNumberish;
}
export interface GetEmissionDataForUserResponse {
  emissionMultiple: BigNumber;
  0: BigNumber;
  lastBalance: BigNumber;
  1: BigNumber;
  lastTimestamp: BigNumber;
  2: BigNumber;
  length: 3;
}
export interface GetGobblerDataResponse {
  owner: string;
  0: string;
  idx: number;
  1: number;
  emissionMultiple: number;
  2: number;
  length: 3;
}
export interface GobblerRevealsDataResponse {
  randomSeed: BigNumber;
  0: BigNumber;
  nextRevealTimestamp: BigNumber;
  1: BigNumber;
  lastRevealedId: BigNumber;
  2: BigNumber;
  toBeRevealed: BigNumber;
  3: BigNumber;
  waitingForSeed: boolean;
  4: boolean;
  length: 5;
}
export interface LegendaryGobblerAuctionDataResponse {
  startPrice: BigNumber;
  0: BigNumber;
  numSold: BigNumber;
  1: BigNumber;
  length: 2;
}
export interface ArtGobblers {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param _merkleRoot Type: bytes32, Indexed: false
   * @param _mintStart Type: uint256, Indexed: false
   * @param _goo Type: address, Indexed: false
   * @param _team Type: address, Indexed: false
   * @param _community Type: address, Indexed: false
   * @param _vrfCoordinator Type: address, Indexed: false
   * @param _linkToken Type: address, Indexed: false
   * @param _chainlinkKeyHash Type: bytes32, Indexed: false
   * @param _chainlinkFee Type: uint256, Indexed: false
   * @param _baseUri Type: string, Indexed: false
   * @param _unrevealedUri Type: string, Indexed: false
   */
  "new"(
    _merkleRoot: Arrayish,
    _mintStart: BigNumberish,
    _goo: string,
    _team: string,
    _community: string,
    _vrfCoordinator: string,
    _linkToken: string,
    _chainlinkKeyHash: Arrayish,
    _chainlinkFee: BigNumberish,
    _baseUri: string,
    _unrevealedUri: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  BASE_URI(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  FIRST_LEGENDARY_GOBBLER_ID(
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  LEGENDARY_AUCTION_INTERVAL(
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  LEGENDARY_SUPPLY(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  MAX_MINTABLE(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  MAX_SUPPLY(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  MINTLIST_SUPPLY(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  RESERVED_SUPPLY(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  UNREVEALED_URI(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param gooAmount Type: uint256, Indexed: false
   */
  addGoo(
    gooAmount: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param owner Type: address, Indexed: false
   * @param id Type: uint256, Indexed: false
   */
  balanceOf(
    owner: string,
    id: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param owners Type: address[], Indexed: false
   * @param ids Type: uint256[], Indexed: false
   */
  balanceOfBatch(
    owners: string[],
    ids: BigNumberish[],
    overrides?: ContractCallOverrides
  ): Promise<BigNumber[]>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param proof Type: bytes32[], Indexed: false
   */
  claimGobbler(
    proof: Arrayish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  community(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  currentNonLegendaryId(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param gobblerId Type: uint256, Indexed: false
   * @param nft Type: address, Indexed: false
   * @param id Type: uint256, Indexed: false
   * @param isERC1155 Type: bool, Indexed: false
   */
  feedArt(
    gobblerId: BigNumberish,
    nft: string,
    id: BigNumberish,
    isERC1155: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   * @param parameter1 Type: address, Indexed: false
   * @param parameter2 Type: uint256, Indexed: false
   */
  getCopiesOfArtFedToGobbler(
    parameter0: BigNumberish,
    parameter1: string,
    parameter2: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  getEmissionDataForUser(
    parameter0: string,
    overrides?: ContractCallOverrides
  ): Promise<GetEmissionDataForUserResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  getGobblerData(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<GetGobblerDataResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param gobblerId Type: uint256, Indexed: false
   */
  getGobblerEmissionMultiple(
    gobblerId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param timeSinceStart Type: uint256, Indexed: false
   * @param sold Type: uint256, Indexed: false
   */
  getPrice(
    timeSinceStart: BigNumberish,
    sold: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param user Type: address, Indexed: false
   */
  getUserEmissionMultiple(
    user: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  gobblerPrice(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  gobblerRevealsData(
    overrides?: ContractCallOverrides
  ): Promise<GobblerRevealsDataResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  goo(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param user Type: address, Indexed: false
   */
  gooBalance(
    user: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  hasClaimedMintlistGobbler(
    parameter0: string,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  initialPrice(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: address, Indexed: false
   */
  isApprovedForAll(
    parameter0: string,
    parameter1: string,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  legendaryGobblerAuctionData(
    overrides?: ContractCallOverrides
  ): Promise<LegendaryGobblerAuctionDataResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  legendaryGobblerPrice(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  merkleRoot(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param maxPrice Type: uint256, Indexed: false
   */
  mintFromGoo(
    maxPrice: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param gobblerIds Type: uint256[], Indexed: false
   */
  mintLegendaryGobbler(
    gobblerIds: BigNumberish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param numGobblersEach Type: uint256, Indexed: false
   */
  mintReservedGobblers(
    numGobblersEach: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  mintStart(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  name(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  numMintedForReserves(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  numMintedFromGoo(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: address, Indexed: false
   * @param parameter2 Type: uint256[], Indexed: false
   * @param parameter3 Type: uint256[], Indexed: false
   * @param parameter4 Type: bytes, Indexed: false
   */
  onERC1155BatchReceived(
    parameter0: string,
    parameter1: string,
    parameter2: BigNumberish[],
    parameter3: BigNumberish[],
    parameter4: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: address, Indexed: false
   * @param parameter2 Type: uint256, Indexed: false
   * @param parameter3 Type: uint256, Indexed: false
   * @param parameter4 Type: bytes, Indexed: false
   */
  onERC1155Received(
    parameter0: string,
    parameter1: string,
    parameter2: BigNumberish,
    parameter3: BigNumberish,
    parameter4: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  owner(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param id Type: uint256, Indexed: false
   */
  ownerOf(id: BigNumberish, overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param requestId Type: bytes32, Indexed: false
   * @param randomness Type: uint256, Indexed: false
   */
  rawFulfillRandomness(
    requestId: Arrayish,
    randomness: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param gooAmount Type: uint256, Indexed: false
   */
  removeGoo(
    gooAmount: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  requestRandomSeed(
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param numGobblers Type: uint256, Indexed: false
   */
  revealGobblers(
    numGobblers: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param ids Type: uint256[], Indexed: false
   * @param amounts Type: uint256[], Indexed: false
   * @param data Type: bytes, Indexed: false
   */
  safeBatchTransferFrom(
    from: string,
    to: string,
    ids: BigNumberish[],
    amounts: BigNumberish[],
    data: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param id Type: uint256, Indexed: false
   * @param amount Type: uint256, Indexed: false
   * @param data Type: bytes, Indexed: false
   */
  safeTransferFrom(
    from: string,
    to: string,
    id: BigNumberish,
    amount: BigNumberish,
    data: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param operator Type: address, Indexed: false
   * @param approved Type: bool, Indexed: false
   */
  setApprovalForAll(
    operator: string,
    approved: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newOwner Type: address, Indexed: false
   */
  setOwner(
    newOwner: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  team(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param gobblerId Type: uint256, Indexed: false
   */
  uri(
    gobblerId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
}
