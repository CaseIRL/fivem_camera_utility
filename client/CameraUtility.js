// Keys
const keys = {
    enter: 191,
    escape: 322,
    backspace: 177,
    tab: 37,
    arrowleft: 174,
    arrowright: 175,
    arrowup: 172,
    arrowdown: 173,
    space: 22,
    delete: 178,
    insert: 121,
    home: 213,
    end: 214,
    pageup: 10,
    pagedown: 11,
    leftcontrol: 36,
    leftshift: 21,
    leftalt: 19,
    rightcontrol: 70,
    rightshift: 70,
    rightalt: 70,
    numpad0: 108,
    numpad1: 117,
    numpad2: 118,
    numpad3: 60,
    numpad4: 107,
    numpad5: 110,
    numpad6: 109,
    numpad7: 117,
    numpad8: 111,
    numpad9: 112,
    'numpad+': 96,
    'numpad-': 97,
    numpadenter: 191,
    'numpad.': 108,
    f1: 288,
    f2: 289,
    f3: 170,
    f4: 168,
    f5: 166,
    f6: 167,
    f7: 168,
    f8: 169,
    f9: 56,
    f10: 57,
    a: 34,
    b: 29,
    c: 26,
    d: 30,
    e: 46,
    f: 49,
    g: 47,
    h: 74,
    i: 27,
    j: 36,
    k: 311,
    l: 182,
    m: 244,
    n: 249,
    o: 39,
    p: 199,
    q: 44,
    r: 45,
    s: 33,
    t: 245,
    u: 303,
    v: 0,
    w: 32,
    x: 73,
    y: 246,
    z: 20,
    mouse1: 24,
    mouse2: 25
};

class CameraUtility {
    constructor() {
        this.copy_to_lua = copy_to_lua;
        this.camera = null;
        this.current_position = { x: 0, y: 0, z: 0 };
        this.current_rotation = { x: 0, y: 0, z: 0 };
        this.movement_step = 0.01;
        this.rotation_step = 0.25;
        this.control_interval = null;
        this.display_interval = null;
        this.key_table = [
            { key: 'Escape', action: 'Destroy Camera' },
            { key: 'Back Space', action: 'Copy Camera Data' },
            { key: 'W', action: 'Move Forward' },
            { key: 'S', action: 'Move Backward' },
            { key: 'A', action: 'Move Left' },
            { key: 'D', action: 'Move Right' },
            { key: 'Q', action: 'Move Up' },
            { key: 'E', action: 'Move Down' },
            { key: 'Arrow Up', action: 'Pitch Up' },
            { key: 'Arrow Down', action: 'Pitch Down' },
            { key: 'Arrow Left', action: 'Yaw Left' },
            { key: 'Arrow Right', action: 'Yaw Right' },
            { key: 'Page Up', action: 'Roll Left' },
            { key: 'Page Down', action: 'Roll Right' },
        ];
    }

    initialize(position = { x: 0, y: 0, z: 0 }, rotation = { x: 0, y: 0, z: 0 }) {
        if (DoesCamExist(this.camera)) {
            DestroyCam(this.camera, false);
        }
        this.camera = CreateCam('DEFAULT_SCRIPTED_CAMERA', true);
        this.current_position = position;
        this.current_rotation = rotation;
        this.update_camera();
        RenderScriptCams(true, false, 0, true, true);
        this.disable_player_controls();
        this.start_key_control();
        this.start_displaying_camera_details();
    }

    update_camera() {
        if (!DoesCamExist(this.camera)) return;
        SetCamCoord(this.camera, this.current_position.x, this.current_position.y, this.current_position.z);
        SetCamRot(this.camera, this.current_rotation.x, this.current_rotation.y, this.current_rotation.z);
    }

    start_key_control() {
        if (this.control_interval) clearInterval(this.control_interval);
        this.control_interval = setInterval(() => {
            if (IsDisabledControlPressed(0, this.get_key('escape'))) this.destroy_camera();
            if (IsDisabledControlPressed(0, this.get_key('backspace'))) this.copy_camera_data();
            if (IsDisabledControlPressed(0, this.get_key('w'))) this.move_camera("forward");
            if (IsDisabledControlPressed(0, this.get_key('s'))) this.move_camera("backward");
            if (IsDisabledControlPressed(0, this.get_key('a'))) this.move_camera("left");
            if (IsDisabledControlPressed(0, this.get_key('d'))) this.move_camera("right");
            if (IsDisabledControlPressed(0, this.get_key('q'))) this.move_camera("up");
            if (IsDisabledControlPressed(0, this.get_key('e'))) this.move_camera("down");
            if (IsDisabledControlPressed(0, this.get_key('arrowup'))) this.rotate_camera("pitch_up");
            if (IsDisabledControlPressed(0, this.get_key('arrowdown'))) this.rotate_camera("pitch_down");
            if (IsDisabledControlPressed(0, this.get_key('arrowleft'))) this.rotate_camera("yaw_left");
            if (IsDisabledControlPressed(0, this.get_key('arrowright'))) this.rotate_camera("yaw_right");
            if (IsDisabledControlPressed(0, this.get_key('pageup'))) this.rotate_camera("roll_left");
            if (IsDisabledControlPressed(0, this.get_key('pagedown'))) this.rotate_camera("roll_right");
        }, 0);
    }

    get_key(key_name) {
        return keys[key_name] || null;
    }

