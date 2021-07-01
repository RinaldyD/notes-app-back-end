const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'Success',
      message: 'Note berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });

    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'Fail',
    message: 'Note gagal ditambahkan',
  });

  response.code(500);
  return response;
};

const getAllNotesHandler = () => ({
  status: 'Success',
  data: {
    notes,
  },
});

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'Success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'Fail',
    message: 'Notes tidak ditemukan',
  });

  response.code(404);
  return response;
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: 'Success',
      message: 'Notes berhasil diperbarui',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'Fail',
    message: 'Notes Gagal diperbarui',
  });
  response.code(404);
  return response;
};

const deleteNoteByidhandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);

    const response = h.response({
      status: 'Success',
      message: 'Notes berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'Fail',
    message: 'Notes Gagal dihapus',
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByidhandler,
};