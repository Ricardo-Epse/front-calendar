//import { useSelector } from "react-redux"
import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types"

export const eventStartAddNew = (event) => {
    return async(dispatch , getState) => {

        //const { uid, name} = useSelector(state => state.auth)
        const {uid, name} = getState().auth;
        
        try {
            const resp = await fetchConToken('events', event, 'POST')
            const body = await resp.json();

            //console.log(body)

            if(body.ok){
                event.id = body.evento.id;
                event.user = {
                    _id : uid,
                    name: name
                }
                
                dispatch( eventAddNew( event ));
            }
            
        } catch (error) {   
            console.log(error); 
        }

        
    }
}

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
})

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
})

export const eventClearActiveEvent = () => ({ type: types.eventClearActiveEvent})

export const eventStartUpdate = (event) => {
    return async(dispatch) => {
        try {
            console.log(event);
            const resp = await fetchConToken(`events/${event.id}`,event,'PUT');
            const body = await resp.json();

            if(body.ok){
                dispatch(eventUpdated(event));
            }else{
                Swal.fire('Error',body.msg,'error');
            }
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const eventUpdated = ( event ) => ({
    type: types.eventUpdated,
    payload : event
})

export const eventStartDeleted = ( ) => {
    return async (dispatch,getState) => {

        const {id} = getState().calendar.activeEvent;

        try {
            const resp = await fetchConToken(`events/${id}`,{},'DELETE');
            const body = await resp.json();

            if(body.ok){
                dispatch(eventDeleted());
            }else{
                Swal.fire('Error',body.msg,'error');
            }
            
        } catch (error) {
            console.log(error);
        }

    }
}

export const eventDeleted = ( event ) => ({
    type: types.eventDeleted
})

export const eventStartLoading = () =>{
    return async(dispatch) => {

        try {
            const resp = await fetchConToken('events');
            const body = await resp.json();

            const events = prepareEvents(body.eventos)
            console.log(events)
            dispatch(eventLoaded(events))
        } catch (error) {
            console.log(error)
        }

    }
}

const eventLoaded = ( eventos ) => ({
    type: types.eventLoaded,
    payload: eventos
})

export const eventLogout = () => ({type: types.eventLogout});