import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../../store/api-actions';

import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import { AppDispatch } from '../../store/store';

import { MainPage } from '../../pages/MainPage';
import { LoginPage } from '../../pages/LoginPage';
import { FavoritesPage } from '../../pages/FavoritesPage';
import { OfferPage } from '../../pages/OfferPage';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { PrivateRoute } from '../private-routers/PrivateRoute';

export default function App(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.Offer}/:id`}
          element={<OfferPage />}
        />
        <Route
          path={'*'}
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}
