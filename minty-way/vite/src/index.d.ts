interface Window {
  ethereum: any;
}

interface INewToken {
  image: string;
  name: string;
  symbol: string;
}

interface IPermissions {
  mint: boolean;
  freeze: boolean;
  owner: boolean;
}

interface IToken {
  tokenName: string;
  contractAddress: string;
  permissions: IPermissions;
  imageUrl: string;
  link: string;
}

interface ITemplate {
  image: string;
  template: string;
  price: string;
  properties: {
    key: string;
    description: string;
  };
}

interface IMyToken {
  balance: number;
  decimals: number;
  logo: string;
  name: string;
  percentage_relative_to_total_supply: number;
  possible_spam: boolean;
  symbol: string;
  thumbnail: string;
  token_address: string;
  total_supply: number;
  total_supply_formatted: string;
  verified_contract: boolean;
}

interface IProjectInfo {
  network: string;
  totalSupply: number;
  hardCap: number;
  platformRaise: number;
  projectValuation: number;
  initialMarketCap: number;
}

interface ITicketInfo {
  launchPrice: number;
  totalAmount: number;
  totalIssued: number;
  totalWinningTickets: number;
  redemptionAmount: number;
  totalParticipants: number;
}

interface IPresale {
  tokenAddress: string;
  name: string;
  description: string;
  image: string | ArrayBuffer | null | undefined;
  subscriptionStartTime: string;
  snapshotStartTime: string;
  snapshotEndTime: string;
  lotteryStartTime: string;
  lotteryEndTime: string;
  redemptionTime: string;
  projectInfo: IProjectInfo;
  ticketInfo: ITicketInfo;
}
