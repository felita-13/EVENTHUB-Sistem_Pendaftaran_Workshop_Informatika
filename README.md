# EVENTHUB - Informatics Workshop Registration System

**Author:** Felita  
**NIM:** 03082240005  
**Course:** Web Programming Midterm Project (UTS)  

---

## 1. Web Architecture Concept: Browser -> Web Server -> Response

The interaction flow between the client browser and web server operates through three main phases:

1. **Client Request (Browser):**  
   The user enters a URL or opens `index.html` in a web browser. The browser constructs and sends an **HTTP GET Request** across the network to the Web Server hosting the site.

2. **Server Processing (Web Server):**  
   The Web Server receives the incoming HTTP Request, resolves the file path, and retrieves the static resources (`index.html`, `style.css`, `script.js`, image assets) stored within the server directory.

3. **HTTP Response & Rendering:**  
   The Web Server packages the requested files into an **HTTP Response** (with a `200 OK` status code) and sends it back to the client. The browser parses the HTML structure, applies layout styles from CSS, and executes JavaScript to enable dynamic, real-time interactive DOM updates without full page reloads.

---

## 2. Project Directory Structure

```text
03082240005_Felita_UTSWeb/
├── .git/                  # Git repository metadata & commit history
├── index.html             # Semantic HTML5 page layout & registration form
├── style.css              # Custom black-and-white minimalist CSS styling
├── script.js             # JavaScript DOM manipulation, validation & price calculation
├── README.md              # Project documentation & web architecture explanation
├── git-log.pdf            # PDF evidence of git commit log history (`git log --oneline`)
└── screenshot.pdf         # Captured screenshots of desktop, mobile, form, and JS summary