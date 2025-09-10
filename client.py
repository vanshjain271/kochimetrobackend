# client.py
import requests
import os

def send_file(file_path):
    url = "http://127.0.0.1:5000/ocr"
    with open(file_path, "rb") as f:
        files = {"file": f}
        response = requests.post(url, files=files)
        print(f"Status code: {response.status_code}")
        try:
            data = response.json()
            print("Response:")
            for page in data:
                print(f"Page {page['page']}:")
                print("Original:", page["original_text"])
                print("Translated:", page["translated_text"])
                print("-" * 50)
        except Exception as e:
            print("Error decoding response:", e)

if __name__ == "__main__":
    # Example usage
    send_file("test_image.png")  # image file
    # send_file("sample.pdf")     # PDF file
