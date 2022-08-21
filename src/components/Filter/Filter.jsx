import { useSelector, useDispatch } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';
import { Label, LabelTitle } from './Filter.styled';
import { setFilter } from 'redux/filterSlice';

const Filter = () => {
  const { value } = useSelector(state => state.filter.value);
  const dispatch = useDispatch();

  return (
    <Label>
      <LabelTitle>Find contacts by name</LabelTitle>
      <DebounceInput
        debounceTimeout={300}
        type="text"
        value={value}
        onChange={e => dispatch(setFilter(e.target.value))}
        name="filter"
      />
    </Label>
  );
};
export default Filter;
