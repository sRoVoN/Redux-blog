import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {router} from './routes';
import { RouterProvider} from 'react-router-dom';
import { Provider, } from 'react-redux';
import { store } from './store';

  createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
      <Provider store={store}>
      <RouterProvider router={router} />   
      </Provider>
    </StrictMode>
  );



