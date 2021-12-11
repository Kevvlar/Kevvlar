import {
  ADD_NEW_COLUMN_LOCAL,
  DELETE_COLUMNS_BY_BOARD_LOCAL,
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
  selectColummn: {},
  selectCard: {},
  error: "",
  columns: [],
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
        selectColummn: {},
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
        columns: state.columns.filter(
          (columnItem) => columnItem.id !== action.payLoad
        ),
      };

    case EDIT_COLUMN_LOCAL:
      return {
        ...state,
        columns: state.columns.map((columnItem) =>
          columnItem.id === action.payLoad.id
            ? { ...columnItem, title: action.payLoad.title }
            : columnItem
        ),
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

    case CHANGE_CARD_ORDER_LOCAL:
      return {
        ...state,
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
        selectCard: action.payLoad,
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

    case CHANGE_CARD_COLUMN_ID:
      return {
        ...state,
        selectCard: { ...state.selectCard, columnId: action.payLoad },
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
