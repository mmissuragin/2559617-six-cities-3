import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { useRef } from 'react';
import useMap from './useMap';
import leaflet from 'leaflet';

vi.mock('leaflet', () => {
  const addToMock = vi.fn();
  const tileLayerMock = vi.fn(() => ({ addTo: addToMock }));
  const mapMock = vi.fn(() => ({ addLayer: vi.fn() }));
  return {
    __esModule: true,
    default: {
      map: mapMock,
      tileLayer: tileLayerMock,
    },
  };
});

describe('useMap hook', () => {
  let mapRef: { current: HTMLElement | null };
  const mapCenter = { latitude: 10, longitude: 20, zoom: 5 };

  beforeEach(() => {
    mapRef = { current: document.createElement('div') };
    vi.clearAllMocks();
  });

  function TestComponent({ mapCenter }: { mapCenter: { latitude: number; longitude: number; zoom: number } }) {
    const mapRefInner = useRef(mapRef.current);
    const map = useMap(mapRefInner, mapCenter);
    return <div data-testid="map-status">{map ? 'initialized' : 'not-initialized'}</div>;
  }

  it('should initialize map on first render', () => {
    const { getByTestId } = render(<TestComponent mapCenter={mapCenter} />);
    expect(getByTestId('map-status').textContent).toBe('initialized');
    expect(leaflet.map).toHaveBeenCalledWith(mapRef.current, {
      center: [mapCenter.latitude, mapCenter.longitude],
      zoom: mapCenter.zoom,
    });
    expect(leaflet.tileLayer).toHaveBeenCalled();
  });

  it('should not re-initialize map if props change', () => {
    const { rerender } = render(<TestComponent mapCenter={mapCenter} />);
    const newCenter = { latitude: 50, longitude: 60, zoom: 10 };
    rerender(<TestComponent mapCenter={newCenter} />);
    expect(leaflet.map).toHaveBeenCalledTimes(1);
  });
});
