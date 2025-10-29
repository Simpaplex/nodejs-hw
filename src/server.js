import express from 'express';
import "dotenv/config";
import cors from "cors";
import pino from 'pino-http';

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat:
          '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  })
);

app.get('/notes', (req, res) => {
  res.status(200);
  res.json({
    message: "Retrived all notes"
  });
});

app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;
  res.status(200);
  res.json({
    message: `Retrived note with ID: ${noteId}`
  });
});

app.get('/test-error', (req, res) => {
  throw new Error("Simulated server error");
});

app.use((req, res) => {
  res.status(404);
  res.json({
    message: "Rout not found"
  });
});

app.use((err, req, res, next) => {
  res.status(500);
  res.json({
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`server was started on port: ${PORT}`);

});


