# python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware
from sentence_transformers import SentenceTransformer, util
import numpy as np
import uvicorn

class SkillsPayload(BaseModel):
    project_skills: Optional[List[str]] = []
    freelancer_skills: Optional[List[str]] = []

app = FastAPI(title="Semantic Skill Match")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# load model once
model = SentenceTransformer("all-mpnet-base-v2")

def semantic_skill_score(project_skills: List[str], freelancer_skills: List[str]) -> float:
    if not project_skills:
        return 0.5
    if not freelancer_skills:
        return 0.0
    emb_proj = model.encode(project_skills, convert_to_tensor=True)
    emb_free = model.encode(freelancer_skills, convert_to_tensor=True)
    sims = util.cos_sim(emb_proj, emb_free)  # matrix
    # per-project skill: max similarity to any freelancer skill
    max_per_project = sims.max(dim=1).values.cpu().numpy()
    score = float(np.mean(max_per_project))
    # normalize cosine (-1..1) -> (0..1)
    return max(0.0, min(1.0, (score + 1.0) / 2.0))

@app.post("/semantic-skill-match")
def semantic_match(payload: SkillsPayload):
    try:
        score = semantic_skill_score(payload.project_skills or [], payload.freelancer_skills or [])
        return {"score": score}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=False)
