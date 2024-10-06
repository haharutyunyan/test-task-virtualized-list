import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PhotoDetails from "@/app/components/PhotoDetails";
import { UnsplashPhoto } from "@/app/types";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));
const mockPhoto: UnsplashPhoto = {
  id: "1",
  created_at: "2024-10-06T10:00:00Z",
  width: 1200,
  height: 800,
  description: "A beautiful landscape",
  alt_description: "alt description",
  urls: {
    full: "https://example.com/photo-full.jpg",
    thumb: "https://example.com/photo-thumb.jpg",
    regular: "https://example.com/photo-regular.jpg",
    small: "https://example.com/photo-small.jpg",
  },
  user: {
    name: "John Doe",
  },
};

describe("PhotoDetails Component", () => {
  it("renders the back button", () => {
    render(<PhotoDetails photo={mockPhoto!} />);
    const backButton = screen.getByText(/← Back to Grid/i);
    expect(backButton).toBeInTheDocument();
  });

  it("displays the photo with correct alt text", () => {
    render(<PhotoDetails photo={mockPhoto} />);
    const image = screen.getByAltText(/Photo by John Doe/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockPhoto.urls.full);
  });

  it("displays the title, photographer, and date taken", () => {
    render(<PhotoDetails photo={mockPhoto} />);
    const title = screen.getByText(/A beautiful landscape/i);
    const photographer = screen.getByText(/By John Doe/i);
    const dateTaken = screen.getByText("10/6/2024");

    expect(title).toBeInTheDocument();
    expect(photographer).toBeInTheDocument();
    expect(dateTaken).toBeInTheDocument();
  });

  it("renders the description if present", () => {
    render(<PhotoDetails photo={mockPhoto} />);
    const description = screen.getByText(/A beautiful landscape/i);
    expect(description).toBeInTheDocument();
  });

  it('renders "Untitled" when description is missing', () => {
    const photoWithoutDescription = {
      ...mockPhoto,
      description: "",
    };

    render(<PhotoDetails photo={photoWithoutDescription} />);
    const title = screen.getByText(/Untitled/i);
    expect(title).toBeInTheDocument();
  });
});
