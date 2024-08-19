/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../common";

export interface PresaleInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "claim"
      | "getTicketAmount"
      | "getWinners"
      | "isSubscribed"
      | "purchaseTicket"
      | "refund"
      | "subscription"
      | "winners"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "claim", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getTicketAmount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getWinners",
    values: [AddressLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "isSubscribed",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "purchaseTicket",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "refund", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "subscription",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "winners",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getTicketAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getWinners", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isSubscribed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "purchaseTicket",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "refund", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "subscription",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "winners", data: BytesLike): Result;
}

export interface Presale extends BaseContract {
  connect(runner?: ContractRunner | null): Presale;
  waitForDeployment(): Promise<this>;

  interface: PresaleInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  claim: TypedContractMethod<[], [void], "nonpayable">;

  getTicketAmount: TypedContractMethod<[], [bigint], "view">;

  getWinners: TypedContractMethod<
    [_winners: AddressLike[]],
    [void],
    "nonpayable"
  >;

  isSubscribed: TypedContractMethod<[], [boolean], "view">;

  purchaseTicket: TypedContractMethod<
    [_amount: BigNumberish],
    [void],
    "payable"
  >;

  refund: TypedContractMethod<[], [void], "nonpayable">;

  subscription: TypedContractMethod<[], [void], "nonpayable">;

  winners: TypedContractMethod<[arg0: AddressLike], [boolean], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "claim"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "getTicketAmount"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getWinners"
  ): TypedContractMethod<[_winners: AddressLike[]], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "isSubscribed"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "purchaseTicket"
  ): TypedContractMethod<[_amount: BigNumberish], [void], "payable">;
  getFunction(
    nameOrSignature: "refund"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "subscription"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "winners"
  ): TypedContractMethod<[arg0: AddressLike], [boolean], "view">;

  filters: {};
}
