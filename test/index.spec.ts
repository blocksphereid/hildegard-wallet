import 'regenerator-runtime/runtime';
import { ApiPromise } from '@polkadot/api';
import { HildegardWallet } from '../src/index';
import { labDataMock } from './mocks/labs.mock';
import { initializeApi } from './polkadot-init';
import { queryLabCount, registerLab } from '@debionetwork/polkadot-provider';

describe('Integration Tests', () => {
  let api: ApiPromise;
  let pair: any;

  beforeAll(async () => {
    const { api: _api, pair: _pair } = await initializeApi();
    api = _api;
    pair = _pair;
  });

  afterAll(() => {
    api.disconnect();
  });

  it('should return', async () => {
    const wallet = new HildegardWallet(pair);
    await wallet.execute("password", api, registerLab, [labDataMock.info]);
    const count = await queryLabCount(api as any);
    expect(count).toEqual(1);
  });
});
