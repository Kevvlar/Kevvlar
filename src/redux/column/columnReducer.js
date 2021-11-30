import {
  ADD_NEW_COLUMN_LOCAL,
  DELETE_COLUMNS_BY_BOARD_LOCAL,
  GET_COLUMNS_BY_BOARDS_LOCAL,
  SET_CURRENT_COLUMN_DATA,
  DELETE_COLUMN_LOCAL,
  DELETE_CARD_LOCAL,
  EDIT_COLUMN_LOCAL,
  ADD_NEW_CARD_LOCAL,
  EDIT_CARD_LOCAL,
  CHANGE_CARD_ORDER_LOCAL,
  SET_CURRENT_CARD_DATA,
  REMOVE_CARD_FROM_SOURCE_COLUMN_LOCAL,
  CHANGE_CARD_COLUMN_LOCAL,
  ENTER_CARD_SEARCH_KEY,
  CHANGE_CARD_COLUMN_ID,
} from "./columnTypes";

const initialState = {
  cardSearchKeyWord: "",
  currentColumnId: "",
  currentColumnTitle: "",
  currentCard: {},
  error: "",
  columns: [],
  columnsByBoard: [],
};

const columnReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_COLUMN_LOCAL:
      return {
        ...state,
        columns: [...state.columns, action.payLoad],
      };

    case DELETE_COLUMNS_BY_BOARD_LOCAL:
      return {
        ...state,
        columns: state.columns.filter(
          (columnItem) => columnItem.boardId !== action.payLoad
        ),
        currentColumnId: "",
        currentColumnTitle: "",
        columnsByBoard: [],
      };

    case GET_COLUMNS_BY_BOARDS_LOCAL:
      return {
        ...state,
        columnsByBoard: state.columns.filter(
          (column) => column.boardId === action.payLoad
        ),
      };

    case SET_CURRENT_COLUMN_DATA:
      return {
        ...state,
        currentColumnId: action.payLoad.id,
        currentColumnTitle: action.payLoad.title,
      };

    case DELETE_COLUMN_LOCAL:
      return {
        ...state,
        columnsByBoard: state.columnsByBoard.filter(
          (columnItem) => columnItem.id !== action.payLoad
        ),
        columns: state.columns.filter(
          (columnItem) => columnItem.id !== action.payLoad
        ),
        currentColumnId: "",
        currentColumnTitle: "",
      };

    case EDIT_COLUMN_LOCAL:
      return {
        ...state,
        columnsByBoard: state.columnsByBoard.map((columnItem) =>
          columnItem.id === action.payLoad.id
            ? { ...columnItem, title: action.payLoad.title }
            : columnItem
        ),
        columns: state.columns.map((columnItem) =>
          columnItem.id === action.payLoad.id
            ? { ...columnItem, title: action.payLoad.title }
            : columnItem
        ),
        currentColumnId: "",
        currentColumnTitle: "",
      };

    case ADD_NEW_CARD_LOCAL:
      return {
        ...state,
        columnsByBoard: state.columnsByBoard.map((columnItem) => {
          if (columnItem.id === action.payLoad.columnId) {
            return {
              ...columnItem,
              cards: [...columnItem.cards, action.payLoad],
              cardsOrder: [...columnItem.cardsOrder, action.payLoad.id],
            };
          }
          return columnItem;
        }),
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

    case EDIT_CARD_LOCAL:
      return {
        ...state,
        columnsByBoard: state.columnsByBoard.map((columnItem) => {
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
                      label: action.payLoad.label,
                    }
                  : cardItem
              ),
            };
          }
          return columnItem;
        }),
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
                      label: action.payLoad.label,
                    }
                  : cardItem
              ),
            };
          }
          return columnItem;
        }),
      };

    case DELETE_CARD_LOCAL:
      return {
        ...state,
        columnsByBoard: state.columnsByBoard.map((columnItem) => {
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
        currentCard: [],
      };

    case CHANGE_CARD_ORDER_LOCAL:
      return {
        ...state,
        columnsByBoard: state.columnsByBoard.map((columnItem) =>
          columnItem.id === state.currentColumnId
            ? {
                ...columnItem,
                cardsOrder: action.payLoad,
              }
            : columnItem
        ),
        columns: state.columns.map((columnItem) =>
          columnItem.id === state.currentColumnId
            ? {
                ...columnItem,
                cardsOrder: action.payLoad,
              }
            : columnItem
        ),
      };

    case SET_CURRENT_CARD_DATA:
      return {
        ...state,
        currentCard: action.payLoad,
      };

    case REMOVE_CARD_FROM_SOURCE_COLUMN_LOCAL:
      return {
        ...state,
        columnsByBoard: state.columnsByBoard.map((columnItem) =>
          columnItem.id === action.payLoad
            ? {
                ...columnItem,
                cards: columnItem.cards.filter(
                  (card) => card.id !== state.currentCard.id
                ),
                cardsOrder: columnItem.cardsOrder.filter(
                  (id) => id !== state.currentCard.id
                ),
              }
            : columnItem
        ),
        columns: state.columns.map((columnItem) =>
          columnItem.id === action.payLoad
            ? {
                ...columnItem,
                cards: columnItem.cards.filter(
                  (card) => card.id !== state.currentCard.id
                ),
                cardsOrder: columnItem.cardsOrder.filter(
                  (id) => id !== state.currentCard.id
                ),
              }
            : columnItem
        ),
      };

    case CHANGE_CARD_COLUMN_LOCAL:
      return {
        ...state,
        columnsByBoard: state.columnsByBoard.map((columnItem) =>
          columnItem.id === action.payLoad.destinationColumn
            ? {
                ...columnItem,
                cards: [...columnItem.cards, state.currentCard],
                cardsOrder: action.payLoad.newOrder,
              }
            : columnItem
        ),
        columns: state.columns.map((columnItem) =>
          columnItem.id === action.payLoad.destinationColumn
            ? {
                ...columnItem,
                cards: [...columnItem.cards, state.currentCard],
                cardsOrder: action.payLoad.newOrder,
              }
            : columnItem
        ),
      };

    case CHANGE_CARD_COLUMN_ID:
      return {
        ...state,
        currentCard: { ...state.currentCard, columnId: action.payLoad },
      };

    case ENTER_CARD_SEARCH_KEY:
      return {
        ...state,
        cardSearchKeyWord: action.payLoad,
      };

    default:
      return state;
  }
};

export default columnReducer;
