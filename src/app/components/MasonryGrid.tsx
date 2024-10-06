"use client";

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { useFetchPhotos } from "../hooks/useFetchPhotos";
import {
  Container,
  ImageWrapper,
  LoadingText,
  MasonryGridContainer,
  MasonryGridItem,
  SearchInput,
  StickySearchWrapper,
} from "../styles/masonry.styles";
import Image from "next/image";
import { UnsplashPhoto } from "@/app/types";
import useScrollAware from "@/app/hooks/useScrollAware";
import { findEndNode, findStartNode } from "@/app/helpers/findNode";
import useWindowResize from "@/app/hooks/useWindowResize";
import { GRID_AUTO_ROWS, GRID_ITEM_HEIGHT_DIVISOR } from "@/app/constants";
// @ts-ignore
import debounce from "lodash.debounce";
import Link from "next/link";
const MasonryGrid: React.FC = () => {
  const [query, setQuery] = useState<Readonly<string>>("");
  const [searchTerm, setSearchTerm] = useState(""); // State for debounced search term

  const url = searchTerm ? "search/photos" : "photos";
  const { photos, isLoading, setSize } = useFetchPhotos(url, searchTerm);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPhotoRef = useRef<HTMLDivElement | null>(null);
  const visiblePhotosRef = useRef<UnsplashPhoto[] | []>([]);
  const [scrollOffset, setScrollOffset] = useState(0);
  const gridColumn = useWindowResize();

  const allPhotos = useMemo(() => {
    if (url === "search/photos") {
      return (
        photos
          ?.flat()
          .map((obj) => obj.results)
          .flat() || []
      );
    }
    return photos?.flat() || [];
  }, [photos]);

  const rowPositions = useMemo(() => {
    const sizes = [0];
    let maxHeight = 0;
    const gap = 20;
    allPhotos.forEach((photo, index) => {
      maxHeight = Math.max(
        maxHeight,
        (photo.height * GRID_AUTO_ROWS) / GRID_ITEM_HEIGHT_DIVISOR,
      );
      if (index !== 0 && index % gridColumn === 0) {
        const lastItemSize = sizes[sizes.length - 1];
        sizes.push(lastItemSize + gap + maxHeight);
        maxHeight = 0;
      }
    });
    return sizes;
  }, [allPhotos, gridColumn]);

  const [scrollTop, gridRef] = useScrollAware();
  const lastPhotoId = allPhotos[allPhotos.length - 1]?.id;
  const totalHeight =
    rowPositions[
      rowPositions.length -
        1 +
        (allPhotos[allPhotos.length - 1]?.height * GRID_AUTO_ROWS) /
          GRID_ITEM_HEIGHT_DIVISOR
    ];

  useEffect(() => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(
      (entries) => {
        // if (entries[0].isIntersecting) {
          setSize((prev) => prev + 1);
        // }
      },
      { threshold: 1 },
    );

    if (lastPhotoRef.current) {
      observer.current.observe(lastPhotoRef.current);
    }
  }, [isLoading, lastPhotoRef.current]);

  const visiblePhotos = useMemo(() => {
    if (!gridRef || rowPositions.length === 1) {
      return visiblePhotosRef.current;
    }
    const startNode = findStartNode(scrollTop, rowPositions, allPhotos.length);
    const endNode = findEndNode(rowPositions, startNode, allPhotos.length, 900);

    if (rowPositions[startNode] !== scrollOffset) {
      setScrollOffset(rowPositions[startNode]);
    }

    visiblePhotosRef.current = allPhotos.slice(
      startNode * gridColumn,
      endNode * gridColumn,
    );
    return visiblePhotosRef.current;
  }, [scrollTop, allPhotos]);


  const handleSearch = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
      setSize(1);
    }, 500),
    [],
  );

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    handleSearch(event.target.value);
  };

  return (
    <>
      <StickySearchWrapper>
        <SearchInput
          type="text"
          placeholder="Search Unsplash..."
          value={query}
          onChange={onSearchChange}
        />
      </StickySearchWrapper>
      <Container ref={gridRef}>
        <MasonryGridContainer height={totalHeight} offset={scrollOffset}>
          {visiblePhotos.map((photo) => {
            const isLastPhoto = photo.id === lastPhotoId;
            return (
              <MasonryGridItem
                divisor={GRID_ITEM_HEIGHT_DIVISOR}
                height={photo.height}
                key={photo.id}
                ref={(element) => {
                  if (isLastPhoto) lastPhotoRef.current = element;
                }}
              >
                <Link href={`/${photo.id}`}>
                  <ImageWrapper>
                    <Image
                      src={photo.urls.regular}
                      alt={`Photo by ${photo.user.name}`}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL={photo.urls.thumb}
                      priority
                    />
                  </ImageWrapper>
                </Link>
              </MasonryGridItem>
            );
          })}
          {isLoading && <LoadingText>Loading...</LoadingText>}
        </MasonryGridContainer>
      </Container>
    </>
  );
};

export default MasonryGrid;
