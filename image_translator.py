import cv2
import numpy as np
import pytesseract
from PIL import Image

# Path of working folder on Disk
src_path = "C:/Users/14017/Documents/CSE2019_2nd/image/Project/names/"

def get_string(img_path):
    # Read image with opencv
    img = cv2.imread(img_path)

    # Convert to gray
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Apply dilation and erosion to remove some noise
    kernel = np.ones((1, 1), np.uint8)
    img = cv2.dilate(img, kernel, iterations=1)
    img = cv2.erode(img, kernel, iterations=1)

    # Write image after removed noise
    cv2.imwrite(src_path + "removed_noise.png", img)

    #  Apply threshold to get image with only black and white
    #img = cv2.adaptiveThreshold(img, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 31, 2)

    # Write the image after apply opencv to do some ...
    cv2.imwrite(src_path + "thres.png", img)

    # Recognize text with tesseract for python
    result = pytesseract.image_to_string(Image.open(src_path + "thres.png"))

    # Remove template file
    #os.remove(temp)

    return result


def make_array(array,rows,cols):
    d = 0
    for i in range(rows):
        array.append([])
        for j in range(cols):
            array[i].append(get_string(src_path + "%d.png"%d))
            d = d + 1

schedule = []
make_array(schedule,10,6)
print(schedule)
