import CryptoJS from 'crypto-js';

class LocalStorage {
  /**
   * Keys
   */
  static HILDEGARD_KS: 'HILDEGARD_KS';

  /**
   * getter setters
   */
  static setKeystore(_ks: string, password: string): void {
    const keystore = CryptoJS.AES.encrypt(_ks, password);
    window.localStorage.setItem(this.HILDEGARD_KS, keystore);
  }

  static getKeystore(password: string): string {
    const encryptedKeystore = window.localStorage.getItem(this.HILDEGARD_KS);
    if (encryptedKeystore === null) throw new Error('Keystore not found');
    return CryptoJS.AES.decrypt(encryptedKeystore, password);
  }

  static removeKeystore() {
    window.localStorage.removeItem(this.HILDEGARD_KS);
  }
}

export default LocalStorage;
