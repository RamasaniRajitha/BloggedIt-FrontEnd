/** @jest-environment jsdom */
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import Blog from '../components/Blogs/Blog/Blog'; // Update the import path accordingly
import { Provider } from 'react-redux'; // Assuming you use Redux
import configureStore from 'redux-mock-store';

// Mock dependencies
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('Blog Component', () => {
  const mockStore = configureStore();
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mock('react-redux', () => ({
      ...jest.requireActual('react-redux'),
      useDispatch: () => mockDispatch,
    }));
  });

  test('renders blog correctly', () => {
    const blog = {
      _id: '1',
      name: 'John Doe',
      createdAt: new Date().toISOString(),
      title: 'Sample Title',
      tags: ['tag1', 'tag2'],
      message: 'This is a sample blog message.',
      likes: [],
      creator: 'user123',
    };

    const { container, getByText } = render(
      <Provider store={mockStore()}>
        <Blog blog={blog} setCurrentId={() => {}} setDisplayForm={() => {}} />
      </Provider>
    );

    // Add more assertions based on your component structure
    expect(container).toMatchSnapshot();
    expect(screen.getByText('Sample Title')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  // Add more tests based on your component's behavior
});
