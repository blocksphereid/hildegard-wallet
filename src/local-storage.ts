import { AES } from 'crypto-js';

class LocalStorage {
  /**
   * Keys
   */
  static HILDEGARD_KS: 'hildegard:keystore';

  /**
   * getter setters
   */
  static setKeystore(_ks: string, password: string): void {
    const keystore = AES.encrypt(_ks, password);
    window.localStorage.setItem(LocalStorage.HILDEGARD_KS, keystore.toString());
  }

  static getKeystore(password: string): string {
    const encryptedKeystore = window.localStorage.getItem(LocalStorage.HILDEGARD_KS);
    if (encryptedKeystore === null) throw new Error('Keystore not found');
    return AES.decrypt(encryptedKeystore, password).toString();
  }

  static removeKeystore() {
    window.localStorage.removeItem(LocalStorage.HILDEGARD_KS);
  }
}

export default LocalStorage;
