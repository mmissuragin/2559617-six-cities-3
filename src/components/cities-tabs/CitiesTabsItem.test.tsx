import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CitiesTabsItem } from './CitiesTabsItem';
import { vi } from 'vitest';

describe('CitiesTabsItem', () => {
  const onCityChange = vi.fn();

  beforeEach(() => {
    onCityChange.mockClear();
  });

  it('renders city name and active class correctly', () => {
    render(
      <MemoryRouter>
        <CitiesTabsItem cityName="Paris" isActive={true} onCityChange={onCityChange} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /Paris/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass('tabs__item--active');
  });

  it('does not have active class when isActive is false', () => {
    render(
      <MemoryRouter>
        <CitiesTabsItem cityName="Berlin" isActive={false} onCityChange={onCityChange} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /Berlin/i });
    expect(link).not.toHaveClass('tabs__item--active');
  });

  it('calls onCityChange with city name when clicked', () => {
    render(
      <MemoryRouter>
        <CitiesTabsItem cityName="London" isActive={false} onCityChange={onCityChange} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /London/i });
    fireEvent.click(link);

    expect(onCityChange).toHaveBeenCalledTimes(1);
    expect(onCityChange).toHaveBeenCalledWith('London');
  });
});
