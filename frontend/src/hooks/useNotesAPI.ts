import type { Note, CreateNoteDTO, UpdateNoteDTO } from "@/types"
import { useAuth } from "@clerk/clerk-react"
import { useCallback } from "react"
import { API_BASE_URL } from "@/lib/utils"
import { guestNotes } from "@/lib/guestNotes"

function useNotesAPI() {
    const { isSignedIn, getToken } = useAuth()

    const getAllNotes = useCallback(async () => {
        if (!isSignedIn) {
            return guestNotes.getAll()
        }

        const token = await getToken()
        if (!token) {
            return guestNotes.getAll()
        }

        const response = await fetch(API_BASE_URL + "/api/notes", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            return []
        }

        const data: { notes: Note[] } = await response.json()
        return data.notes
    }, [isSignedIn, getToken])

    const createNote = async (note: CreateNoteDTO) => {
        if (!isSignedIn) {
            return guestNotes.create(note)
        }

        const token = await getToken()
        if (!token) {
            return guestNotes.create(note)
        }

        const response = await fetch(API_BASE_URL + "/api/notes", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        })

        if (!response.ok) {
            return null
        }

        const data: { note: Note } = await response.json()
        return data.note
    }

    const getNoteById = useCallback(async (id: string) => {
        if (!isSignedIn) {
            return guestNotes.getById(id)
        }

        const token = await getToken()
        if (!token) {
            return guestNotes.getById(id)
        }

        const response = await fetch(API_BASE_URL + "/api/notes/" + id, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            return null
        }

        const data: { note: Note } = await response.json()
        return data.note
    }, [isSignedIn, getToken])

    const updateNote = async (id: string, note: UpdateNoteDTO) => {
        if (!isSignedIn) {
            return guestNotes.update(id, note)
        }

        const token = await getToken()
        if (!token) {
            return guestNotes.update(id, note)
        }

        const response = await fetch(API_BASE_URL + "/api/notes/" + id, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        })

        if (!response.ok) {
            return null
        }

        const data: { note: Note } = await response.json()
        return data.note
    }

    const deleteNote = async (id: string) => {
        if (!isSignedIn) {
            return guestNotes.delete(id)
        }

        const token = await getToken()
        if (!token) {
            return guestNotes.delete(id)
        }

        const response = await fetch(API_BASE_URL + "/api/notes/" + id, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        return response.ok
    }

    return { getAllNotes, createNote, getNoteById, updateNote, deleteNote, isSignedIn }
}

export default useNotesAPI
