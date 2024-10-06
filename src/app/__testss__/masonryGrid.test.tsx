import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MasonryGrid from '@/app/components/MasonryGrid';
import { useFetchPhotos } from '@/app/hooks/useFetchPhotos';
import debounce from 'lodash.debounce';

jest.mock('@/app/hooks/useFetchPhotos');
jest.mock('lodash.debounce');
jest.mock("next/image", () => ({
  __esModule: true,
  default: (
    props: React.JSX.IntrinsicAttributes &
      React.ClassAttributes<HTMLImageElement> &
      React.ImgHTMLAttributes<HTMLImageElement>,
  ) => {
    return <img {...props} />;
  },
}));
describe('MasonryGrid Component', () => {
  const mockPhotos = [
    {
      id: '1',
      urls: { regular: 'photo1.jpg', thumb: 'photo1-thumb.jpg' },
      user: { name: 'User 1' },
      height: 1000,
      width: 800,
    },
    {
      id: '2',
      urls: { regular: 'photo2.jpg', thumb: 'photo2-thumb.jpg' },
      user: { name: 'User 2' },
      height: 1000,
      width: 800,
    },
  ];

  beforeEach(() => {
    (useFetchPhotos as jest.Mock).mockReturnValue({
      photos: [mockPhotos],
      isLoading: false,
      setSize: jest.fn(),
    });

    (debounce as jest.Mock).mockImplementation((fn) => fn);
  });

  it('should render the search input', () => {
    render(<MasonryGrid />);
    const searchInput = screen.getByPlaceholderText('Search Unsplash...');
    expect(searchInput).toBeInTheDocument();
  });

  it('should handle search input and trigger search functionality', async () => {
    render(<MasonryGrid />);

    const searchInput = screen.getByPlaceholderText('Search Unsplash...');

    fireEvent.change(searchInput, { target: { value: 'nature' } });

    await waitFor(() => {
      expect(searchInput).toHaveValue('nature');
      expect(useFetchPhotos).toHaveBeenCalledWith('search/photos', 'nature');
    });
  });



  it('should show loading text when loading photos', () => {
    (useFetchPhotos as jest.Mock).mockReturnValue({
      photos: [],
      isLoading: true,
      setSize: jest.fn(),
    });

    render(<MasonryGrid />);

    const loadingText = screen.getByText('Loading...');
    expect(loadingText).toBeInTheDocument();
  });
});