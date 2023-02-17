import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from '../src/component/Sidebar';

afterEach(cleanup);

describe('sidebar tests', () => {
  const users = ['john'];
  const chores = ['wipe'];
  test('confirming form exists in DOM', () => {
    render(<Sidebar users={users} chores={chores} />);
    const formElement = screen.getByTestId('form');
    expect(formElement).toBeInTheDocument();
  });
  test('confirming dropdown renders', () => {
    render(<Sidebar users={users} chores={chores} />);
    const formElement = screen.getByTestId('list');
    expect(formElement).toHaveTextContent('Name');
  });
  test('confirming john is a name in dropdown', () => {
    render(<Sidebar users={users} chores={chores} />);
    const formElement = screen.getByTestId('list');
    expect(formElement).toHaveTextContent('John');
  });
});
