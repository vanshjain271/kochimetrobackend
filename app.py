# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from ocr_module import run_ocr
import os
import logging

# Logging setup
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/ocr", methods=["POST"])
def ocr_endpoint():
    logging.info("Received request for OCR")
    
    if "file" not in request.files:
        logging.warning("No file part in request")
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == "":
        logging.warning("Empty filename received")
        return jsonify({"error": "Empty filename"}), 400

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)
    logging.info(f"Saved uploaded file to {file_path}")

    try:
        result = run_ocr(file_path)
        logging.info(f"OCR completed for file: {file.filename}")
        return jsonify(result)
    except Exception as e:
        logging.error(f"OCR failed: {e}")
        return jsonify({"error": str(e)}), 500
    finally:
        if os.path.exists(file_path):
            os.remove(file_path)
            logging.info(f"Deleted uploaded file: {file_path}")


    
