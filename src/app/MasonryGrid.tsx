"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFetchPhotos } from "./hooks/useFetchPhotos";
import {
  Container,
  ImageWrapper,
  LoadingText,
  MasonryGridContainer,
  MasonryGridItem,
} from "./styles/masonry.styles";
import Image from "next/image";
import { UnsplashPhoto } from "@/app/types";
import useScrollAware from "@/app/hooks/useScrollAware";
import { findEndNode, findStartNode } from "@/app/helpers/find-node";
import useWindowResize from "@/app/hooks/useWindowResize";
import { GRID_AUTO_ROWS, GRID_ITEM_HEIGHT_DIVISOR } from "@/app/constants";

const MasonryGrid: React.FC = () => {
  const [page, setPage] = useState(1);
  const { photos, isLoading, setSize } = useFetchPhotos();
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPhotoRef = useRef<HTMLDivElement | null>(null);
  const visiblePhotosRef = useRef<UnsplashPhoto[] | []>([]);
  const [scrollOffset, setScrollOffset] = useState(0);
  const gridColumn = useWindowResize();

  const allPhotos = useMemo(() => {
    console.log("all photos updated");
    return photos?.flat() || [];
  }, [photos]);

  const rowPositions = useMemo(() => {
    const sizes = [0];
    let maxHeight = 0;
    const gap = 20;
    allPhotos.forEach((photo, index) => {
      debugger;
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
        console.log("Intersecting...");
        setPage((prevPage) => prevPage + 1);
        setSize((prev) => page + 1);
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
  }, [scrollTop, allPhotos]) as UnsplashPhoto[];

  return (
    <Container ref={gridRef}>
      <MasonryGridContainer height={totalHeight} translateY={scrollOffset}>
        {visiblePhotos.map((photo) => {
          const isLastPhoto = photo.id === lastPhotoId;
          return (
            <MasonryGridItem
              divisor={GRID_ITEM_HEIGHT_DIVISOR}
              // height={gridItemHeight}
              absHeight={photo.height}
              key={photo.id}
              ref={(element) => {
                console.log(isLastPhoto, "isLastPhoto", photo.id);
                if (isLastPhoto) lastPhotoRef.current = element;
              }}
            >
              <ImageWrapper>
                <Image
                  src={photo.urls.regular}
                  alt={`Photo by Unsplash`}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL={photo.urls.thumb}
                  priority
                />
              </ImageWrapper>
            </MasonryGridItem>
          );
        })}
        {isLoading && <LoadingText>Loading...</LoadingText>}
      </MasonryGridContainer>
    </Container>
  );
};

export default MasonryGrid;
