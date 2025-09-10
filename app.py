# app.py
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import uvicorn
import os

from ocr_module import run_ocr

app = FastAPI()

# Root health-check
@app.get("/")
def root():
    return {"message": "🚇 Kochi Metro Backend is live!"}

# OCR endpoint
@app.post("/ocr")
async def ocr_endpoint(file: UploadFile = File(...)):
    try:
        # Save uploaded file temporarily
        temp_path = f"temp_{file.filename}"
        with open(temp_path, "wb") as f:
            f.write(await file.read())

        # Run OCR
        result = run_ocr(temp_path)

        # Cleanup
        os.remove(temp_path)

        return JSONResponse(content={"success": True, "data": result})

    except Exception as e:
        return JSONResponse(
            content={"success": False, "error": str(e)}, status_code=500
        )

# Local dev entrypoint (not used in Render, but handy for testing)
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
