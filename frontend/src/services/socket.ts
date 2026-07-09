export class WebSocketService {
  private socket: WebSocket | null = null;
  private listeners: ((data: any) => void)[] = [];

  constructor(private url: string) {}

  connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log('Connected to CyberShield WebSocket');
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.listeners.forEach(listener => listener(data));
      } catch (e) {
        console.error("Error parsing websocket message", e);
      }
    };

    this.socket.onclose = () => {
      console.log('WebSocket disconnected, attempting to reconnect...');
      setTimeout(() => this.connect(), 5000);
    };
  }

  subscribe(callback: (data: any) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }
}

const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws/live';
export const wsService = new WebSocketService(WS_URL);
