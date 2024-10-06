import styled from "styled-components";
import Link from "next/link";

export const PhotoDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  min-height: 100vh;

  @media (prefers-color-scheme: dark) {
    background-color: #222;
  }
`;

export const BackButton = styled(Link)`
  align-self: flex-start;
  margin-bottom: 20px;
  font-size: 18px;
  color: #0070f3;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const PhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PhotoInfo = styled.div`
  margin-top: 20px;
  text-align: center;
  color: #333;

  @media (prefers-color-scheme: dark) {
    color: #ddd;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

export const Photographer = styled.h3`
  font-size: 18px;
  margin-bottom: 5px;
  color: #555;

  @media (prefers-color-scheme: dark) {
    color: #aaa;
  }
`;

export const DateTaken = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
  color: #888;

  @media (prefers-color-scheme: dark) {
    color: #bbb;
  }
`;

export const Description = styled.p`
  font-size: 16px;
  max-width: 600px;
  line-height: 1.6;
  color: #444;

  @media (prefers-color-scheme: dark) {
    color: #ccc;
  }
`;