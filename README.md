## **myFlix: A Movie Discovery SPA**

A high-performance React application that allows users to explore a rich database of movies, manage personal favorites, and customize their profile. This project showcases the evolution from a basic React setup to a professional-grade architecture.

---

### **✨ Key Features**   


* **Authentication:** User signup/login with JWT-based persistence.
  
* **Password Security:** Real-time strength validation and visibility toggling.
  
* **Movie Discovery:** Filterable movie database with detailed director and genre views.

* **Global State Management:** Centralized Redux Toolkit store for lag-free searching and real-time "Favorite" 
synchronization. 

* **Responsive UI/UX:** A unified, functional aesthetic using Glassmorphism design, interactive components horizontal/vertical layouts, and independent column scrolling. 

* **Account Management:** User profile updates and secure account deletion with modal confirmation.

---

### **🌐 Live Demo**

Live myFlix application: https://myflixclient-five.vercel.app

GitHub API Repository: https://github.com/HeatherR206/myFlix.git

#### **Test Credentials**
I encourage you to "Signup" but you can also explore myFlix as a "Guest":
*
**Username:** `myFlixGuest`
**Password:** `myFlixGuest8647!`

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

### **📈 Project Evolution (12/2025 - 01/2026)**

This project has undergone a significant architectural refactor to improve scalability and user experience.

| Feature              | Dec 3 (Initial Setup) | Current State                                        |
| :------------------- | :-------------------- | :--------------------------------------------------- |
| **State Management** | Local `useState`      | Redux Toolkit (Global Store)                         |
| **Styling**          | Basic CSS / Bootstrap | Modular SCSS with Glassmorphism and custom variables |
| **User Interaction** | Basic login           | User Dashboard & Favorite Movie Sync                 |
| **UX Design**        | Text/Emoji Icons      | Bootstrap Icons & Real-time Validation               |
| **API Integration**  | Standard Fetch        | Custom `useApi` Hook & JWT Auth                      |
| **Deployment**       | Localhost only        | Live Production via Vercel and GitHub                |

---

### **📂 Project Structure & Highlights**

* **Centralized API Logic:** The custom `useApi` hook handles all authenticated fetch logic (headers and error states) in one place.
* **Global State:** The use of `/redux` manages movie data and user favorites across the app.

* **Responsive Design System:** SASS variables (`variables.scss`) enable glassmorphism, mixins, and modular styling. **Bootstrap Grid** ensures the form inputs are visually organized across mobile and desktop and eliminates the "staircase" effect in forms.

* **User Feedback Tools:** Real-time **Password Strength Meter** and interactive heart icons for favorites.


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

Create a `.env` file in the root directory:

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
