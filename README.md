# Smart Teleprompter
Uses voice recognition to monitor your progress through your script, automatically scrolling as you speak!

# Demo
Be sure to turn your sound on!


https://user-images.githubusercontent.com/8853022/149584175-e340f5c2-4c4d-4785-b31d-66b17cf88d38.mp4



## Tech
* Frontend: React JS
* Backend: Node, Python
* Websockets

## Notes
The voice recognition is a little slow (as you can see in the demo, there's some lag between my speech and the teleprompter progress) since I use Google Cloud's speech-to-text API. Since the front-end has to interface with the server which in turn interfaces with a Python script which in turn interfaces with the cloud, there is some lag. My plan to fix this is to use Google Chrome's Web Speech API instead, which would also simplify the app!
Also on the agenda is to make the app look nicer. :)

The `teleprompter-gui` folder contains another implementation of the app that uses a GUI generated by Python with tkinter instead of a React frontend to show the teleprompter. The main app is in `teleprompter-app`. 
