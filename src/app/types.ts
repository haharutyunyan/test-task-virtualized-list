export interface UnsplashPhoto {
  id: string;
  user:{name: string}
  created_at: string;
  description: string;
  alt_description: string;
  urls: {
    full:string;
    small: string;
    regular: string;
    thumb: string;
  };
  width: number;
  height: number;
}
