/**
 * An object that stores all available event codes that can be used/received by the game server as well as their
 * intended parameters
 *
*/
const Events = {
    client: {
        NEW_GAME: "NEW_GAME",
        JOIN_GAME: "JOIN_GAME",
        SEND_DEBUG: "SEND_DEBUG",
        DISCONNECT: "DISCONNECT",
        SET_SETTINGS: "SET_SETTINGS",
        SUBMIT_CARD: "SUBMIT_CARD",
        UPDATE_USERNAME: "UPDATE_USERNAME",
        VALIDATE_JOIN_CODE: "VALIDATE_JOIN_CODE",
        AUTHENTICATE: "AUTHENTICATE",
        CHECK_AUTHENTICATION_STATUS: "CHECK_AUTHENTICATION_STATUS",
        START_GAME: "START_GAME",
        PICK_WINNER: "PICK_WINNER",
    },
    server: {
        SET_SETTINGS: "SET_SETTINGS",
        DISCONNECT: "DISCONNECT",
        START_ROUND: "START_ROUND",
        GAME_UPDATE: "GAME_UPDATE",
        DEBUG: "DEBUG",
        AUTHENTICATION_STATUS: "AUTHENTICATION_STATUS",
        ERROR: "ERROR",
    },
};

module.exports = Events;
