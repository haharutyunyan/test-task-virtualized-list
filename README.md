# Masonry Grid Project

## Introduction
This project implements a virtualized masonry grid with dynamic heights using Next.js. Below is a detailed breakdown of the decisions and technologies used in this project.

## Key Features

1. **Framework Choice:**
   As the requirement was React, I decided to use Next.js. This allows me to demonstrate my React skills while showcasing Next.js capabilities. Next.js is also recommended by the React team for building performant applications.

2. **Data Fetching with Unsplash API:**
   I used the SWR package for fetching data from the Unsplash API. SWR provides built-in caching and handles infinite scrolling logic efficiently, making it an ideal choice for this project.

3. **Optimized Images:**
   For displaying images, I used the Next.js `Image` component. This component is optimized for caching, SEO, and responsive design, which enhances the overall performance and accessibility of the application.

4. **Masonry Grid Layout:**
   I implemented the masonry grid layout using CSS Grid. The grid adapts dynamically to window sizes:
    - **3 columns** for large screens
    - **2 columns** for laptops
    - **1 column** for mobile devices

5. **Virtualized Rendering Logic:**
   To handle virtualized rendering, I chose a dynamic height approach while keeping the grid columns static for different screen sizes. Only the images in the visible viewport are rendered to optimize performance.

6. **Position Calculation:**
   I calculated the maximum height for each row and created a `positions` array that stores these heights. Each subsequent value in the array is the sum of the previous value and the current max height. This helps in determining the scroll position and rendering the correct images.

7. **Scroll Handling:**
   I used `requestAnimationFrame` to handle scrolling efficiently. The `translateY` CSS property is applied to shuffle the visible items as the user scrolls. Since the `positions` array is sorted in ascending order, I used binary search to quickly find the first and last visible elements. `useMemo` is used to memoize the visible photos array, optimizing re-renders as the scroll position changes.

8. **Infinite Scroll:**
   When the last image is rendered, SWR automatically triggers a new request to fetch more images from the Unsplash API, ensuring continuous scrolling without page reloads.

9. **Basic Unit Tests:**
   I implemented basic unit tests using Jest to demonstrate testing capabilities. These tests focus on key aspects of the functionality.

10. **Environment Variables:**
    I created an `env.example` file where you can find the Unsplash API access key, which you'll need to run the project.

11. **Live Demo:**
    The project has been deployed on Vercel for easier testing and demonstration. You can check it out here: [Live Demo](https://test-task-virtualized-list.vercel.app/).

12. **Room for Improvement:**
    There is always room for improvement in the codebase. I'd be happy to discuss potential enhancements during the interview if we decide to move forward.

## How to Run the Project
1. Clone the repository.
2. Install dependencies: `npm install` or `yarn install`.
3. Add your Unsplash API key to the `.env` file using the example provided.
4. Run the development server: `npm run dev` or `yarn dev`.
5. Open [http://localhost:3000](http://localhost:3000) to view the project.

## Conclusion
This project demonstrates my understanding of React, Next.js, SWR, and optimization techniques for creating a high-performance masonry grid layout with virtualized rendering. Please feel free to reach out if you'd like to discuss any aspect of the code or project further!