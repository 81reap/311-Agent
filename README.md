# 311 Agent 🤖

<p align="center">
  <img src="./pwa/public/logo.svg" alt="311 Agent Logo" width="200"/>
</p>

<p align="center">
  <strong>An AI-powered Progressive Web App to streamline 311 service requests.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
  <img src="https://img.shields.io/badge/React-19-blue?logo=react&logoColor=white" alt="React 19">
  <img src="https://img.shields.io/badge/Vite-Powered-yellowgreen?logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Hugging_Face-Transformers.js-yellow?logo=huggingface&logoColor=white" alt="Transformers.js">
</p>

---

## 🌟 Overview

311 Agent is a modern, responsive web application designed to simplify the process of reporting non-emergency civic issues. By leveraging on-device AI, users can simply snap a photo of a problem (like a pothole or overflowing trash can), and the AI agent will analyze the image, categorize the issue, and initiate a report through a conversational chat interface.

This project runs a powerful multi-modal vision model (`Moondream2`) directly in the user's browser, ensuring privacy and a fast, seamless experience without any server-side processing for the AI analysis.

## ✨ Key Features

*   **📸 AI-Powered Image Analysis**: Uses the `Moondream2` model via `Transformers.js` to analyze user-submitted photos and identify the type of 311 complaint.
*   **💬 Conversational UI**: A chat-based interface allows users to interact with the AI, provide additional details, and confirm the report, making the process intuitive.
*   **🚀 Progressive Web App (PWA)**: Fully installable on any device with offline capabilities, ensuring reports can be drafted anytime and sent when reconnected.
*   **🌐 Geolocation & Network Awareness**: Automatically detects and attaches the user's location to the report and provides real-time feedback on network status.
*   **🔒 Privacy-First**: All AI processing happens client-side in a Web Worker. User images are never sent to a server for analysis.
*   **📱 Responsive Design**: A clean, mobile-first interface built with Tailwind CSS and DaisyUI that works beautifully on all screen sizes.

## 🛠️ Technology Stack

The project is built with a modern, robust set of technologies:

*   **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
*   **Routing**: [TanStack Router](https://tanstack.com/router)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/), [DaisyUI](https://daisyui.com/)
*   **AI/ML**: [Hugging Face Transformers.js](https://huggingface.co/docs/transformers.js) running `Moondream2` in a Web Worker.
*   **State Management**: React Context with custom hooks.
*   **PWA**: [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)
*   **Utility Hooks**: [@uidotdev/usehooks](https://usehooks.com/) for geolocation, network status, and more.

## 📂 Project Structure

This repository is structured as a monorepo:
```
311 Agent/
├── pwa/              # The React-based Progressive Web App
├── notebooks/        # (TODO) Jupyter notebooks for model experimentation
├── dataset/          # (TODO) Image dataset for training/fine-tuning
└── README.md         # You are here
```

## 🚀 Getting Started

To get the web application running locally, please refer to the specific instructions in the PWA directory:

➡️ **[PWA README](./pwa/README.md)**

## 📊 Data & Model Training

*TODO: This section will be updated with details about the dataset and the Python notebooks used for model evaluation and potential fine-tuning. It will include instructions on how to set up the environment and run the notebooks.*

## 🔮 Future Improvements

This project has a solid foundation with several exciting avenues for future development:

*   **Agentic Form Submission**: Enhance the AI to agentically fill out and submit the official 311 web form based on the chat conversation.
*   **Official API Integration**: Connect directly to a city's official 311 API for more reliable and tracked submissions.
*   **Expanded Quick Actions**: Add more common issue categories and allow users to start a report without a photo.
*   **Report History**: Allow users to view the status and history of their submitted reports.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue to discuss your ideas.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License.