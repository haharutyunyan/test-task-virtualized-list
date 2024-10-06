export interface UnsplashPhoto {
  id: string;
  urls: {
    small: string;
    regular: string;
    thumb: string;
  };
  width: number;
  height: number;
}
