# 🗝️ Metadata - CTF Challenge

## 📖 **Lore:**

> Note: Add a small diary entry along with this image.
---
Diary Entry  
Date: 01/02/25  
Something feels off. I don’t know if it’s paranoia or if they’re actually closing in, but I can’t take chances. Not now. Not when I’ve come this far.

This place will do for now. It’s quiet, out of the way—no one looks twice at it. If they’re watching, if they’re listening, they won’t find me here. At least, not yet.

But if they do… well. I’ll have to be ready.

---
(add image along with the post)

---

## 🗂️ **Challenge Details:**

- **Challenge Name:** Metadata
- **Category:** Forensics
- **File Provided:** `corrupted_image.jpg`

---

## 🎯 **Objective:**

Analyze the given image file to extract hidden metadata. Use the GPS coordinates to uncover the location of Kane's secret and retrieve the flag.

---

## 💡 **Hints:**

- _"Even the pixels can lie, but metadata never does."_
- Have you tried inspecting EXIF metadata?
- Coordinates can reveal more than you think.

---

## ⚙️ **Tools You Might Need:**

- `exiftool` (Linux/Windows/macOS)
- Online EXIF viewers like [https://exif.tools/](https://exif.tools/)
- Google Maps (for geolocation)
- Hex editors like `ghex`, `hexedit`, or `HxD` (optional)

---

## 🚀 **How to Approach:**

1. **Analyze the Metadata:**  
    Run the following command to extract metadata:
    
    ```bash
    exiftool corrupted_image.jpg
    ```
    
2. **Locate the Coordinates:**  
    Look for GPS Latitude and Longitude in the output.
    
3. **Convert Coordinates to Decimal Format:**  
    Example format:
    
    ```
    Latitude: 48 deg 50' 1.68"  => 48.8338
    Longitude: 2 deg 19' 56.64" => 2.3324
    ```
    
4. **Search on Google Maps:**  
    Enter the coordinates:
    
    ```
    48.8338, 2.3324
    ```
    
5. **Uncover the Secret:**  
    Analyze the location, find the hidden clue, and retrieve the flag.
    

---

## 🏁 **Flag Format:**

Replace . with _  
Replace "space" with _  

```
flag{lattitude_longitude_nameoftheplace}
```

_(Note: The actual flag may vary based on your findings.)_

Good luck, detective. Kane's shadow waits beneath the surface... 🕵️
