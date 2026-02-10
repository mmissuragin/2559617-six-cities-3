import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MainPageEmpty } from './MainPageEmpty';

function renderWithStore(city: string) {
  const store = configureStore({
    reducer: (state) => state as any,
    preloadedState: {
      city,
    },
  });

  return render(
    <Provider store={store}>
      <MainPageEmpty />
    </Provider>
  );
}

describe('MainPageEmpty', () => {
  it('renders empty main page with selected city', () => {
    renderWithStore('Amsterdam');

    expect(
      screen.getByText('No places to stay available')
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /We could not find any property available at the moment in Amsterdam/i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByAltText('No places available')
    ).toBeInTheDocument();
  });
});
