## **myFlix: A Movie Discovery SPA**

A high-performance React application that allows users to explore a rich database of movies, manage personal favorites, and customize their profile. This project showcases the evolution from a basic React setup to a professional-grade architecture.

---

### **✨ Key Features**   


* **Deep Search:** Advanced multi-parameter search filtering across Titles, Genres, Directors, and Cast members using optimized `useMemo` hook.

* **Global State Persistence:** Redux Toolkit architecture ensures search parameters and "Favorite" states persist across navigation and component unmounting.
  
* **Secure Authentication:** JWT-based login system featuring real-time password strength validation (zxcvbn) and secure visibility toggling.
  
* **Movie Discovery:** Filterable movie database with detailed director and genre views.

* **Modern Design System:** A unified, functional aesthetic with custom Glassmorphism aesthetics utilizing SCSS variables, responsive horizontal/vertical layouts, and independent column scrolling.

* **Account Management:** Full CRUD capabilities for user profiles, including real-time validation feedback and secure account deletion workflows.

---

### **🌐 Live Demo**

Live myFlix application: https://myflixclient-five.vercel.app

GitHub API Repository: https://github.com/HeatherR206/myFlix.git

#### **Test Credentials**
I encourage you to "Signup" but you may also utilize "Guest Login" to explore myFlix.
---

### **🛠️ Technical Stack & Architecture**

| Feature        | Implementation        | Why?                                                             |
| -------------- | --------------------- | ---------------------------------------------------------------- |
| **Frontend**   | React, React-Boostrap | Modular component architecture for a responsive SPA              |
| **State**      | Redux Toolkit         | Centralized "Single Source of Truth" for movie and user data.    |
| **Routing**    | React Router v6       | Optimized `NavLink` logic for active state tracking.             |
| **Styling**    | SCSS (Sass)           | Scalable design system using mixins, variables, and nested rules |
| **Security**   | Zxcvbn-style logic    | Client-side password validation with visual feedback.            |
| **Build Tool** | Parcel                | Zero-config bundling with "clean" scripts for deployment.        |
| **Dev Ops**    | Vercel & Prettier     | CI/CD automation and envorded code formatting consistency.       |

---

### **📈 Project Evolution (12/2025 - 02/2026)**

This project has undergone a significant architectural refactor to improve scalability and user experience.

| Feature              | Dec 3 (Initial Setup) | Current State                          |
| :------------------- | :-------------------- | :------------------------------------- |
| **State Management** | Local `useState`      | Redux Toolkit (Memoized Global Store)  |
| **Search Logic**     | Simple Title filter   | Multi-parameter "Deep Search"          |
| **Styling**          | Basic CSS / Bootstrap | Glassmorphism Design System (Sass)     |
| **User Interaction** | Standard Forms        | Real-time Validation & Feedback Loops  |
| **API Integration**  | Standard Fetch        | Custom `useApi` Hook & JWT Persistence |
| **Deployment**       | Localhost only        | CI/CD via Vercel and GitHub Actions    |

---

### **📂 Project Structure & Highlights**

* **Optimized Rendering:** Implementation of useMemo in high-traffic components (MainView, ProfileView) prevents unnecessary re-calculations of filtered movie arrays.
  
* **Clean API Layer:** A custom useApi hook centralizes authenticated fetch logic, error handling, and JWT header injection.

* **Global State:** The use of `/redux` manages movie data and user favorites across the app.

* **Scalable SCSS Architecture:** Modular style system where variables.scss dictates the brand identity, while component-specific styles are encapsulated within their respective directories.

* **Responsive Layout Ordering:** Implementation of Bootstrap’s order utilities to prioritize high-interaction features (Search and Favorites) on mobile viewports while maintaining a professional side-by-side dashboard on desktop.

* **Visual Consistency Logic:** Precise SCSS border-radius and flexbox alignment to ensure seamless image-to-text transitions across dynamic card orientations (Horizontal vs. Vertical).

* **Robust Feedback Loops:** Integration of character counters, password meters, and modal confirmations to ensure a "human-first" user experience.


#### **Project Structure**

```text
src/
├── components/                 # UI Components (Login, MovieView, Signup, etc.)
│   └── [Component]/            # Component-specific logic and style
│       ├── [Component].jsx
│       └── [Component].scss
├── hooks/
│   └── useApi.js               # Centralized API logic and Custom Auth Hooks
├── redux/
│   ├── reducers/               # Redux Toolkit Slices (User/Movies)               
│   └── store.js                # Global State "Single Source of Truth"
├── styles/                     # SCSS Design System
│   ├── variables.scss          # Brand colors and theme overrides
│   └── style.scss              # Global entry point and layout rules
├── config.js                   # Centralized API_URL and environment settings
└── index.jsx                   # Application entry point

```

---

### **🚀 Getting Started**

#### **1. Prerequisites**

* **Node.js** (LTS)
* **A running instance of myFlix API** (The backend server)

#### **2. Installation**

```bash
git clone https://github.com/HeatherR206/myFlixClient.git
cd myFlixClient
npm install

```

#### **3. Environmental Configuration**

Create a `.env` file in the root directory.
Note: For Parcel to pick these up, you need to prefix them or ensure they are defined during the build.

```text
API_URL=http://localhost:8080

```

#### **4. Run Development**

```bash
npm start
# The app will launch at http://localhost:1234 (Parcel)

```

---


### **📚 References & Documentation**

Please refer to the official documentation for information on the core technologies used in this project:

* **Frontend Architecture:** [React 18+](https://react.dev/)

* **Global State:** [Redux Toolkit](https://redux-toolkit.js.org/)

* **Styling & UI:** [SASS/SCSS](https://sass-lang.com/documentation/) & [Bootstrap 5](https://getbootstrap.com/docs/5.0/getting-started/introduction/)

* **Icons:** [Bootstrap Icons](https://icons.getbootstrap.com/)

* **Build Tooling:** [Parcel](https://parceljs.org/)

* **Deployment:** [Vercel](https://vercel.com/docs)

---

### **Contact**

**Heather Ricarte** - [ricarte.heather@gmail.com](mailto:ricarte.heather@gmail.com)


#### **📜 License**
Distributed under the MIT License. See `LICENSE` for more information.


#### **🤝 How to Contribute**
I am always looking to improve myFlix! If you have suggestions for new features, UI improvements, or bug fixes, feel free to contribute:

1. **Fork the Project**
2. **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the Branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

For major changes, please open an issue first to discuss what you would like to change.

---
