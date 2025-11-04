import createHttpError from "http-errors";
import { Note } from "../models/note.js";

export async function getAllNotes(req, res, next) {
    const notes = await Note.find();
    res.status(200);
    res.json(notes);
};

export async function getNoteById(req, res, next) {
    const { noteId } = req.params;
    const note = await Note.findById(noteId);
    if (!note) {
      next(createHttpError(404, 'Note not found'));
      return;
    }
    res.status(200);
    res.json(note);
};

export async function createNote(req, res, next) {
  const note = await Note.create(req.body);

  res.status(201);
  res.json(note);

};

export async function deleteNote(req, res, next) {
    const { noteId } = req.params;
  const note = await Note.findByIdAndDelete({
      _id: noteId
    });
    if (!note) {
      next(createHttpError(404, 'Note not found'));
      return;
    }
    res.status(200);
    res.json(note);
};

export async function updateNote(req, res, next) {
    const { noteId } = req.params;
  const note = await Note.findByIdAndUpdate({
      _id: noteId
  },
    req.body,
    {
    new: true
  });
    if (!note) {
      next(createHttpError(404, 'Note not found'));
      return;
    }
    res.status(200);
    res.json(note);
};


