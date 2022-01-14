#!/usr/bin/env python

import asyncio
import websockets
import json
# from matcher import match

async def handler(websocket):
    message = await websocket.recv()
    print(f"{message}")
    for word in message.split():
        await websocket.send(word)
        print(word)
        await asyncio.sleep(1)
    print("done")

async def main():
    async with websockets.serve(handler, "", 8001):
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())

# async def handler(websocket, path):
#   script = await websocket.recv()
#   # print(f"{script}")
#   # progress = match(script)
#   await websocket.send(script)

#   progress = match(script)
#   for done, left in progress:
#     data = {
#       "done" : done,
#       "left" : left,
#     }
#     await websocket.send(str(num))
#     await asyncio.sleep(1)

# start_server = websockets.serve(handler, "127.0.0.1", 8888)

# asyncio.get_event_loop().run_until_complete(start_server)
# asyncio.get_event_loop().run_forever()