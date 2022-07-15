import Search from './search';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const doSearch = jest.fn();

describe('Search', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render a form', () => {
    render(<Search doSearch={doSearch} />);

    // screen.debug();

    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('should render a input type equals search', () => {
    render(<Search doSearch={doSearch} />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('should call props.doSearch() when form is submitted', async () => {
    render(<Search doSearch={doSearch} />);

    const form = screen.getByRole('form');
    await fireEvent.submit(form);

    expect(doSearch).toHaveBeenCalledTimes(1);
  });

  it('should call props.doSearch() with the user input', async () => {
    render(<Search doSearch={doSearch} />);

    const inputText = 'Some search';
    const form = screen.getByRole('form');
    const input = screen.getByRole('searchbox');

    await userEvent.type(input, inputText);
    await fireEvent.submit(form);

    expect(doSearch).toHaveBeenLastCalledWith(inputText);
  });

  it('should call doSearch() when search input is cleared', async () => {
    render(<Search doSearch={doSearch} />);

    const inputText = 'Some search';
    const input = screen.getByRole('searchbox');

    await userEvent.type(input, inputText);
    await userEvent.clear(input);

    expect(doSearch).toHaveBeenCalledTimes(1);
    expect(doSearch).toHaveBeenLastCalledWith('');
  });
});
