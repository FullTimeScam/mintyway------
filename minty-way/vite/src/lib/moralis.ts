import Moralis from "moralis";

export async function startMoralis() {
  try {
    await Moralis.start({
      apiKey: import.meta.env.VITE_MORALIS_API_KEY,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getWalletTokens(address: string): Promise<IMyToken[]> {
  try {
    const response = await Moralis.EvmApi.token.getWalletTokenBalances({
      chain: "0xaa36a7", //sepolia
      address: address,
    });

    console.log(response.raw);
    return response.raw as IMyToken[];
  } catch (error) {
    console.error(error);
    return [];
  }
}
