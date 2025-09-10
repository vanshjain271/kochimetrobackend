# ocr_gui.py
import tkinter as tk
from tkinter import filedialog, scrolledtext, messagebox
import requests
import os

API_URL = "http://127.0.0.1:5000/ocr"

class OCRGui:
    def __init__(self, root):
        self.root = root
        self.root.title("OCR + Translation GUI")
        self.root.geometry("800x600")

        # File selection button
        self.select_btn = tk.Button(root, text="Select Files", command=self.select_files)
        self.select_btn.pack(pady=10)

        # Run OCR button
        self.run_btn = tk.Button(root, text="Run OCR", command=self.run_ocr)
        self.run_btn.pack(pady=10)

        # Results text box
        self.result_box = scrolledtext.ScrolledText(root, width=100, height=30)
        self.result_box.pack(pady=10)

        self.files = []

    def select_files(self):
        self.files = filedialog.askopenfilenames(title="Select images or PDFs")
        if self.files:
            messagebox.showinfo("Files Selected", f"{len(self.files)} files selected!")

    def run_ocr(self):
        if not self.files:
            messagebox.showwarning("No files", "Please select files first!")
            return
        
        self.result_box.delete("1.0", tk.END)
        for file_path in self.files:
            self.result_box.insert(tk.END, f"Processing: {os.path.basename(file_path)}\n")
            try:
                with open(file_path, "rb") as f:
                    files = {"file": f}
                    response = requests.post(API_URL, files=files)
                    if response.status_code == 200:
                        result = response.json()
                        for page in result:
                            self.result_box.insert(tk.END, f"Page {page['page']}:\n")
                            self.result_box.insert(tk.END, f"{page.get('original_text','')}\n")
                            self.result_box.insert(tk.END, f"Translated: {page.get('translated_text','')}\n")
                            self.result_box.insert(tk.END, "-"*60 + "\n")
                    else:
                        self.result_box.insert(tk.END, f"Failed: Status code {response.status_code}\n")
            except Exception as e:
                self.result_box.insert(tk.END, f"Error processing {file_path}: {str(e)}\n")

if __name__ == "__main__":
    root = tk.Tk()
    app = OCRGui(root)
    root.mainloop()
