import type { CreateNoteDTO, Note, UpdateNoteDTO } from "@/types"

const STORAGE_KEY = "maswada-guest-notes"
const GUEST_USER_ID = "guest"

type StoredNote = Omit<Note, "createdAt" | "updatedAt"> & {
  createdAt: string
  updatedAt: string
}

function toNote(stored: StoredNote): Note {
  return {
    ...stored,
    createdAt: new Date(stored.createdAt),
    updatedAt: new Date(stored.updatedAt),
  }
}

function loadStored(): StoredNote[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as StoredNote[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function persist(notes: StoredNote[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
}

export const guestNotes = {
  getAll(): Note[] {
    return loadStored()
      .map(toNote)
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
  },

  getById(id: string): Note | null {
    const stored = loadStored().find((n) => n.id === id)
    return stored ? toNote(stored) : null
  },

  create(data: CreateNoteDTO): Note {
    const now = new Date().toISOString()
    const note: StoredNote = {
      id: crypto.randomUUID(),
      userId: GUEST_USER_ID,
      title: data.title,
      content: data.content,
      summary: null,
      createdAt: now,
      updatedAt: now,
    }
    persist([note, ...loadStored()])
    return toNote(note)
  },

  update(id: string, data: UpdateNoteDTO): Note | null {
    const notes = loadStored()
    const index = notes.findIndex((n) => n.id === id)
    if (index === -1) return null

    const updated: StoredNote = {
      ...notes[index],
      ...data,
      updatedAt: new Date().toISOString(),
    }
    notes[index] = updated
    persist(notes)
    return toNote(updated)
  },

  delete(id: string): boolean {
    const notes = loadStored()
    const next = notes.filter((n) => n.id !== id)
    if (next.length === notes.length) return false
    persist(next)
    return true
  },
}
