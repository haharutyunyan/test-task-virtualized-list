"use client";
import React from "react";
import Image from "next/image";
import {
  BackButton,
  PhotoContainer,
  PhotoDetailsWrapper,
  PhotoInfo,
  Title,
  Photographer,
  DateTaken,
  Description,
} from "@/app/styles/photoDetails.styles";
import { UnsplashPhoto } from "@/app/types";

interface PhotoDetailsProps {
  photo: UnsplashPhoto;
}

const PhotoDetails: React.FC<PhotoDetailsProps> = ({ photo }) => {
  const { urls, user, created_at, description, alt_description } = photo;
const aspectRatio = photo.width / photo.height;
  return (
    <PhotoDetailsWrapper>
      <BackButton href="/">← Back to Grid</BackButton>
      <PhotoContainer>
        <Image
          src={urls.full}
          alt={`Photo by ${photo.user.name}`}
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
          width={1000}
          height={1000 * aspectRatio}
          placeholder="blur"
          blurDataURL={photo.urls.thumb}
          priority
        />
        <PhotoInfo>
          <Title>{description || "Untitled"}</Title>
          <Photographer>By {user.name}</Photographer>
          <DateTaken>{new Date(created_at).toLocaleDateString()}</DateTaken>
          {alt_description && <Description>{alt_description}</Description>}
        </PhotoInfo>
      </PhotoContainer>
    </PhotoDetailsWrapper>
  );
};

export default PhotoDetails;
