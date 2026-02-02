## **myFlix: A Movie Discovery SPA**

A high-performance React application that allows users to explore a rich database of movies, manage personal favorites, and customize their profile. This project showcases the evolution from a basic React setup to a professional-grade architecture.

---

### **✨ Key Features**

* **Dynamic Movie Discovery:** Responsive dual-layout (Grid/Horizontal) browsing with high-end Glassmorphic UI elements.

* **Global State Management:** Centralized Redux Toolkit store for lag-free searching and real-time "Favorite" 
synchronization. 

* **Advanced UI/UX:** Custom SCSS design system featuring real-time password strength validation and reactive form fields with "glow" effects. 

* **Secure Auth:** Full JWT-based authentication flow integrated with a custom `useApi` hook for seamless session management.

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

| Feature        | Implementation     | Why?                                                        |
| -------------- | ------------------ | ----------------------------------------------------------- |
| **Frontend**   | React 18+          | Component-based modularity.                                 |
| **State**      | Redux Toolkit      | "Single Source of Truth" for movie/user data.               |
| **Styling**    | SCSS / Bootstrap 5 | Variables and nesting for a maintainable design system.     |
| **Icons**      | Bootstrap Icons    | Interactive states (e.g., heart icons) for visual feedback. |
| **Deployment** | Vercel (CI/CD)     | Automated pipeline from GitHub to Production.               |

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
├── components/                 # UI Components (Login, MovieView, Signup)
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
