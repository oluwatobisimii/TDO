// Cryptographic SHA-256 Authentication Helper for Admin Studio

// Default accepted hashes:
// SHA-256 for 'dolapo2026': 402bd591904f6c735ef2ff4eaa1814687728ea248b7cdfd53b3484400bdef2f9
// SHA-256 for 'tdo2026': 0f4efe6f71ecb5dab2a61f2c669e61a6e3f257b41ec85c52df49d97afa7182a5
const DEFAULT_HASHES = [
  '402bd591904f6c735ef2ff4eaa1814687728ea248b7cdfd53b3484400bdef2f9',
  '0f4efe6f71ecb5dab2a61f2c669e61a6e3f257b41ec85c52df49d97afa7182a5',
];

const CUSTOM_HASH_KEY = 'tdo_admin_hash_custom';
const SESSION_KEY = 'tdo_admin_session_auth';

export const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password.trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const verifyAdminPassword = async (password: string): Promise<boolean> => {
  if (!password) return false;
  const inputHash = await hashPassword(password);
  
  // Check custom password if set
  if (typeof window !== 'undefined') {
    const customHash = localStorage.getItem(CUSTOM_HASH_KEY);
    if (customHash && inputHash === customHash) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      return true;
    }
  }

  // Check default encrypted hashes
  if (DEFAULT_HASHES.includes(inputHash)) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(SESSION_KEY, 'true');
    }
    return true;
  }

  return false;
};

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(SESSION_KEY) === 'true';
};

export const logoutAdmin = (): void => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(SESSION_KEY);
  }
};

export const setCustomPassword = async (newPassword: string): Promise<void> => {
  if (typeof window === 'undefined') return;
  const newHash = await hashPassword(newPassword);
  localStorage.setItem(CUSTOM_HASH_KEY, newHash);
};
