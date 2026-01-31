## Problem Statement

Many individuals abandon skills they once learned due to lack of time, confidence, or guidance.
Restarting a forgotten skill feels overwhelming because users do not know where to begin.
Jambavan addresses this problem by providing structured, emotionally motivating, AI-powered guidance to help users revive forgotten skills.

##Explanation Video
https://drive.google.com/file/d/1lk3eyqn-BpMKznivJCw-z1uBNZR8CeRu/view?usp=sharing

## System Architecture

User  
↓  
Web Interface (HTML, CSS, JavaScript)  
↓  
Flask Backend (Python)  
↓  
Groq AI Model  
↓  
Structured 7-Day Revival Plan  
↓  
Displayed with Progress & Visual Feedback

## Tech Stack

Frontend:
- HTML
- CSS
- JavaScript

Backend:
- Python
- Flask

AI:
- Groq Large Language Models

Deployment:
- Render

Version Control:
- GitHub


## Setup Instructions (Local)

1. Clone the repository:
   git clone https://github.com/<your-username>/JAMBHAVAN-lost-skill-reviver.git
   cd JAMBHAVAN-lost-skill-reviver

2. Create and activate virtual environment:
   python -m venv venv
   source venv/bin/activate   (Linux/Mac)
   venv\Scripts\activate      (Windows)

3. Install dependencies:
   pip install -r requirements.txt

4. Set environment variable for Groq API key:
   Windows:
   setx GROQ_API_KEY "your_api_key_here"

   Linux / Mac:
   export GROQ_API_KEY="your_api_key_here"

5. Run the application:
   python app.py

6. Open browser:
   http://127.0.0.1:10000


## AI Tools Used

- Groq API for large language model inference
- AI used to generate emotionally motivating, structured 7-day revival plans


## Final Output

The application generates a personalized 7-day skill revival journey.
Each day includes:
- An emotional motivational message
- A practical action step
- Visual progress indicators
- Completion feedback

The final state rewards the user with a symbolic completion message reinforcing confidence and continuity.


## Build Reproducibility

The project can be reproduced on any system by following the setup instructions above.
All dependencies are listed in requirements.txt and no secrets are stored in source code.
Environment variables are used for secure API access.


