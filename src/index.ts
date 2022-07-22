import ls from './local-storage';
import { ApiPromise } from '@polkadot/api';
import keyring from '@polkadot/ui-keyring';
import { KeyringPair, KeyringPair$Json } from '@polkadot/keyring/types';
import { cryptoWaitReady, mnemonicGenerate } from '@polkadot/util-crypto';

export class HildegardWallet {
  static #loaded: boolean = false;

  static async #load(): Promise<void> {
    if (this.#loaded) return;
    await cryptoWaitReady();
    this.#loaded = true;
  }

  static async mnemonicGenerate(): Promise<string> {
    await this.#load();
    return mnemonicGenerate();
  }

  static async generateFromMnemonic(mnemonic: string, password: string, name?: string): Promise<HildegardWallet> {
    await this.#load();
    const { pair, json } = keyring.addUri(mnemonic, password, { name: name ?? 'accountName' });
    ls.setKeystore(JSON.stringify(json), password);
    return new HildegardWallet(pair);
  }

  static async restoreFromStorage(password: string): Promise<HildegardWallet> {
    await this.#load();
    const keyringPairJson: KeyringPair$Json = JSON.parse(ls.getKeystore(password));
    const pair = keyring.restoreAccount(keyringPairJson, password);
    return new HildegardWallet(pair);
  }

  static async restoreAccount(keyringPairJson: KeyringPair$Json, password: string): Promise<HildegardWallet> {
    await this.#load();
    const pair = keyring.restoreAccount(keyringPairJson, password);
    return new HildegardWallet(pair);
  }

  #pair: KeyringPair;

  constructor(pair: KeyringPair) {
    this.#pair = pair;
  }

  async load(): Promise<void> {
    await HildegardWallet.#load();
  }

  async execute(password: string, api: ApiPromise, f: any, params: any[]): Promise<any> {
    if (typeof f !== 'function') return;
    this.#pair.unlock(password);
    return await f(api, this.#pair, ...params);
  }
}
