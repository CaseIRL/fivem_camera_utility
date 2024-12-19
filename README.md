# FiveM Camera Utility

![cam_utility_thumb](https://github.com/user-attachments/assets/9bd173ab-7d02-4a35-a6bb-62c1086a1758)

## Overview

Long story short I got bored of manually editing coordinates for scripts so heres a utility to do it. 
Its basic, but it does what I needed it to do. Thought id share incase anyone else finds use. 

Enjoy.


## Installation

1. Customisation

- Toggle `copy_to_lua = false;` inside `client/config.js` to true and camera data will be copied in LUA format, false will copy in JS format.
- To change camera movement and rotation speed modify the following values inside `client/CameraUtility.js` you can find these in the constructor.

```javascript
this.movement_step = 0.01;
this.rotation_step = 0.1;
```

2. Adding the resource to your server

- Download the repo and add the resource into your server files.
- Add `ensure fivem_camera_utility` to your `server.cfg`

3. Starting the resource

- Press F8 and type `refresh; ensure fivem_camera_utility` and the resource will be ready
- Or restart your server either works

## Usage

1. Opening Camera Utility

- Open the camera utility with the command `/camera_util

2. Controlling The Camera

- All keys are shown in a key table through drawtext check here for keys to press.

### Support

Support is not provided for this resource, it is free, open source and simple enough that no support should be required.
Please do not join the BOII | Development discord asking for support for this resource, any tickets about this resource will be ignored.
