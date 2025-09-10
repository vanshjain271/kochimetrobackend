import requests

# Flask app URL
url = "http://127.0.0.1:5000/ocr"

# Path to your test image
file_path = "test_image.png"

# Send POST request with the image
with open(file_path, "rb") as f:
    files = {"file": f}
    response = requests.post(url, files=files)

# Print response
print("Status code:", response.status_code)
print("Response JSON:", response.json())
