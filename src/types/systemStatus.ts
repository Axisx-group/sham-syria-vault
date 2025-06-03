
export interface SystemCheck {
  name: string;
  status: 'checking' | 'success' | 'error';
  message: string;
  icon: React.ComponentType<any>;
}

export type CheckFunction = (updateCheck: (name: string, status: 'success' | 'error', message: string) => void) => Promise<void>;
