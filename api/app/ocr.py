from flask import Flask, request, jsonify
from ocr_module import run_ocr
import os

app = Flask(__name__)

UPLOAD_FOLDER = "/tmp/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/ocr", methods=["POST"])
def ocr_endpoint():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    try:
        result = run_ocr(file_path)
        return jsonify(result)
    finally:
        if os.path.exists(file_path):
            os.remove(file_path)

# For Vercel serverless
from mangum import Mangum
handler = Mangum(app)
