import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { NearPlaces } from './NearPlaces';
import { NearPlacesCard } from './NearPlacesCard';

vi.mock('./NearPlacesCard', () => ({
  NearPlacesCard: vi.fn(() => <div data-testid="near-card" />),
}));

const mockDispatch = vi.fn();

vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) =>
    selector({
      currentNearbyOffers: [
        { id: '1', isPremium: true, previewImage: 'img1.jpg', price: 100, rating: 5, title: 'A', type: 'apartment' },
        { id: '2', isPremium: false, previewImage: 'img2.jpg', price: 200, rating: 4, title: 'B', type: 'room' },
        { id: '3', isPremium: true, previewImage: 'img3.jpg', price: 150, rating: 3, title: 'C', type: 'house' },
        { id: '4', isPremium: false, previewImage: 'img4.jpg', price: 120, rating: 2, title: 'D', type: 'apartment' },
      ],
    }),
}));

vi.mock('react-router-dom', async () => {
  const actual: any = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '123' }),
  };
});

describe('NearPlaces component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly, dispatch fetchNearbyOffers and render 3 NearPlacesCard with correct props', () => {
    const { getByText, getAllByTestId } = render(<NearPlaces />);

    expect(getByText('Other places in the neighbourhood')).toBeTruthy();

    expect(mockDispatch).toHaveBeenCalledTimes(1);

    const cards = getAllByTestId('near-card');
    expect(cards.length).toBe(3);

    const calls = (NearPlacesCard as unknown as ReturnType<typeof vi.fn>).mock.calls;

    expect(calls[0][0]).toMatchObject({
      id: '1',
      isPremium: true,
      imageSrc: 'img1.jpg',
      pricePerNight: 100,
      rating: 100,
      title: 'A',
      type: 'Apartment',
    });

    expect(calls[1][0]).toMatchObject({
      id: '2',
      isPremium: false,
      imageSrc: 'img2.jpg',
      pricePerNight: 200,
      rating: 80,
      title: 'B',
      type: 'Room',
    });

    expect(calls[2][0]).toMatchObject({
      id: '3',
      isPremium: true,
      imageSrc: 'img3.jpg',
      pricePerNight: 150,
      rating: 60,
      title: 'C',
      type: 'House',
    });
  });
});
