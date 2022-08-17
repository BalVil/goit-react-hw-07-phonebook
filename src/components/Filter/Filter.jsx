import { useSelector, useDispatch } from 'react-redux';
import { Label, LabelTitle } from './Filter.styled';
import { changeFilter } from 'redux/filterSlice';
import { DebounceInput } from 'react-debounce-input';

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
        onChange={e => dispatch(changeFilter(e.target.value))}
        name="filter"
      />
    </Label>
  );
};
export default Filter;
