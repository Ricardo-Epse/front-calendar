import React, { useEffect, useState } from 'react'
import { Calendar , momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import { Navbar } from '../ui/Navbar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { messages } from '../../helpers/calendar-messages';

import 'moment/locale/es'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import { useDispatch, useSelector } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events'
import { AddNewFab } from '../ui/AddNewFab'
import { DeleteEventFab } from '../ui/DeleteEventFab'

moment.locale('es')

const localizer = momentLocalizer(moment);

// const events =[{
//   title: 'Cumpleaños',
//   start: moment().toDate(),
//   end: moment().add(1,'hours').toDate(),
//   bgcolor: '#fafafa',
//   notes: 'comprar comida',
//   user:{
//     id:"1233",
//     name:"Ricardo",
//   }
// }]


export const CalendarScreen = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')
  
  const dispatch = useDispatch();
  //leer eventos

  const { events } = useSelector(state => state.calendar)
  const { activeEvent } = useSelector(state => state.calendar)
  const {uid} = useSelector(state => state.auth)


  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch])
  

  const onDoubleClick = (e) =>{
  
    dispatch(uiOpenModal());

  }

  const onSelectEvent = (e) =>{

    dispatch(eventSetActive(e));

  }
  

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView',e);
  }

  const onSelectedSlot = (e) => {

    dispatch( eventClearActiveEvent() )

  }

  const eventStyleGetter = (event, start, end, isSelected) =>{
     // console.log(event,start, end, isSelected);



      const style = {
        backgroundColor: (uid === event.user._id) ? '#367CF7': '#465660',
        borderRadius: '0px',
        opacity: 0.7,
        display: 'block',
        color: 'white'
      }
      return {
          style
      }
  }

  return (

    <div className='calendar-screen'>
      
      <Navbar/>

      <Calendar
      localizer={localizer}
      events={ events }
      startAccessor="start"
      endAccessor="end"
      messages = {messages}
      eventPropGetter = { eventStyleGetter }
      onDoubleClickEvent = {onDoubleClick}
      onSelectEvent = {onSelectEvent}
      onSelectSlot = { onSelectedSlot }
      onView = {onViewChange}
      selectable = { true }
      view={lastView}
      components = {{event:CalendarEvent}}
    />
    <AddNewFab/>

{
    (activeEvent) && <DeleteEventFab/>
}
    <CalendarModal/>
      
    </div>

    
  )
}
