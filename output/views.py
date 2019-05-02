from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import base64
import cv2
import numpy as np
import os
import argparse
import pytesseract
from PIL import Image
import json

def base64toimg(encoded_data):
    # encoded_data=encoded_data.split(',')[1]
    nparr=np.fromstring(base64.b64decode(encoded_data),np.uint8)
    img=cv2.imdecode(nparr, 0)
    return img

def parseImage(input_image):
    sobel_y = cv2.Sobel(input_image,cv2.CV_8U, 0, 1, ksize = 5)

    hor_lines = list(np.where(sobel_y.sum(axis = 1) > 0.7 * 255*sobel_y.shape[1])[0])
    
    hor_lines_undup = []
    for i in range(1, len(hor_lines)):
        if hor_lines[i] - hor_lines[i - 1] != 1:
            hor_lines_undup.append(hor_lines[i - 1])

    sobel_x = cv2.Sobel(input_image,cv2.CV_8U, 1, 0, ksize = 5)

    vert_lines = list(np.where(sobel_x.sum(axis = 0) > 0.7 * 255*sobel_x.shape[0])[0])
    vert_lines_undup = []
    for i in range(1, len(vert_lines)):
        if vert_lines[i] - vert_lines[i - 1] != 1:
            vert_lines_undup.append(vert_lines[i - 1])
    
    vert_lines_undup.append(vert_lines[len(vert_lines) - 1])

    d = 0
    schedule = []
    for i in range(len(hor_lines_undup)-1):
        schedule.append([])
        for j in range(len(vert_lines_undup) -1):
            name_i = input_image[hor_lines_undup[i] : hor_lines_undup[i + 1] - 5, vert_lines_undup[j] :vert_lines_undup[j + 1] - 5]
            kernel = np.ones((1, 1), np.uint8)
            img = cv2.dilate(name_i, kernel, iterations=1)
            img = cv2.erode(img, kernel, iterations=1)
            # print(img)
            result = pytesseract.image_to_string(img)
            schedule[i].append(result)
            d = d + 1
            
            
    days=[]
    times=[]
    good_data=[]
    days.append('x') #ashan azbot l indexing
    times.append('x') #ashan azbot l indexing
    #processing format 1
    if (schedule[0][0]=="Times"):
        for i in range(1,len(schedule[0])):
            days.append(schedule[0][i])

        for i in range(1,len(schedule)):

            tmp_time=[]
            tmp = schedule[i][0]
            if (tmp=="") :
                times.append('x')#bzwdha ashan l dnia tzbot
                continue #atsrft ashan l 7war bta3 l row l fadi da bs lazm yt3'yr
            #getting time to process it
            index = tmp.index('-')
            start = tmp[:index]
            end = tmp[index+1:-2]
            timing = tmp[-2:]
            #slicing start time
            index = start.index(':')
            shrs = start[:index]
            smin = start[index+1:]
            #slicing formatstringend time
            index = end.index(':')
            ehrs = end[:index]
            emin = end[index+1:]

            #converting from 12-hr to 24-hr
            if (timing == 'am'):
                if(shrs=="12"):
                    shrs="0"
                if(ehrs=="12"):
                    ehrs="0"            
            else:
                int_ehrs = int(ehrs)
                int_shrs = int(shrs)
                diff = int_ehrs - int_shrs
                if (int_ehrs == 12 and int_shrs <= 12):
                    shrs = shrs
                    ehrs = ehrs
                elif (diff < 0):
                    shrs = shrs
                    int_ehrs = int_ehrs + 12
                    ehrs = str(int_ehrs)

                elif (diff > 0):
                    int_shrs = int_shrs + 12
                    int_ehrs = int_ehrs + 12
                    shrs = str(int_shrs)
                    ehrs = str(int_ehrs)

            start = shrs +':'+ smin
            end = ehrs  +':'+ emin

            tmp_time.append(start)
            tmp_time.append(end)
            times.append(tmp_time)
            #making the data in the fromat
        for i in range(1,len(schedule)):
            for j in range(1,len(schedule[0])):
                tmp = schedule[i][j]
                teacher = "none"
                subject = "none"
                place = "none"
                day = "none"
                time = []
                if (tmp==""):
                    continue
                day = days[j]
                time = times[i] 
                tmp = "".join([s for s in tmp.splitlines(True) if s.strip("\r\n")])#deleting all extra lines
                if ("T.A"in tmp):
                    index = tmp.index("T.A")
                    index0 = index - 1
                    subject = tmp[:index0]
                    teacher = tmp[index:]
                else:
                    subject = tmp
                dictionary = {"day" : day,
                              "time": time,
                              "subject" : subject,
                              "place" : place,
                              "teacher" : teacher}
                good_data.append(dictionary)
                
    return good_data




class schedule(APIView):
    def post(self,request):
        base64_string=request.data["img"]
        return Response(parseImage(base64toimg(base64_string)),status=status.HTTP_200_OK)


