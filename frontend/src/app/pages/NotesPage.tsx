import { GlassCard } from "@/components/common/GlassCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import type { Note } from "@/types"
import useNotesAPI from "@/hooks/useNotesAPI"
import { useLocaleNavigate } from "@/hooks/useLocaleNavigate"
import { useIntl } from "react-intl"
import { Search, Trash } from "lucide-react"

export function NotesPage() {
  const { getAllNotes, createNote, isSignedIn, deleteNote } = useNotesAPI()
  const [notes, setNotes] = useState<Note[]>([])
  const { localeNavigate } = useLocaleNavigate()
  const intl = useIntl()

  useEffect(() => {
    const fetchNotes = async () => {
      const notes = await getAllNotes()
      setNotes(notes)
    }
    fetchNotes()
  }, [getAllNotes])

  const handleCreateNote = async () => {
    const note = await createNote({
      title: intl.formatMessage({ id: "home.newNote" }),
      content: "-",
    })
    if (note) {
      localeNavigate(`/notes/${note.id}`)
    }
  }

  const handleNoteClick = (id: string) => {
    localeNavigate(`/notes/${id}`)
  }

  const handleDeleteNote = (id: string) => {
    deleteNote(id)
  }
  return (
    <div className="space-y-6">
      <GlassCard className="flex flex-col gap-4 px-6 py-6 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-xl font-semibold tracking-tight">
            {intl.formatMessage({ id: "home.myNotes" })}
          </h1>
          <Button onClick={handleCreateNote} className="shrink-0 rounded-xl px-5">
            {intl.formatMessage({ id: "home.createNote" })}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Input
            type="text"
            className="flex-1"
            placeholder={intl.formatMessage({ id: "home.searchNotes" })}
          />
          <Button variant="outline" size="icon" className="shrink-0">
            <Search className="size-4" />
          </Button>
        </div>
      </GlassCard>

      {!isSignedIn && (
        <p className="text-center text-sm text-muted-foreground">
          {intl.formatMessage({ id: "guest.notesHint" })}
        </p>
      )}
      {/* button delete all notes */}
      {notes.length > 0 && (
        <div className="flex flex-col gap-4">
          {notes.map((note) => (
            <GlassCard
              key={note.id}
              onClick={() => handleNoteClick(note.id)}
              className="flex cursor-pointer items-center justify-between gap-3 px-6 py-4 transition-opacity hover:opacity-90"
            >
              <h2 className="truncate text-sm font-semibold">{note.title}</h2>
              <Button
                variant="destructive"
                size="icon"
                className="shrink-0"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDeleteNote(note.id)
                }}
              >
                <Trash className="size-4" />
              </Button>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  )
}
