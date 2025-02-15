# Stock Data Processing Application

This project is built using **Next.js**, **Tailwind CSS**, and **TypeScript**. It provides a complete solution for uploading, processing, and visualizing stock and financial data via Excel templates and Google Spreadsheets. The application is designed to meet the assignment requirements with robust backend processing, real-time updates, and interactive charts.

## Features

- **Next.js API Server**  
  All business logic and data processing is handled in the Next.js API server. This includes parsing the uploaded Excel files, validating data, and saving the data into Google Spreadsheets.

- **Tailwind CSS**  
  The application uses Tailwind CSS for rapid and responsive UI development.

- **TypeScript**  
  The entire codebase is developed in TypeScript to ensure type safety and improved maintainability.

- **Excel Template Upload**  
  A template Excel file is provided in the `template` folder for users to upload data. The application processes the Excel file in the backend, validates the data, and renders the results on the website.

- **Multiple Sheets for Data Population**  
  The provided Excel file contains **9 sheets** (each corresponding to a different table). For example:

  - For populating the **Income Statement**, the application uses two sheets: **P&L Statement** and **Financial Ratios**.
  - For the **Balance Sheet**, the application uses the **Assets** and **Liabilities** sheet.
  - For the **Cash Flow Statement**, the application uses the **Cash Flow** sheet.
  - For the **Shareholding Pattern**, the application uses the **Shareholding Pattern** sheet.
  - For the **Management**, the application uses the **Management** sheet.
  - For the **Fundamentals**, the application uses the **Fundamentals** sheet.
  - For the **Share Chart**, the application uses the **Stock Price** sheet.

  - Each sheet is expected to have a specific format and column order. The validation logic ensures that each sheet contains at least one valid column and that the column order matches expectations. If any discrepancies are found (e.g., wrong column order or empty sheet), the application will skip those columns and issue appropriate warnings.

- **Google Spreadsheet Integration**  
  Once the data is validated and processed, it is saved to Google Spreadsheets for later use. A separate sheet is maintained for capturing real-time interest form responses as mentioned in the assignment. There is also a dedicated **Upload** tab where analysts can upload the Excel template file.

- **Interactive Charts**  
  The application includes charts that display stock price data. Users can switch between three time frames:

  - **Daily**
  - **Weekly**
  - **Monthly**  
    The chart renders accordingly based on the selected time frame.

- **State Management with Zustand**  
  The latest share price, along with its change and delta percentage, is managed via Zustand. This state is passed across multiple components to ensure that the share price is consistently displayed throughout the application.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Sheets API credentials

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables:**

   Create a `.env.local` file in the root of the project and add your configuration variables (e.g., Google Sheets API credentials, etc.).

4. **Run the Development Server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open the Application:**

   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- **/app/api**: Contains Next.js API routes for handling Excel file processing, data validation, and saving data to Google Sheets.
- **/template**: Contains the Excel template file that users can download and use to upload their data.
- **/components**: Contains React components including chart components and state management via Zustand.
- **/constants**: Contains constant data which i using in the application ike country dial code data, blog and faq related data.
- **/hooks**: Contains custom hooks for that help use to separate the logic from UI.
- **/schemas**: Contains Zod validation schemas for validating the form data.
- **/store**: Contains Zustand store for managing the latest stock price data.
- **/utils**: Contains utility functions for processing data, handling Google Sheets API, and other helper functions.

## How It Works

1. **Excel File Upload:**

   - Analysts upload an Excel file using the provided template.
   - The file is processed in the Next.js API client where the **xlsx** library is used to parse the data.
   - Validation ensures that each sheet contains at least one valid row and the columns are in the correct order. If the order is incorrect or a sheet is empty, warnings are issued and that data is skipped and for we displaying the toaster.

2. **Data Processing & Storage:**

   - The validated data is then saved to specific Google Spreadsheet sheets based on the type of data.
   - This includes sheets for assets, liabilities, cash flow, shareholding patterns, management, fundamentals, and stock prices.
   - Real-time responses from the interest form are also captured in a dedicated sheet.

3. **Chart Rendering:**
   - The application renders interactive charts that allow users to switch between daily, weekly, and monthly views.
   - The chart component uses state management (via Zustand) to display the latest stock price across different parts of the UI.

## Technologies Used

- **Next.js**: React framework for server-side rendering and API routes.
- **Tailwind CSS**: Utility-first CSS framework.
- **TypeScript**: For type safety and robust code.
- **xlsx**: Library for parsing and processing Excel files.
- **Google Sheets API**: For saving and managing data in Google Spreadsheets.
- **Zustand**: State management for React.
- **React Toastify**: For displaying toasts and notifications.
- **Axios**: For making HTTP requests.
- **React ApexCharts**: For rendering interactive charts.
- **Zod**: For data validation schemas.
- **React Hook Form**: For managing form state and validation.

# Google Sheet URL

> This URL points to the Google Sheet where user interest form responses are captured in real-time. It serves as a live storage for all submissions, ensuring that each response is immediately recorded and available for subsequent review and processing. [here](https://docs.google.com/spreadsheets/d/1InQMJbKVJVSYNh0KL7rkbuzy0Ad1ReeV5TnvcoaO2yg/edit?usp=sharing)
