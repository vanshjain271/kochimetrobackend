import requests

url = "https://kochimetrobackend.onrender.com/ocr"  # your Render URL
file_path = "test_image.png"  # replace with your test file

with open(file_path, "rb") as f:
    files = {"file": f}
    response = requests.post(url, files=files)

print("Status:", response.status_code)
print("Response:", response.json())

