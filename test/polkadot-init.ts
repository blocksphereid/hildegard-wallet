import keyring from "@polkadot/ui-keyring";
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { ApiPromise, WsProvider } from "@polkadot/api";

export async function initializeApi() {    
    await cryptoWaitReady();
    keyring.loadAll({ ss58Format: 42, type: "sr25519" });
  
    const wsProvider = new WsProvider("ws://127.0.0.1:9944");
    const api = await ApiPromise.create({
      provider: wsProvider
    });
    const alice = keyring.addUri('//Alice', "password", { name: 'Alice default' });

    return { api, pair: alice.pair };
}