import { Middleware } from 'redux';
import { getAccessToken } from '../../utils/helpers';

type WsActions = {
  wsInit: string;
  wsClose: string;
  onOpen: string;
  onError: string;
  onClose: string;
  onMessage: string;
};

export const socketMiddleware = (
  wsUrl: string,
  wsActions: WsActions,
  withAuth: boolean
): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, wsClose, onOpen, onError, onClose, onMessage } = wsActions;

      let token = withAuth ? getAccessToken() : null;

      if (type === wsInit) {
        let url = token ? `${wsUrl}?token=${token}` : `${wsUrl}/all`;
        socket = new WebSocket(url);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        if (type === wsClose) {
          socket.close();
        }
      }

      next(action);
    };
  };
};
