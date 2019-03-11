import {COUNT_DOWN, COUNT_UP} from "../constants/action_types";

export const countUp = () => {
    return {
        type: COUNT_UP
    }
}

export const countDown = () => {
    return {
        type: COUNT_DOWN
    }
}
