import { Dispatch, PropsWithChildren, createContext, useReducer } from 'react'
import { Event } from '../hooks/getEvents';

const TICKETS: Event[] = []

interface State {
  tickets: Event[];
}

export enum TICKET_ACTIONS {
  ADD_TICKET = "ADD_TICKET",
  REMOVE_TICKET = "REMOVE_TICKET",
  CLEAR_TICKETS = "CLEAR_TICKETS",
}

interface Action {
  type: TICKET_ACTIONS;
  payload: Event;
}

export const ticketContext = createContext<[State, Dispatch<Action>] | null>(null)


const reducer: React.Reducer<State, Action> = (state: State, action: Action) => {
  switch (action.type) {
    case TICKET_ACTIONS.ADD_TICKET:
      return {...state,tickets: [...state.tickets, action.payload] };
    case TICKET_ACTIONS.CLEAR_TICKETS:
      return {...state,tickets: [] };
    case TICKET_ACTIONS.REMOVE_TICKET:
      const selectedTickets = state.tickets.filter(ticket => ticket.id === action.payload.id)
      selectedTickets.pop()
      const unSelectedTickets = state.tickets.filter(ticket => ticket.id !== action.payload.id)
      return {...state,tickets:[...selectedTickets, ...unSelectedTickets] };
    default:
      return state;
  }
};

export const TicketContext = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, { tickets: TICKETS })
  return (
    <ticketContext.Provider value={[state, dispatch]}>
      {children}
    </ticketContext.Provider>
  )
}
