from fastapi import APIRouter
from pydantic import BaseModel
import os
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

router = APIRouter()

class ChatRequest(BaseModel):
    agent: str
    query: str
    language: str = "en"

SYSTEM_PROMPT = """
You are DxGPT, a clinical decision-support AI.
Rules:
- Do NOT give final diagnosis
- Do NOT prescribe medicines
- Be cautious and structured
- Always suggest consulting a doctor
- Respond in the user's language

Format:
1. Possible Causes (Top 2–3)
2. Key Questions
3. Red Flags
4. Next Steps
5. Disclaimer
"""

@router.post("/chat")
def chat(req: ChatRequest):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": req.query}
        ],
        temperature=0.7
    )

    return {
        "response": response.choices[0].message.content
    }
