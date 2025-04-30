# NbrhdWatch - Community Safety Platform

NbrhdWatch is a web application designed to connect neighbors and enhance community safety through communication and information sharing. Built with React and Vite, it provides a platform for reporting incidents, receiving alerts, participating in discussions, and staying informed about local events.

## Features

*   **Public Landing Page:** Introduces the platform and its key features to potential users.
*   **Member Landing Page:** Dashboard for registered users displaying recent activity, message boards, incident map (placeholder), safety tips, and quick actions.
*   **Incident Reporting:** Allows members to report incidents with details like type, location, time, and description.
*   **Alert System:** Displays important alerts pushed by administrators.
*   **Message Boards:** Provides forums for community discussions categorized by topic.
*   **Blog Section:** Displays recent news or announcements from administrators.
*   **User Authentication:** Basic login/signup functionality (using Context API for state management).
*   **Admin Preview Page:** A dedicated section for administrative tasks (currently placeholder).
*   **Responsive Design:** User interface adapts to different screen sizes using Material UI.

## Technologies Used

*   **Frontend Framework:** React
*   **Build Tool:** Vite
*   **UI Library:** Material UI (MUI)
*   **Routing:** React Router
*   **State Management:** React Context API
*   **Unique IDs:** `uuid` library
*   **Linting/Formatting:** ESLint (configured via `eslint.config.js`)

## Getting Started

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm (usually comes with Node.js)

### Installation

1.  Clone the repository:
    ```bash
    git clone <your-repository-url>
    cd nbrhdwatch
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

1.  Start the Vite development server:
    ```bash
    npm run dev
    ```
2.  Open your browser and navigate to `http://localhost:5173` (or the port specified in the output).

## Future Development (Potential Features)

*   Real-time updates for messages and alerts (e.g., using WebSockets).
*   Backend integration with a database (e.g., Firebase, Supabase, custom Node.js/Express API).
*   Full user authentication and authorization.
*   Incident map integration (e.g., using Leaflet or Google Maps API).
*   Push notifications for alerts.
*   File uploads for incident reports.
*   Enhanced admin panel for user management, content moderation, and alert pushing.
*   Member directory with privacy controls.
*   Event calendar integration.
