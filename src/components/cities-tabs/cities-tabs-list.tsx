import { useDispatch, useSelector } from 'react-redux';
import { CitiesTabsItem } from './cities-tabs-item';
import { CITIES } from '../../const';
import { RootState, AppDispatch } from '../../store/store';
import { changeCity } from '../../store/action';

export function CitiesTabsList(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const selectedCity = useSelector((state: RootState) => state.city);

  const handleCityChange = (city: string) => {
    dispatch(changeCity(city));
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((city) => (
            <CitiesTabsItem
              key={city.id}
              cityName={city.name}
              isActive={selectedCity === city.name}
              onCityChange={handleCityChange}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}
