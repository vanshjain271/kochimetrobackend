import os
from typing import List, Dict
from pdf2image import convert_from_path
import pytesseract
import pdfplumber
from deep_translator import GoogleTranslator
from PIL import Image

translator = GoogleTranslator(source="auto", target="en")

def run_ocr(file_path: str) -> List[Dict]:
    """
    Perform OCR on an image or PDF file and return extracted & translated text.
    """
    result = []
    ext = file_path.rsplit(".", 1)[-1].lower()

    if ext == "pdf":
        with pdfplumber.open(file_path) as pdf:
            for i, page in enumerate(pdf.pages, start=1):
                text = page.extract_text() or ""
                if text.strip() == "":
                    images = convert_from_path(file_path, first_page=i, last_page=i)
                    text = pytesseract.image_to_string(images[0])
                translated_text = translator.translate(text) if text.strip() else ""
                result.append({
                    "page": i,
                    "source": "ocr" if text else "pdf",
                    "original_text": text,
                    "translated_text": translated_text
                })
    else:
        image = Image.open(file_path)
        text = pytesseract.image_to_string(image)
        translated_text = translator.translate(text) if text.strip() else ""
        result.append({
            "page": 1,
            "source": "ocr",
            "original_text": text,
            "translated_text": translated_text
        })

    return result
