/**
 * AQMS Socket.IO Client
 *
 * Singleton socket connection. The backend broadcasts simulated sensor
 * data every 5–30 seconds via these events:
 *   outdoor:reading   — outdoor sensor reading object
 *   indoor:reading    — indoor sensor reading object
 *   alerts:update     — array of alert objects
 *   devices:status    — array of device status objects
 *   dashboard:summary — full dashboard summary object
 *
 * Usage:
 *   import { getSocket, disconnectSocket } from '../services/socket';
 *   const socket = getSocket();
 *   socket.on('outdoor:reading', (data) => { ... });
 *   // On component unmount:
 *   socket.off('outdoor:reading');
 */

import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

let socket = null;

export function getSocket() {
  if (socket && socket.connected) return socket;

  if (socket) {
    // Clean up stale socket before creating a new one
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
  }

  socket = io(SOCKET_URL, {
    reconnection:       true,
    reconnectionDelay:  3000,
    reconnectionDelayMax: 10000,
    reconnectionAttempts: 5,
    transports: ['websocket', 'polling'],
    // Don't auto-connect in test/SSR environments
    autoConnect: true,
  });

  socket.on('connect', () => {
    // Use debug-level logging to minimize console noise
    if (import.meta.env.DEV) {
      console.debug('[AQMS Socket] Connected:', socket.id);
    }
  });

  socket.on('reconnect', (attempt) => {
    if (import.meta.env.DEV) {
      console.debug('[AQMS Socket] Reconnected after', attempt, 'attempt(s)');
    }
  });

  socket.on('disconnect', (reason) => {
    if (import.meta.env.DEV) {
      console.debug('[AQMS Socket] Disconnected:', reason);
    }
  });

  socket.on('connect_error', (err) => {
    // Only log once per error type — avoid flooding the console
    if (import.meta.env.DEV) {
      console.debug('[AQMS Socket] Connection error:', err.message);
    }
  });

  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
  }
}

export function isConnected() {
  return socket ? socket.connected : false;
}

export default getSocket;
