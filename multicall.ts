import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  Multicall,
  MulticallMethodNames,
  MulticallEventsContext,
  MulticallEvents
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
export type MulticallEvents = undefined;
export interface MulticallEventsContext {}
export type MulticallMethodNames =
  | 'aggregate'
  | 'aggregate3'
  | 'aggregate3Value'
  | 'blockAndAggregate'
  | 'getBasefee'
  | 'getBlockHash'
  | 'getBlockNumber'
  | 'getChainId'
  | 'getCurrentBlockCoinbase'
  | 'getCurrentBlockDifficulty'
  | 'getCurrentBlockGasLimit'
  | 'getCurrentBlockTimestamp'
  | 'getEthBalance'
  | 'getLastBlockHash'
  | 'tryAggregate'
  | 'tryBlockAndAggregate';
export interface AggregateRequest {
  target: string;
  callData: Arrayish;
}
export interface Aggregate3Request {
  target: string;
  allowFailure: boolean;
  callData: Arrayish;
}
export interface ReturnDataResponse {
  success: boolean;
  0: boolean;
  returnData: string;
  1: string;
}
export interface Aggregate3ValueRequest {
  target: string;
  allowFailure: boolean;
  value: BigNumberish;
  callData: Arrayish;
}
export interface BlockAndAggregateRequest {
  target: string;
  callData: Arrayish;
}
export interface TryAggregateRequest {
  target: string;
  callData: Arrayish;
}
export interface TryBlockAndAggregateRequest {
  target: string;
  callData: Arrayish;
}
export interface Multicall {
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param calls Type: tuple[], Indexed: false
   */
  aggregate(
    calls: AggregateRequest[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param calls Type: tuple[], Indexed: false
   */
  aggregate3(
    calls: Aggregate3Request[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param calls Type: tuple[], Indexed: false
   */
  aggregate3Value(
    calls: Aggregate3ValueRequest[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param calls Type: tuple[], Indexed: false
   */
  blockAndAggregate(
    calls: BlockAndAggregateRequest[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getBasefee(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param blockNumber Type: uint256, Indexed: false
   */
  getBlockHash(
    blockNumber: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getBlockNumber(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getChainId(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getCurrentBlockCoinbase(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getCurrentBlockDifficulty(
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getCurrentBlockGasLimit(
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getCurrentBlockTimestamp(
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param addr Type: address, Indexed: false
   */
  getEthBalance(
    addr: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getLastBlockHash(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param requireSuccess Type: bool, Indexed: false
   * @param calls Type: tuple[], Indexed: false
   */
  tryAggregate(
    requireSuccess: boolean,
    calls: TryAggregateRequest[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param requireSuccess Type: bool, Indexed: false
   * @param calls Type: tuple[], Indexed: false
   */
  tryBlockAndAggregate(
    requireSuccess: boolean,
    calls: TryBlockAndAggregateRequest[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
