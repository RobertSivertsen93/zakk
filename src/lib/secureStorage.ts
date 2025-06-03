
// Secure storage utility to handle sensitive data

interface StorageItem {
  data: any;
  timestamp: number;
  expires?: number;
}

class SecureStorage {
  private static instance: SecureStorage;
  private readonly prefix = 'app_';
  
  public static getInstance(): SecureStorage {
    if (!SecureStorage.instance) {
      SecureStorage.instance = new SecureStorage();
    }
    return SecureStorage.instance;
  }

  // Sanitize keys to prevent injection
  private sanitizeKey(key: string): string {
    return key.replace(/[^a-zA-Z0-9_-]/g, '').substring(0, 50);
  }

  // Basic obfuscation for sensitive data (not encryption, but better than plain text)
  private obfuscate(data: string): string {
    return btoa(data);
  }

  private deobfuscate(data: string): string {
    try {
      return atob(data);
    } catch {
      return '';
    }
  }

  // Set item with optional expiration
  public setItem(key: string, value: any, expiresInMinutes?: number): void {
    const sanitizedKey = this.sanitizeKey(key);
    const item: StorageItem = {
      data: value,
      timestamp: Date.now(),
      expires: expiresInMinutes ? Date.now() + (expiresInMinutes * 60 * 1000) : undefined
    };

    try {
      const serialized = JSON.stringify(item);
      const obfuscated = this.obfuscate(serialized);
      sessionStorage.setItem(this.prefix + sanitizedKey, obfuscated);
    } catch (error) {
      console.warn('Failed to store item securely:', error);
    }
  }

  // Get item with expiration check
  public getItem(key: string): any {
    const sanitizedKey = this.sanitizeKey(key);
    
    try {
      const stored = sessionStorage.getItem(this.prefix + sanitizedKey);
      if (!stored) return null;

      const deobfuscated = this.deobfuscate(stored);
      const item: StorageItem = JSON.parse(deobfuscated);

      // Check if item has expired
      if (item.expires && Date.now() > item.expires) {
        this.removeItem(key);
        return null;
      }

      return item.data;
    } catch (error) {
      console.warn('Failed to retrieve item securely:', error);
      this.removeItem(key);
      return null;
    }
  }

  // Remove item
  public removeItem(key: string): void {
    const sanitizedKey = this.sanitizeKey(key);
    sessionStorage.removeItem(this.prefix + sanitizedKey);
  }

  // Clear all app-specific items
  public clear(): void {
    const keys = Object.keys(sessionStorage);
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        sessionStorage.removeItem(key);
      }
    });
  }

  // Get storage size (for monitoring)
  public getStorageSize(): number {
    let total = 0;
    const keys = Object.keys(sessionStorage);
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        total += (sessionStorage.getItem(key) || '').length;
      }
    });
    return total;
  }
}

export const secureStorage = SecureStorage.getInstance();
