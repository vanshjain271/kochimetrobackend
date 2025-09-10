# batch_client.py
import requests
import os

API_URL = "http://127.0.0.1:5000/ocr"

def send_file(file_path):
    """Send a single file to the OCR API and return the JSON result."""
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return []

    with open(file_path, "rb") as f:
        files = {"file": f}
        try:
            response = requests.post(API_URL, files=files)
            if response.status_code == 200:
                return response.json()
            else:
                print(f"Failed to process {file_path}. Status code: {response.status_code}")
                return []
        except Exception as e:
            print(f"Error uploading {file_path}: {e}")
            return []

def batch_process(file_paths):
    """Process multiple files and combine OCR results."""
    combined_results = []
    for file_path in file_paths:
        print(f"Processing: {file_path}")
        result = send_file(file_path)
        if result:
            for page in result:
                page["file"] = os.path.basename(file_path)  # Add file info
            combined_results.extend(result)
    return combined_results

def print_results(results):
    """Pretty print the combined OCR results."""
    for page in results:
        print(f"File: {page['file']} | Page: {page['page']}")
        print("Original Text:\n", page.get("original_text", ""))
        print("Translated Text:\n", page.get("translated_text", ""))
        print("-" * 80)

if __name__ == "__main__":
    # Example: list all files in the 'uploads' folder
    files_to_process = ["test_image.png", "sample.pdf"]  # add your files here
    results = batch_process(files_to_process)
    print_results(results)
