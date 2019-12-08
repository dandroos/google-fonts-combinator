import { UPDATE_HEADING_TEXT, UPDATE_HEADING_FONT, UPDATE_BODY_FONT } from "./types";

export function updateText(text, field) {

    switch (field) {
        case heading:
            return {
                type: UPDATE_HEADING_TEXT,
                payload: text
            }
        case body:
            return {
                type: UPDATE_BODY_TEXT,
                payload:
                    text
            }
    }
}

export function updateFont(font, field) {
    switch (field) {
        case heading:
            return {
                type: UPDATE_HEADING_FONT,
                payload: font
            }
        case heading:
            return {
                type: UPDATE_BODY_FONT,
                payload: font
            }
    }
}

// https://fonts.googleapis.com/css?family=Pacifico|Lexend+Mega