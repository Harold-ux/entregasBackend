const pathHandler = (req, res) => {
    const message = "Route not found";
    const data  = {
        method: req.method,
        url: req.url,
        error: message,
    }
    res.status(404).json(data);
}

export default pathHandler;