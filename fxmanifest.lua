--[[
     ____    _    ____  _____ 
    / ___|  / \  / ___|| ____|
    | |    / _ \ \___ \|  _|  
    | |___/ ___ \ ___) | |___ 
    \____/_/   \_|____/|_____|
                           
         CAMERA UTILITY
]]

fx_version 'cerulean'
games { 'gta5', 'rdr3' }

name 'fivem_camera_utility'
version '1.0.0'
description 'Case - Camera Utility'
author 'boiidevelopment'
repository 'https://github.com/boiidevelopment/fivem_camera_utility'
lua54 'yes'

ui_page 'public/index.html'

files {
    'public/*',
}

client_scripts {
    'client/config.js',
    'client/CameraUtility.js',
    'client/main.js'
}

escrow_ignore {
    'client/*',
}

