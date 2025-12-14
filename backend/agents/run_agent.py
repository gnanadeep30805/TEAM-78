def run_agent(agent: str, query: str, language: str = "en-IN") -> str:
    q = query.lower()

    causes = []
    red_flags = []

    if "fever" in q:
        causes.append("Viral or bacterial infection")
        red_flags.append("High fever above 102°F")

    if "cold" in q or "cough" in q:
        causes.append("Upper respiratory tract infection")

    if "chest pain" in q:
        causes.append("Possible cardiac or respiratory condition")
        red_flags.append("Chest pain")

    if not causes:
        causes.append("Early-stage or non-specific condition")

    causes = causes[:3]

    if agent == "Doctor Support":
        next_steps = "Consult a general physician; specialist referral if required."
    elif agent == "Medical Learning":
        next_steps = "Learn about symptom progression and prevention strategies."
    elif agent == "Appointment Assistant":
        next_steps = "Book an appointment with a nearby hospital or clinic."
    else:
        next_steps = "Consult a qualified doctor for examination and basic tests."

    response = f"""
Doctorly AI – Clinical Guidance

Possible Causes:
- {'\n- '.join(causes)}

Key Questions:
- When did the symptoms begin?
- Are they worsening?
- Any previous medical conditions?

Red Flags:
- {', '.join(red_flags) if red_flags else 'No urgent red flags identified'}

Recommended Next Steps:
- {next_steps}

Disclaimer:
Doctorly AI provides educational medical guidance only.
This is NOT a medical diagnosis.
Please consult a qualified healthcare professional.
""".strip()

    return response
