import React, { useEffect, useState } from 'react'
import { Container, Grid } from '@material-ui/core'
import NoteCard from './../components/NoteCard'
import Masonry from 'react-masonry-css'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export default function Notes() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/notes').then(res => res.json()).
      then(data => setNotes(data))
  }, [])

  const handleDeleteNote = async (id) => {
    await fetch('http://localhost:8000/notes/' + id, {
      method: 'DELETE'
    })
    setNotes(notes.filter(note => note.id != id))
  }

  const handleOnDragEnd = (result) => {
    const items = Array.from(notes)
    const [reorderItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderItem)
    setNotes(items)
  }

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  }

  return (
    <Container>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='droppable-1'>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} >
              <Masonry breakpointCols={breakpoints} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
                {notes.map((note, index) => {
                  return (
                    <Draggable key={note.id} draggableId={(note.id).toString()} index={index}>
                      {(provided) => (
                        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                          <NoteCard note={note} handleDelete={handleDeleteNote} />
                        </div>
                      )}
                    </Draggable>
                  )
                })}
                {provided.placeholder}
              </Masonry>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  )
}
