import styled from "styled-components";

export const Container = styled.div`
  height: 900px;
  overflow: auto;
`;
export const MasonryGridContainer = styled.div<{
  height: number;
  translateY: number;
}>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 10px;
  grid-auto-rows: 10px;
  height: ${({ height }) => `${height}px`};
  transform: translateY(${({ translateY }) => `${translateY}px`});
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
  absHeight: number;
  divisor: number;
}>`
  grid-row-end: span
    ${({ absHeight, divisor }) => Math.ceil(absHeight / divisor)};
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
