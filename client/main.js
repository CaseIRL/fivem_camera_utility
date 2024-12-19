let camera_util = null;

RegisterCommand("camera_util", () => {
    const ped = PlayerPedId();
    const coords = GetEntityCoords(ped);
    const heading = GetEntityHeading(ped);
    camera_util = new CameraUtility();
    camera_util.initialize(
        { x: coords[0], y: coords[1], z: coords[2] + 1.0 },
        { x: 0.0, y: 0.0, z: heading }
    );
});