    move_camera(direction) {
        const rad_yaw = (this.current_rotation.z * Math.PI) / 180.0;
        const forward = { x: Math.sin(rad_yaw), y: Math.cos(rad_yaw) };
        const right = { x: Math.cos(rad_yaw), y: -Math.sin(rad_yaw) };
        switch (direction) {
            case "up":
                this.current_position.z += this.movement_step;
                break;
            case "down":
                this.current_position.z -= this.movement_step;
                break;
            case "left":
                this.current_position.x += right.x * this.movement_step;
                this.current_position.y += right.y * this.movement_step;
                break;
            case "right":
                this.current_position.x += right.x * -this.movement_step;
                this.current_position.y += right.y * -this.movement_step;
                break;
            case "forward":
                this.current_position.x += forward.x * -this.movement_step;
                this.current_position.y += forward.y * -this.movement_step;
                break;
            case "backward":
                this.current_position.x += forward.x * this.movement_step;
                this.current_position.y += forward.y * this.movement_step;
                break;
        }
        this.update_camera();
    }

    rotate_camera(direction) {
        switch (direction) {
            case "pitch_up":
                this.current_rotation.x += this.rotation_step;
                break;
            case "pitch_down":
                this.current_rotation.x -= this.rotation_step;
                break;
            case "yaw_left":
                this.current_rotation.z += this.rotation_step;
                break;
            case "yaw_right":
                this.current_rotation.z -= this.rotation_step;
                break;
            case "roll_left":
                this.current_rotation.y -= this.rotation_step;
                break;
            case "roll_right":
                this.current_rotation.y += this.rotation_step;
                break;
        }
        this.update_camera();
    }

    start_displaying_camera_details() {
        if (this.display_interval) clearInterval(this.display_interval);
        this.display_interval = setTick(() => {
            const position_text = `Position: { x: ${this.current_position.x.toFixed(2)}, y: ${this.current_position.y.toFixed(2)}, z: ${this.current_position.z.toFixed(2)} }`;
            const rotation_text = `Rotation: { x: ${this.current_rotation.x.toFixed(2)}, y: ${this.current_rotation.y.toFixed(2)}, z: ${this.current_rotation.z.toFixed(2)} }`;
            this.draw_text('Camera Data:', 0.02, 0.30);
            this.draw_text(position_text, 0.02, 0.33, 0.3, [255, 255, 255, 200]);
            this.draw_text(rotation_text, 0.02, 0.35, 0.3, [255, 255, 255, 200]);
            this.draw_text('Controls:', 0.02, 0.40);
            this.key_table.forEach((entry, index) => {
                this.draw_text(`${entry.key}: ${entry.action}`, 0.02, 0.43 + index * 0.02, 0.3, [255, 255, 255, 200]);
            });
        });
    }

    draw_text(text, x, y, scale = 0.35, color = [255, 255, 255, 255]) {
        SetTextFont(0);
        SetTextProportional(true);
        SetTextScale(scale, scale);
        SetTextColour(color[0], color[1], color[2], color[3]);
        SetTextOutline();
        SetTextEntry("STRING");
        AddTextComponentString(text);
        DrawText(x, y);
    }

    copy_camera_data() {
        const lua_data = `
            Position Table: { x = ${this.current_position.x.toFixed(2)}, y = ${this.current_position.y.toFixed(2)}, z = ${this.current_position.z.toFixed(2)} }
            Position Vector: vector3(${this.current_position.x.toFixed(2)}, ${this.current_position.y.toFixed(2)}, ${this.current_position.z.toFixed(2)})
            Rotation Table: { x = ${this.current_rotation.x.toFixed(2)}, y = ${this.current_rotation.y.toFixed(2)}, z = ${this.current_rotation.z.toFixed(2)} }
            Rotation Vector: vector3(${this.current_rotation.x.toFixed(2)}, ${this.current_rotation.y.toFixed(2)}, ${this.current_rotation.z.toFixed(2)})
        `;
        const js_data = `
            Position Table: { x: ${this.current_position.x.toFixed(2)}, y: ${this.current_position.y.toFixed(2)}, z: ${this.current_position.z.toFixed(2)} }
            Position Vector: vector3(${this.current_position.x.toFixed(2)}, ${this.current_position.y.toFixed(2)}, ${this.current_position.z.toFixed(2)})
            Rotation Table: { x: ${this.current_rotation.x.toFixed(2)}, y: ${this.current_rotation.y.toFixed(2)}, z: ${this.current_rotation.z.toFixed(2)} }
            Rotation Vector: vector3(${this.current_rotation.x.toFixed(2)}, ${this.current_rotation.y.toFixed(2)}, ${this.current_rotation.z.toFixed(2)})
        `;
        let clipboard_data = this.copy_to_lua ? lua_data : js_data
        SendNUIMessage({
            action: 'copy_to_clipboard',
            content: clipboard_data
        });
    }

    disable_player_controls() {
        setTick(() => {
            DisableAllControlActions(0);
            EnableControlAction(0, 1, true);
            EnableControlAction(0, 2, true);
        });
    }

    destroy_camera() {
        if (this.control_interval) clearInterval(this.control_interval);
        if (this.display_interval) clearTick(this.display_interval);
        if (DoesCamExist(this.camera)) {
            DestroyCam(this.camera, false);
            RenderScriptCams(false, false, 0, true, true);
            this.camera = null;
        }
    }
}