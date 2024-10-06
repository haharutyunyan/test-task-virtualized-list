import styled from "styled-components";

export const Container = styled.div`
  height: 900px;
  overflow: auto;
`;
export const MasonryGridContainer = styled.div<{
  height: number;
  offset: number;
}>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 10px;
  grid-auto-rows: 10px;
  height: ${({ height }) => `${height}px`};
  transform: translateY(${({ offset }) => `${offset}px`});
  position: relative;
  overflow: hidden;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const MasonryGridItem = styled.div<{
  height: number;
  divisor: number;
}>`
  grid-row-end: span
    ${({ height, divisor }) => Math.ceil(height / divisor)};
  overflow: hidden;
  border-radius: 10px;
  transition: transform 0.3s;
  position: relative;
`;

export const LoadingText = styled.p`
  text-align: center;
  font-size: 16px;
  color: #999;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  img {
    object-fit: cover;
  }
`;

export const StickySearchWrapper = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;
  padding: 20px 0; /* Add padding for spacing */
  background-color: #fff;
  display: flex;
  justify-content: center; /* Center the input horizontally */
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for separation */

  @media (prefers-color-scheme: dark) {
    background-color: #333;
    box-shadow: 0 2px 4px rgba(255, 255, 255, 0.1); /* Adjust shadow for dark mode */
  }
`;

export const SearchInput = styled.input`
  width: 50%; /* Input width adjusted to 50% of the page */
  max-width: 500px; /* Set a max width */
  min-width: 250px; /* Set a minimum width */
  padding: 12px 20px; /* Add more padding inside the input */
  border: 1px solid #ddd;
  background-color: #fff;
  color: #000;
  border-radius: 25px; /* Rounded corners for a nicer look */
  font-size: 16px;
  transition: border-color 0.3s ease; /* Smooth transition on focus */

  ::placeholder {
    color: #888;
  }

  &:focus {
    outline: none;
    border-color: #000; /* Darker border on focus */
  }

  @media (prefers-color-scheme: dark) {
    border: 1px solid #555;
    background-color: #333;
    color: #fff;

    ::placeholder {
      color: #bbb;
    }

    &:focus {
      border-color: #fff;
    }
  }
`;
