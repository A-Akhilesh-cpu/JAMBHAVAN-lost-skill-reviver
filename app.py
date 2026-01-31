from flask import Flask, render_template, request, jsonify
from groq import Groq
import os
import json

app = Flask(__name__)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/generate", methods=["POST"])
def generate():
    data = request.json

    prompt = f"""
You are JAMBAVAN — a calm, ancient guide who reminds people of forgotten strength.

Create a 7-day skill revival journey.

Skill: {data['skill']}
Inactive for: {data['duration_value']} {data['duration_unit']}
Learned via: {data['learning_source']}
Resource: {data['resource']}
Reason: {data['reason']}

Rules:
- Respond ONLY in valid JSON
- No markdown
- No explanations outside JSON
- Emotional, calm, motivational tone
- Each day must feel like a reminder, not teaching

JSON format:

{{
  "days": [
    {{
      "day": 1,
      "title": "string",
      "message": "string",
      "action": "string"
    }}
  ]
}}
"""

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7
    )

    raw = completion.choices[0].message.content

    try:
        parsed = json.loads(raw)
        return jsonify(parsed)
    except Exception as e:
        return jsonify({
            "error": "AI response parsing failed",
            "raw": raw
        }), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000, debug=True)
