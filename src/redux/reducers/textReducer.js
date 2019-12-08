import { UPDATE_HEADING_TEXT, UPDATE_BODY_TEXT } from "../types";

const initialState = {
    heading: 'Heading Text',
    body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae fugit ipsa totam suscipit, maxime provident excepturi enim, corrupti explicabo, incidunt architecto error illum nam atque aliquid quidem hic delectus! Est at, laboriosam dolorem voluptates vitae dolorum amet sed impedit sit, sapiente itaque molestias explicabo excepturi! Saepe doloremque sapiente ad recusandae, corrupti, dicta possimus doloribus, excepturi vel iste voluptatum. Nesciunt eveniet repellat quidem corporis magni. Nulla esse voluptate harum impedit inventore. Suscipit enim dolorem deleniti libero minima. Maiores nostrum odit, cupiditate ab molestias similique minima perferendis ipsa provident magni voluptatum dignissimos rerum commodi reprehenderit? Delectus eligendi animi saepe illum corporis architecto.'
}


export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_HEADING_TEXT:
            return {
                ...state,
                heading: action.payload
            }
        case UPDATE_BODY_TEXT:
            return {
                ...state,
                body: action.payload
            }
        default: return state
    }
}