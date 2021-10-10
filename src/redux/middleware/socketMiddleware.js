import { getAccessToken } from '../../utils/helpers';

export const socketMiddleware = (wsUrl, wsActions, withAuth) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, wsClose, onOpen, onError, onClose, onMessage } = wsActions;

      const token = getAccessToken() || null;

      if (type === wsInit) {
        socket = token ? new WebSocket(`${wsUrl}?token=${token}`) : new WebSocket(`${wsUrl}/all`);
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
