import { GlassCard } from "@/components/common/GlassCard"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import type { Note } from "@/types"
import useNotesAPI from "@/hooks/useNotesAPI"
import { useLocaleNavigate } from "@/hooks/useLocaleNavigate"
import { useIntl } from "react-intl"

export function NotesPage() {
  const { getAllNotes, createNote } = useNotesAPI()
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

  return (
    <div className="space-y-6">
      <GlassCard className="flex items-center justify-between gap-4 px-6 py-6 sm:px-8">
        <h1 className="text-xl font-semibold tracking-tight">
          {intl.formatMessage({ id: "home.myNotes" })}
        </h1>
        <Button onClick={handleCreateNote} className="shrink-0 rounded-xl px-5">
          {intl.formatMessage({ id: "home.createNote" })}
        </Button>
      </GlassCard>

      {notes.length > 0 && (
        <div className="flex flex-col gap-4">
          {notes.map((note) => (
            <GlassCard
              key={note.id}
              onClick={() => handleNoteClick(note.id)}
              className="cursor-pointer px-6 py-4 transition-opacity hover:opacity-90"
            >
              <h2 className="text-lg font-semibold">{note.title}</h2>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  )
}
