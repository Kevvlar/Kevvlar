import {
  FETCH_COLUMNS_SUCCESS,
  FETCH_COLUMNS_FAILURE,
  FETCH_ACTIVITIES_REQUEST,
  FETCH_ACTIVITIES_SUCCESS,
  FETCH_ACTIVITIES_FAILURE,
  ADD_NEW_COLUMN_LOCAL,
  ADD_NEW_COLUMN_SERVER_FAILURE,
  ADD_NEW_CARD_LOCAL,
  ADD_NEW_CARD_SERVER_FAILURE,
  EDIT_COLUMN_LOCAL,
  EDIT_COLUMN_SERVER_SUCCESS,
  EDIT_COLUMN_SERVER_FAILURE,
  REMOVE_CARD_FROM_CARD_FROM_COLUMN_SERVER_SUCCESS,
  REOMVE_CARD_FROM_CARD_FROM_COLUMN_SERVER_FAILURE,
  EDIT_CARD_LOCAL,
  EDIT_CARD_SERVER_FAILURE,
  DELETE_COLUMN_LOCAL,
  DELETE_COLUMN_SERVER_SUCCESS,
  DELETE_COLUMN_SERVER_FAILURE,
  DELETE_CARD_LOCAL,
  DELETE_CARD_SERVER_FAILURE,
  CHANGE_CARDS_ORDER_LOCAL,
  CHANGE_CARDS_ORDER_IO,
  REMOVE_CARD_FROM_SOURCE_COLUMN_LOCAL,
  CHANGE_CARD_COLUMN_ID,
  CHANGE_CARD_COLUMN_LOCAL,
  ENTER_CARD_SEARCH_KEY,
  SET_CURRENT_COLUMN_DATA,
  SET_CURRENT_CARD_DATA,
  CLEAR_COLUMNS,
  REMOVE_CARD_FROM_SOURCE_COLUMN_IO,
  CHANGE_CARD_COLUMN_IO,
} from "./columnTypes";

const initialState = {
  cardSearchKeyWord: "",
  selectColumn: {},
  selectCard: {},
  error: "",
  loading: false,
  columns: [],
  activities: [],
};

const columnReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COLUMNS_SUCCESS:
      return {
        ...state,
        loading: false,
        columns: action.payLoad,
      };

    case FETCH_COLUMNS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payLoad,
      };

    case FETCH_ACTIVITIES_REQUEST:
      return {
        ...state,
        activities: [],
      };

    case FETCH_ACTIVITIES_SUCCESS:
      return {
        ...state,
        activities: action.payLoad,
      };

    case FETCH_ACTIVITIES_FAILURE:
      return {
        ...state,
        error: action.payLoad,
      };

    case ADD_NEW_COLUMN_LOCAL:
      return {
        ...state,
        columns: [...state.columns, action.payLoad],
      };

    case ADD_NEW_COLUMN_SERVER_FAILURE:
      return {
        ...state,
        error: action.payLoad,
      };

    case EDIT_COLUMN_LOCAL:
      return {
        ...state,
        columns: state.columns.map((columnItem) =>
          columnItem.id === action.payLoad.id
            ? { ...columnItem, title: action.payLoad.title }
            : columnItem
        ),
        selectColumn: {},
      };

    case EDIT_COLUMN_SERVER_SUCCESS:
      return {
        ...state,
        error: "",
      };

    case EDIT_COLUMN_SERVER_FAILURE:
      return {
        ...state,
        error: action.payLoad,
      };

    case REMOVE_CARD_FROM_CARD_FROM_COLUMN_SERVER_SUCCESS:
      return {
        ...state,
        error: "",
      };

    case REOMVE_CARD_FROM_CARD_FROM_COLUMN_SERVER_FAILURE:
      return {
        ...state,
        error: action.payLoad,
      };

    case DELETE_COLUMN_LOCAL:
      return {
        ...state,
        columns: state.columns.filter(
          (columnItem) => columnItem.id !== action.payLoad
        ),
      };

    case DELETE_COLUMN_SERVER_SUCCESS:
      return {
        ...state,
        error: "",
      };

    case DELETE_COLUMN_SERVER_FAILURE:
      return {
        ...state,
        error: action.payLoad,
      };

    case ADD_NEW_CARD_LOCAL:
      return {
        ...state,
        columns: state.columns.map((columnItem) => {
          if (columnItem.id === action.payLoad.columnId) {
            return {
              ...columnItem,
              cards: [...columnItem.cards, action.payLoad],
              cardsOrder: [...columnItem.cardsOrder, action.payLoad.id],
            };
          }
          return columnItem;
        }),
      };

    case ADD_NEW_CARD_SERVER_FAILURE:
      return {
        ...state,
        error: action.payLoad,
      };

    case EDIT_CARD_LOCAL:
      return {
        ...state,
        columns: state.columns.map((columnItem) => {
          if (columnItem.id === action.payLoad.columnId) {
            return {
              ...columnItem,
              cards: columnItem.cards.map((cardItem) =>
                cardItem.id === action.payLoad.id
                  ? {
                      ...cardItem,
                      title: action.payLoad.title,
                      description: action.payLoad.description,
                      date: action.payLoad.date,
                      colorLabel: action.payLoad.colorLabel,
                      users: action.payLoad.users,
                    }
                  : cardItem
              ),
            };
          }
          return columnItem;
        }),
      };

    case EDIT_CARD_SERVER_FAILURE:
      return {
        ...state,
        error: action.payLoad,
      };

    case DELETE_CARD_LOCAL:
      return {
        ...state,
        columns: state.columns.map((columnItem) => {
          if (columnItem.id === action.payLoad.columnId) {
            return {
              ...columnItem,
              cards: columnItem.cards.filter(
                (cardItem) => cardItem.id !== action.payLoad.cardId
              ),
              cardsOrder: columnItem.cardsOrder.filter(
                (id) => id !== action.payLoad.cardId
              ),
            };
          }
          return columnItem;
        }),
        selectCard: {},
      };

    case DELETE_CARD_SERVER_FAILURE:
      return {
        ...state,
        error: action.payLoad,
      };

    case CHANGE_CARDS_ORDER_LOCAL:
      return {
        ...state,
        columns: state.columns.map((columnItem) =>
          columnItem.id === state.selectColumn.id
            ? {
                ...columnItem,
                cardsOrder: action.payLoad,
              }
            : columnItem
        ),
        selectColumn: {
          ...state.selectColumn,
          cardsOrder: action.payLoad,
        },
      };

    case CHANGE_CARDS_ORDER_IO:
      return {
        ...state,
        columns: state.columns.map((columnItem) =>
          columnItem.id === action.payLoad.columnId
            ? {
                ...columnItem,
                cardsOrder: action.payLoad.cardsOrder,
              }
            : columnItem
        ),
      };

    case REMOVE_CARD_FROM_SOURCE_COLUMN_IO:
      return {
        ...state,
        columns: state.columns.map((columnItem) =>
          columnItem.id === action.payLoad.sourceColumnId
            ? {
                ...columnItem,
                cards: columnItem.cards.filter(
                  (card) => card.id !== action.payLoad.cardId
                ),
                cardsOrder: columnItem.cardsOrder.filter(
                  (id) => id !== action.payLoad.cardId
                ),
              }
            : columnItem
        ),
      };

    case CHANGE_CARD_COLUMN_IO:
      return {
        ...state,
        columns: state.columns.map((columnItem) =>
          columnItem.id === action.payLoad.destinationColumnId
            ? {
                ...columnItem,
                cards: [...columnItem.cards, action.payLoad.card],
                cardsOrder: action.payLoad.cardsOrder,
              }
            : columnItem
        ),
      };

    case REMOVE_CARD_FROM_SOURCE_COLUMN_LOCAL:
      return {
        ...state,
        columns: state.columns.map((columnItem) =>
          columnItem.id === action.payLoad
            ? {
                ...columnItem,
                cards: columnItem.cards.filter(
                  (card) => card.id !== state.selectCard.id
                ),
                cardsOrder: columnItem.cardsOrder.filter(
                  (id) => id !== state.selectCard.id
                ),
              }
            : columnItem
        ),
      };

    case CHANGE_CARD_COLUMN_ID:
      return {
        ...state,
        selectCard: { ...state.selectCard, columnId: action.payLoad },
      };

    case CHANGE_CARD_COLUMN_LOCAL:
      return {
        ...state,
        columns: state.columns.map((columnItem) =>
          columnItem.id === action.payLoad.destinationColumn
            ? {
                ...columnItem,
                cards: [...columnItem.cards, state.selectCard],
                cardsOrder: action.payLoad.newOrder,
              }
            : columnItem
        ),
      };

    case SET_CURRENT_COLUMN_DATA:
      return {
        ...state,
        selectColumn: action.payLoad,
      };

    case SET_CURRENT_CARD_DATA:
      return {
        ...state,
        selectCard: action.payLoad,
      };

    case ENTER_CARD_SEARCH_KEY:
      return {
        ...state,
        cardSearchKeyWord: action.payLoad,
      };

    case CLEAR_COLUMNS:
      return {
        ...state,
        columns: [],
        selectColumn: {},
        selectCard: {},
      };

    default:
      return state;
  }
};

export default columnReducer;
