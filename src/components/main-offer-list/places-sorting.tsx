import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FILTERS } from '../../const';
import { RootState } from '../../store/store';
import { changeSort } from '../../store/action';

export function PlacesSorting() {
  const dispatch = useDispatch();
  const sortType = useSelector((state: RootState) => state.sortType);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleSelect = (id: string) => {
    dispatch(changeSort(id));
    setIsOpen(false);
  };

  return (
    <form className='places__sorting' action='#' method='get'>
      <span className='places__sorting-caption'>Sort by</span>
      <span
        className='places__sorting-type'
        tabIndex={0}
        onClick={handleToggle}
      >
        {FILTERS.find((f) => f.id === sortType)?.name || 'Popular'}
        <svg className='places__sorting-arrow' width='7' height='4'>
          <use href='#icon-arrow-select'></use>
        </svg>
      </span>

      <ul
        className={`places__options places__options--custom ${
          isOpen ? 'places__options--opened' : ''
        }`}
      >
        {FILTERS.map((filter) => (
          <li
            key={filter.id}
            className={`places__option ${
              filter.id === sortType ? 'places__option--active' : ''
            }`}
            tabIndex={0}
            onClick={() => handleSelect(filter.id)}
          >
            {filter.name}
          </li>
        ))}
      </ul>
    </form>
  );
}
