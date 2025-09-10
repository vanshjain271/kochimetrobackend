from transformers import pipeline
import threading

_labels = ["HR", "Finance", "Safety", "Engineering", "Operations", "Legal", "Unknown"]
_classifier = None
_lock = threading.Lock()

def _get_classifier():
    global _classifier
    with _lock:
        if _classifier is None:
            _classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
        return _classifier

def run_classifier(text: str) -> str:
    if not text or not text.strip():
        return "Unknown"
    classifier = _get_classifier()
    try:
        res = classifier(text, candidate_labels=_labels, multi_label=False)
        return res["labels"][0]
    except Exception as e:
        return f"Unknown ({e})"
