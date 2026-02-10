import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeCity } from '../../store/action';
import { CITIES, AppRoute } from '../../const';
import { RootState } from '../../store/store';

export function LoginOffersRedirect() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentCity = useSelector((state: RootState) => state.city);

  const randomCity =
    CITIES.filter((city) => city.name !== currentCity)[
      Math.floor(Math.random() * (CITIES.length - 1))
    ];

  const handleClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(changeCity(randomCity.name));
    navigate(AppRoute.Main);
  };

  return (
    <section className="locations locations--login locations--current">
      <div className="locations__item">
        <a
          className="locations__item-link"
          href="#"
          onClick={handleClick}
        >
          <span>{randomCity.name}</span>
        </a>
      </div>
    </section>
  );
}
