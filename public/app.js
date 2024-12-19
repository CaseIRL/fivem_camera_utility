const handlers = {
    copy_to_clipboard: (data) => {
        const el = document.createElement('textarea');
        el.value = data.content;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }
};

window.addEventListener('message', function (event) {
    const data = event.data;
    const handler = handlers[data.action];
    if (handler) {
        handler(data);
    }
});