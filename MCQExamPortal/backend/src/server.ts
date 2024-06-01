import app from './index';

//start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`serer is running on http://localhost:${PORT}`);
});

