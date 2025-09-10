from transformers import pipeline
import threading

# create summarizer once (takes memory/time to load)
_summarizer = None
_lock = threading.Lock()

def _get_summarizer():
    global _summarizer
    with _lock:
        if _summarizer is None:
            _summarizer = pipeline("summarization", model="t5-small")
        return _summarizer

def run_summarizer(text: str) -> str:
    if not text or not text.strip():
        return ""
    summarizer = _get_summarizer()
    # huggingface pipeline expects shorter chunks; truncate if super long for demo
    if len(text) > 3000:
        text = text[:3000]
    try:
        out = summarizer(text, max_length=80, min_length=10, do_sample=False)
        return out[0]["summary_text"]
    except Exception as e:
        return f"(summary-error) {str(e)}"
